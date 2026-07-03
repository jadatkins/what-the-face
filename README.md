# What the Face?

A full-stack React application built with React Router v8, TypeScript, and Tailwind CSS.

This is a new project with no functionality as of yet.

## Getting Started

See [Local Dev Setup](doc/local-dev-setup.md) for prerequisites, setup steps, and running the development server.

## Environment Variables

See [Environment Variables](doc/environment-variables.md) for how to manage environment variables using dotenvx.

## Testing

Run end-to-end tests:

```sh
# Run all tests on all browsers (Chromium, Firefox, WebKit)
pnpm run test:e2e

# Run tests in UI mode
pnpm run test:e2e:gui
```

If a test fails in CI, see https://playwright.dev/docs/ci-intro#html-report
for how to view a trace of what happened (with a simulated video).

## Production

This application is deployed to Render at https://what-the-face.onrender.com

See [Deploying on Render](https://render.com/docs/deploys).
