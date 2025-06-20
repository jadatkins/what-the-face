# 4. Runtime and Package Management

Date: 2025-06-13 (amended 2025-06-20)

## Status

Accepted

## Context

We need to select a JavaScript runtime, version manager and package manager for our React / TypeScript application. The solution should align with our project priorities of minimizing development effort while providing learning opportunities, including keeping abreast of emerging industry trends.

## Decision

We will use:
- **Node.js** as our JavaScript runtime
- **Volta** as our Node.js version manager  
- **Yarn** (Plug'n'Play mode) as our package manager

### Alternatives Considered

**Runtime:**
- **Bun runtime** - Rejected due to SSR compatibility issues with React Router v7 framework mode
- **Deno** - Rejected as it requires different patterns and has smaller ecosystem

**Version Manager:**
- **fnm** - Rejected as it requires manual shell configuration for automatic switching
- **pnpm** - Rejected as its version management capabilities are less mature than dedicated tools
- **nvm** - Rejected due to slower performance and manual configuration requirements
- **asdf** - Rejected as universal version management is overkill for Node.js-only project

**Package Manager:**
- **npm** - Rejected due to slower installation performance and higher disk usage
- **Yarn Classic** - Rejected in favor of modern Yarn PnP for better performance and dependency management
- **pnpm** - Strong contender but Yarn PnP offers equivalent performance with better ecosystem compatibility
- **Bun** - Rejected to maintain Node.js runtime consistency and reduce tooling complexity

### Key Factors

1. **Runtime consistency**: Node.js provides universal compatibility and matches production deployment environments
2. **Zero-configuration team setup**: Volta automatically manages Node.js versions per project without requiring individual developer shell configuration
3. **Modern package management**: Yarn PnP offers performance comparable to pnpm while maintaining superior IDE and tooling compatibility
4. **Industry alignment**: Following established tools with strong momentum rather than experimental integrations
5. **Learning opportunity**: Understanding Yarn PnP's advanced dependency resolution while staying within proven ecosystem boundaries

## Consequences

**What becomes easier:**
- Consistent runtime environment from development to production
- Zero-config team environment consistency via Volta
- Significantly faster package installation and reduced disk usage
- Automatic Node.js version switching per project
- Strict dependency isolation prevents phantom dependency issues
- Better monorepo support for potential future scaling
- Shared package installations across multiple projects

**What becomes more difficult:**
- Learning Volta instead of more common nvm workflow
- Understanding Yarn PnP's loader-based architecture vs traditional node_modules
- Potential IDE configuration for optimal PnP support

**Risks:**
- Volta is newer with smaller ecosystem than nvm
- Yarn PnP may require workarounds for some tools
- Fallback to traditional tools (nvm + npm) is straightforward if needed
