# Local Dev Setup

## Prerequisites

This project requires Node.js 24 and pnpm 11. Version files are provided for multiple version managers:
- `.nvmrc` (nvm, fnm)
- `.node-version` (nodenv, fnm, mise)
- `.tool-versions` (asdf, mise)

**Recommended**: Install [mise](https://mise.jdx.dev/) if you don't already have a Node.js version manager.

## Setup

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

## Development

Start the development server with HMR:

```sh
pnpm run dev
```

Your application will be available at `http://localhost:5173`.
