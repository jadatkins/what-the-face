# What the Face?

A full-stack React application built with React Router v8, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

This project requires Node.js 24 and pnpm 11. Version files are provided for multiple version managers:
- `.nvmrc` (nvm, fnm)
- `.node-version` (nodenv, fnm, mise)
- `.tool-versions` (asdf, mise)

**Recommended**: Install [mise](https://mise.jdx.dev/) if you don't already have a Node.js version manager.

### Setup

1. **Install Node.js and pnpm:**

   With mise or asdf (installs both automatically):
   ```sh
   mise install  # or: asdf install
   ```

   With nvm/fnm (Node only, then install pnpm):
   ```sh
   nvm install  # or: fnm install
   npm install -g pnpm@11.8.0
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

   This also sets up git hooks via Husky, for automatic formatting and linting with Biome.

### Development

Start the development server with HMR:

```sh
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

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
