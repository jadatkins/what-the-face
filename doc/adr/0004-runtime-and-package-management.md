# 4. Runtime and Package Management

Date: 2025-06-13 (amended 2025-06-20, revised 2026-06-21)

## Status

Accepted

## Context

We need to select a JavaScript runtime, version manager and package manager for our React / TypeScript application. The solution should align with our project priorities of minimizing development effort while providing learning opportunities, including keeping abreast of emerging industry trends.

## Decision

We will use:
- **Node.js** as our JavaScript runtime
- **mise** as our Node.js version manager
- **pnpm** as our package manager

### Alternatives Considered

**Runtime:**
- **Bun runtime** - Not adopted as the runtime. Bun's Node compatibility has improved
  substantially, but React Router framework-mode SSR remains tightly coupled to the Vite
  plugin and a Node baseline, so Node is still the supported, friction-free path. Bun
  remains usable as a script runner if desired.
- **Deno** - Rejected as it requires different patterns and has smaller ecosystem

**Version Manager:**
- **Volta** - Originally chosen, now rejected because it is officially unmaintained; its
  own README recommends migrating to mise.
- **fnm** - Rejected as it requires manual shell configuration for automatic switching
- **nvm** - Rejected due to slower performance and manual configuration requirements
- **asdf** - Rejected as universal version management is overkill for a Node.js-only project

**Package Manager:**
- **Yarn (Plug'n'Play)** - Originally chosen, now rejected. PnP's main benefits (strict
  dependency hygiene, zero-install, monorepo scale) target large teams and are overkill for
  a single-developer hobby project, while it still carries tooling/editor-compatibility
  friction.
- **npm** - Rejected due to slower installation performance and higher disk usage
- **Yarn Classic** - Rejected in favour of pnpm for better performance and disk usage
- **Bun** - Rejected as package manager to maintain Node.js runtime consistency and reduce
  tooling complexity

### Key Factors

1. **Runtime consistency**: Node.js provides universal compatibility and matches the
   production deployment environment
2. **Active maintenance**: mise is actively developed, whereas Volta is now unmaintained
3. **Zero-configuration setup**: mise automatically manages the Node.js version per project
   from a single config file, without per-developer shell configuration
4. **Simplicity over power**: pnpm delivers most of PnP's disk-efficiency and correctness
   benefits with far better out-of-the-box tooling compatibility, the better trade-off for a
   simple solo project
5. **Industry alignment**: pnpm is the de-facto modern default (including in React Router's
   own install instructions); mise has broad, growing adoption

## Consequences

**What becomes easier:**
- Consistent runtime environment from development to production
- Zero-config environment consistency via mise (`mise.toml` / `.tool-versions`)
- Faster package installation and reduced disk usage via pnpm's content-addressed store
- Automatic Node.js version switching per project
- Broad tooling and IDE compatibility (pnpm uses a real `node_modules` layout)

**What becomes more difficult:**
- Learning mise instead of the more common nvm workflow
- pnpm's symlinked `node_modules` can occasionally surface packages that assume a flat layout

**Risks:**
- mise is a polyglot tool; we only use its Node.js capabilities, so most of its surface area
  is unused
- Fallback to traditional tools (nvm + npm) remains straightforward if needed
