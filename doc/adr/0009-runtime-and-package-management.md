# 9. Runtime and Package Management

Date: 2025-06-13 (amended 2025-06-14)

## Status

Accepted

## Context

We need to select a JavaScript runtime, version manager, and package manager for our React / TypeScript application. The solution should align with our project priorities of minimizing development effort, providing learning opportunities, and maintaining compatibility with our hosting provider (Vercel).

## Decision

We will use:
- **Node.js** as our JavaScript runtime
- **Volta** as our Node.js version manager  
- **Yarn** as our package manager

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
- **Bun** - Rejected to reduce tooling complexity and focus on established workflows
- **pnpm** - Rejected due to symlink complexity that could cause CI/CD and cross-platform issues

### Key Factors

Runtime consistency between development and production was critical for avoiding deployment issues. Automatic version switching and reliable CI/CD compatibility were prioritized to minimize development overhead.

## Consequences

**What becomes easier:**
- Consistent runtime environment from development to production
- Zero-config team environment consistency via Volta
- Faster package installation with Yarn compared to npm
- Automatic Node.js version switching per project
- Reliable CI/CD compatibility without symlink complexity
- Seamless Vercel deployment with established tooling

**What becomes more difficult:**
- Learning Volta instead of more common nvm workflow
- Additional tool beyond standard npm

**Risks:**
- Volta is newer with smaller ecosystem than nvm
- Fallback to established tools (nvm + npm) is straightforward if needed
