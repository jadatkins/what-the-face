import { expect, test } from "@playwright/test";

test("homepage smoke test", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("What's next?")).toBeHidden();
});
