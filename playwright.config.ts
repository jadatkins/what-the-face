import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: "75%",

  use: {
    baseURL: "http://localhost:5173",
    screenshot: "on-first-failure",
    trace: "on-first-retry",
  },

  webServer: {
    command: "pnpm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },

  projects: filterProjects([
    {
      name: "Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Android",
      use: { ...devices["Pixel 8"] },
    },
    {
      name: "iPhone",
      use: { ...devices["iPhone 16"] },
    },
  ]),
});

/**
 * Restricts which projects (browsers) run based on the `E2E_BROWSERS`
 * environment variable, a comma-separated, case-insensitive list of project
 * names (e.g. "Chrome,Firefox"). When unset or empty, all projects run.
 */
function filterProjects<T extends { name: string }>(allProjects: T[]): T[] {
  const selected = process.env.E2E_BROWSERS?.split(",")
    .map((name) => name.trim().toLowerCase())
    .filter(Boolean);

  if (!selected || selected.length === 0) {
    return allProjects;
  }

  return allProjects.filter((project) => selected.includes(project.name.toLowerCase()));
}
