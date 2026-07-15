# Testing

Run end-to-end tests:

```sh
# Run all tests on all browsers (Chrome, Firefox, Safari, Android, iPhone)
pnpm run test:e2e

# Run tests on specific browsers only (comma-separated)
E2E_BROWSERS=Chrome,iPhone pnpm run test:e2e

# Open a GUI for running tests
pnpm run test:e2e --ui
```

## Choosing Browsers in CI

To change which browsers run in CI, set repository variables in GitHub:

- `E2E_BROWSERS_LINUX` — overrides the browser list for the Linux job.
- `E2E_BROWSERS_MACOS` — overrides the browser list for the macOS job.

If a test fails in CI, [download the report](https://playwright.dev/docs/ci-intro#html-report) and then run:

```sh
pnpm exec playwright show-report ~/Downloads/playwright-report.zip
```
