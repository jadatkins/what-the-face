# 8. Testing and CI/CD Strategy

Date: 2025-06-07

## Status

Accepted

## Context

As a single-developer hobby project focused on learning TypeScript and modern web development, we need development tools that minimize configuration overhead while enforcing good practices. The priority is on tools that work well out-of-the-box, integrate seamlessly with our chosen stack, and provide fast feedback loops for learning.

## Decision

We will implement the following development toolchain:

### Testing
- **Vitest** + **React Testing Library** for unit and component testing
- **Playwright** for potential future E2E testing (when needed)

### Code Quality
- **Biome** for both linting and formatting
- **TypeScript strict mode** for enhanced type safety
- **Lefthook** for git hook management

### CI/CD
- **GitHub Actions** for continuous integration
- **Vercel Speed Insights** + **Sentry** for performance monitoring

### Alternatives Considered

**Testing Frameworks:**
- **Jest** - Rejected in favor of Vitest due to better Vite integration and faster performance
- **Cypress** - Rejected for E2E in favor of Playwright's better TypeScript support

**Code Quality Tools:**
- **ESLint + Prettier** - Rejected due to configuration complexity and potential conflicts between tools
- **dprint** - Rejected due to smaller community and less integration with VS Code

**Git Hook Managers:**
- **Husky + lint-staged** - Rejected due to multiple dependencies and JavaScript-based configuration
- **Simple Git Hooks** - Rejected due to manual setup requirements

**CI/CD Alternatives:**
- **No CI initially** - Rejected as good practices should be established early
- **Vercel-only checks** - Insufficient for comprehensive testing strategy

### Key Decision Factors

Choices prioritized:
1. **Minimal configuration**: Tools that work with sane defaults
2. **Single-tool solutions**: Biome over ESLint+Prettier, Lefthook over Husky+lint-staged
3. **Learning-friendly**: Strong TypeScript integration and helpful error messages
4. **Integration**: Compatibility with React Router v7, Vite, and Vercel deployment

## Consequences

**What becomes easier:**
- Zero-config code quality enforcement with Biome's defaults
- Consistent development environment across different machines with Lefthook
- Fast test feedback with Vitest's integration with our Vite-based stack
- TypeScript learning with strict mode preventing bad habits
- Performance insights with minimal setup via Vercel integration

**What becomes more difficult:**
- Less flexibility for highly customized linting rules compared to ESLint
- Smaller community for Biome/Lefthook troubleshooting compared to traditional tools
- Learning new tool-specific configurations instead of industry-standard ones

**Risks:**
- Biome is newer and may have fewer edge-case solutions than ESLint
- Dependency on newer tools with potentially less stability
- Migration complexity if switching back to traditional toolchain later
