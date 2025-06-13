# 9. Runtime and Package Management Selection

Date: 2025-06-13

## Status

Accepted

## Context

We need to select a JavaScript runtime, version manager, and package manager for our React / TypeScript application. The solution should align with our project priorities of minimizing development effort, providing learning opportunities, and maintaining compatibility with our hosting provider (Vercel).

## Decision

We will use:
- **Node.js** as our JavaScript runtime
- **Volta** as our Node.js version manager  
- **Bun** as our package manager

### Alternatives Considered

**Runtime:**
- **Bun runtime** - Rejected due to development/production environment mismatch (Vercel uses Node.js)
- **Deno** - Rejected as it requires different patterns and has smaller ecosystem

**Version Manager:**
- **fnm** - Rejected as it requires manual version switching
- **pnpm** - Rejected as it mixes version and package management concerns
- **nvm** - Rejected due to slower performance and manual configuration requirements
- **asdf** - Rejected as universal version management is overkill for Node.js-only project

**Package Manager:**
- **npm** - Rejected due to slower installation performance
- **yarn** - Rejected as Bun provides superior speed without compatibility trade-offs
- **pnpm** - Rejected due to symlink complexity that could cause CI/CD and cross-platform issues

### Key Factors

Runtime consistency between development and production was critical for avoiding deployment issues. Automatic version switching and fast package installation were prioritized to minimize development overhead.

## Consequences

**What becomes easier:**
- Consistent runtime environment from development to production
- Zero-config team environment consistency via Volta
- Significantly faster package installation with Bun (20-30x faster than npm)
- Automatic Node.js version switching per project
- Seamless Vercel deployment with native Bun package manager support

**What becomes more difficult:**
- Learning multiple new tools (Volta + Bun) instead of established workflows
- Smaller communities for troubleshooting compared to npm/yarn + nvm

**Risks:**
- Volta and Bun are newer tools with smaller ecosystems
- Fallback to established tools (nvm + npm/yarn) is straightforward if needed
