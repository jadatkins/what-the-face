# Testing

Run end-to-end tests:

```sh
# Run all tests on all browsers (Chromium, Firefox, WebKit)
pnpm run test:e2e

# Open a GUI for running tests
pnpm run test:e2e --ui
```

If a test fails in CI, [download the report](https://playwright.dev/docs/ci-intro#html-report) and then run:

```sh
pnpm exec playwright show-report ~/Downloads/playwright-report.zip
```
