# 8. Runtime and Package Management

Date: 2025-06-18

## Status

Accepted

## Context

We need to select a JavaScript runtime, version manager and package manager for our React / TypeScript application. The solution should align with our project priorities of minimizing development effort while providing learning opportunities.

## Decision

We will use **Bun** as both our JavaScript runtime and package manager.

### Alternatives Considered

**Runtime + Package Manager:**
- **Node.js + npm** - Rejected due to slower performance and separate tooling complexity
- **Node.js + Yarn** - Rejected in favor of unified toolchain approach
- **Node.js + pnpm** - Rejected in favor of unified toolchain approach
- **Deno** - Rejected as it requires different patterns and has smaller ecosystem

**Version Management:**
- Not needed with Bun as it includes built-in version management
- **Volta** - Would be redundant with Bun's unified approach
- **nvm/fnm** - Would be redundant with Bun's approach

### Key Factors

- **Unified toolchain**: Single tool for runtime, package management, and TypeScript execution
- **Performance**: Faster package installation and application startup
- **Simplified development**: Built-in TypeScript support eliminates build steps
- **Forward-thinking**: Learning experience with next-generation JavaScript runtime
- **Reduced complexity**: Eliminates need for separate version and package managers

## Consequences

**What becomes easier:**
- Zero-config TypeScript execution without build steps
- Faster package installation compared to npm/yarn
- Simplified toolchain with fewer moving parts
- Consistent development and production environments via Docker
- No need for separate version management tools

**What becomes more difficult:**
- Smaller ecosystem with potential package compatibility issues
- Less community support and fewer Stack Overflow answers
- Debugging tools and workflows less mature than Node.js

**Risks:**
- Ecosystem compatibility gaps for some npm packages
- Dependency on relatively new technology with smaller community
- Potential migration complexity if switching back to Node.js becomes necessary
