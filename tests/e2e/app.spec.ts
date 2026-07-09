import { createClerkClient } from "@clerk/backend";
import { expect, test } from "@playwright/test";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

/**
 * Strip query param values and URL fragments before logging: agent task URLs,
 * Clerk handshake params, and dev browser JWTs all carry session-granting
 * tokens that must not end up in CI logs. Param *names* are kept, since which
 * params are present is itself useful evidence.
 */
function redactUrl(raw: string): string {
  try {
    const url = new URL(raw);
    for (const key of [...url.searchParams.keys()]) {
      url.searchParams.set(key, "REDACTED");
    }
    if (url.hash) {
      url.hash = `REDACTED(${url.hash.length} chars)`;
    }
    return url.toString();
  } catch {
    return "<unparseable url>";
  }
}

/** Keep cookie name and attributes (Path, SameSite, Secure...), drop the value. */
function redactSetCookie(header: string): string {
  return header.replace(/^([^=]+)=[^;]*/, "$1=REDACTED");
}

function hostnameOf(raw: string): string {
  try {
    return new URL(raw).hostname;
  } catch {
    return "";
  }
}

/**
 * Scrub arbitrary free text (console messages, error messages) that may embed
 * full URLs or bare Clerk tokens. Browsers sometimes log the failing request
 * URL verbatim (e.g. a rejected-cookie warning), so this can't rely on
 * structured URL parsing alone.
 */
function redactText(raw: string): string {
  return raw
    .replace(/https?:\/\/\S+/g, (url) => redactUrl(url))
    .replace(/\b(dvb|sess|clnt)_[A-Za-z0-9]+\b/g, "$1_REDACTED");
}

test("signed-in user can reach /app", async ({ page, context }, testInfo) => {
  const t0 = Date.now();
  const lines: string[] = [];
  const log = (msg: string) => {
    const line = `[+${String(Date.now() - t0).padStart(6, " ")}ms] ${msg}`;
    lines.push(line);
    console.log(line);
  };

  // --- Page event instrumentation ---------------------------------------
  page.on("console", (msg) => log(`console.${msg.type()}: ${redactText(msg.text())}`));
  page.on("pageerror", (err) => log(`pageerror: ${redactText(err.message)}`));
  page.on("requestfailed", (req) =>
    log(`requestfailed: ${req.method()} ${redactUrl(req.url())} :: ${req.failure()?.errorText}`),
  );
  page.on("framenavigated", (frame) => {
    if (frame === page.mainFrame()) {
      log(`mainframe navigated: ${redactUrl(frame.url())}`);
    }
  });
  // Log document navigations (incl. redirect hops), anything on a Clerk
  // domain, and any error responses. Include Set-Cookie attributes for
  // document responses, since cookie handling is browser-specific.
  page.on("response", (res) => {
    void (async () => {
      const req = res.request();
      const isDocument = req.resourceType() === "document";
      const isClerk = /clerk/i.test(hostnameOf(res.url()));
      if (!isDocument && !isClerk && res.status() < 400) {
        return;
      }
      let line = `response: ${res.status()} ${req.method()} ${redactUrl(res.url())} [${req.resourceType()}]`;
      if (isDocument || isClerk) {
        const setCookies = (await res.headersArray().catch(() => []))
          .filter((h) => h.name.toLowerCase() === "set-cookie")
          .map((h) => redactSetCookie(h.value));
        for (const sc of setCookies) {
          line += `\n           set-cookie: ${sc}`;
        }
      }
      log(line);
    })().catch(() => {});
  });

  // --- State dump helper --------------------------------------------------
  const dumpState = async (label: string) => {
    log(`--- state dump: ${label} ---`);
    log(`page.url(): ${redactUrl(page.url())}`);

    const cookies = await context.cookies().catch(() => []);
    const cookieSummary = cookies.map(
      ({ name, domain, path, expires, httpOnly, secure, sameSite }) => ({
        name,
        domain,
        path,
        expires,
        httpOnly,
        secure,
        sameSite,
      }),
    );
    log(`context cookies (values omitted): ${JSON.stringify(cookieSummary)}`);

    const clientState = await page
      .evaluate(() => {
        // biome-ignore lint/suspicious/noExplicitAny: introspecting Clerk global
        const clerk = (window as any).Clerk;
        return {
          readyState: document.readyState,
          title: document.title,
          jsCookieNames: document.cookie
            ? document.cookie.split("; ").map((c) => c.split("=")[0])
            : [],
          clerk: {
            present: typeof clerk !== "undefined",
            loaded: clerk?.loaded ?? null,
            userId: clerk?.user?.id ?? null,
            sessionStatus: clerk?.session?.status ?? null,
          },
          bodyTextStart: document.body?.innerText?.slice(0, 500) ?? null,
        };
      })
      .catch((err) => `page.evaluate failed: ${err}`);
    log(`client state: ${JSON.stringify(clientState, null, 2)}`);
  };

  // --- The test itself ------------------------------------------------------
  log(`creating agent task for user ${process.env.CLERK_TEST_USER_ID}`);
  const agentTask = await clerkClient.agentTasks.create({
    onBehalfOf: { userId: process.env.CLERK_TEST_USER_ID as string },
    permissions: "*",
    agentName: "e2e-test",
    taskDescription: "e2e signed-in /app test",
    redirectUrl: "http://localhost:5173/app",
  });
  log(`agent task created: ${redactUrl(agentTask.url)}`);

  try {
    const response = await page.goto(agentTask.url, {
      waitUntil: "networkidle",
    });

    // Reconstruct the HTTP redirect chain that goto followed.
    const chain: string[] = [];
    let req = response?.request() ?? null;
    while (req) {
      chain.unshift(`${req.method()} ${redactUrl(req.url())}`);
      req = req.redirectedFrom();
    }
    log(`goto resolved: status=${response?.status()} redirect chain:\n    ${chain.join("\n -> ")}`);
    await dumpState("after goto");

    await expect(page).toHaveURL(/\/app$/, { timeout: 15000 });
    await expect(page.getByText("App goes here")).toBeVisible();
  } catch (error) {
    await dumpState("after failure");
    const html = await page.content().catch((err) => `<page.content() unavailable: ${err}>`);
    await testInfo.attach("page-html", {
      body: html,
      contentType: "text/html",
    });
    throw error;
  } finally {
    await testInfo.attach("debug-log", {
      body: lines.join("\n"),
      contentType: "text/plain",
    });
  }
});
