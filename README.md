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
   npm install -g pnpm
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

   This also sets up git hooks via Husky, for automatic formatting and linting with Biome.

3. **Initialise .env file**

   ```sh
   cp .env.example .env
   pnpm exec dotenvx encrypt -f .env
   ```

   This will create your initial `.env` file containing encrypted environment
   variables, and a `.env.keys` file containing the decryption key. If you are
   using an AI-powered editor, configure it not to have access to `.env.keys`.

   Or even better, store the decryption key elsewhere, delete the `.env.keys`
   file, and inject `DOTENV_PRIVATE_KEY` as an environment variable only when
   running the dev server.

### Development

Start the development server with HMR:

```sh
pnpm run dev
```

Your application will be available at `http://localhost:5173`.

## Environment Variables

To change the values of environment variables (for any environment), use the
[dotenvx CLI](https://dotenvx.com/docs/cli):

```sh
# Set a variable in .env (encrypted automatically)
pnpm exec dotenvx set FOO 'this is a secret'

# Encrypt a variable for another environment (does not require the private key)
pnpm exec dotenvx set BAR 'production eyes only' -f .env.production

# Set an plain-text value (for non-secrets)
pnpm exec dotenvx set BAZ 'public knowledge' --plain

# Retrieve a value (if you have the .keys file)
pnpm exec dotenvx get QUX -f .env -fk .env.keys

# Retrieve a value (by providing the private key)
DOTENV_PRIVATE_KEY=<private key> pnpm exec dotenvx get FOO

# Get all variables in JSON format
pnpm exec dotenvx get | jq

# Re-encrypt your local .env file, in case your .env.keys was compromised
pnpm exec dotenvx decrypt && tail -n +8 .env > .env.tmp && mv .env.tmp .env && rm .env.keys && pnpm exec dotenvx encrypt
```

See the [CLI Reference](https://dotenvx.com/docs/cli/introduction) for more.

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
