import { createClerkClient } from "@clerk/backend";
import { expect, test } from "@playwright/test";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

test("signed-in user can reach /app", async ({ page }) => {
  const agentTask = await clerkClient.agentTasks.create({
    onBehalfOf: { userId: process.env.CLERK_TEST_USER_ID as string },
    permissions: "*",
    agentName: "e2e-test",
    taskDescription: "e2e signed-in /app test",
    redirectUrl: "http://localhost:5173/app",
  });

  await page.goto(agentTask.url, { waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/app$/, { timeout: 15000 });
  await expect(page.getByText("App goes here")).toBeVisible();
});
