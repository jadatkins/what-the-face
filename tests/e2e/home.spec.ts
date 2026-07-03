import { expect, test } from "@playwright/test";

test("homepage smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("What's next?")).toBeVisible();
});

test("dotenvx is working", async ({ page }) => {
  await page.goto("/");

  const foo = page.getByTestId("dotenvx-test-value");
  await expect(foo).toBeVisible();
  await expect(foo).not.toBeEmpty();
});
