# MCP Tool Workflow Guide

This document provides workflow tips for the MCP (Model Context Protocol) tools available in this project, complementing Claude's built-in development capabilities.

## Zen MCP Server Tools

### `debug` Tool - Systematic Investigation

**When to use:**
- Complex, multi-layered problems where systematic investigation is needed
- System configuration issues (Docker, dependency resolution, build problems)
- Issues where cause-effect relationships aren't immediately clear

**When NOT to use:**
- Simple errors with clear messages - traditional debugging is faster
- Straightforward runtime errors that can be quickly diagnosed

**Workflow value:**
- Forces methodical evidence collection across multiple investigation steps
- Prevents jumping to conclusions or missing important context
- Excellent for configuration problems like Yarn PnP cache issues

### `chat` Tool - Collaborative Thinking

**When to use:**
- Need expert opinions or second perspectives on technical decisions  
- Technology comparisons and architectural discussions
- Validating approaches before implementation
- Brainstorming solutions and exploring alternatives

**Workflow tip:**
- Great for challenging your assumptions and getting validation
- Use before major implementation decisions

### `challenge` Tool - Prevents Reflexive Agreement

**When to use:**
- When the user disagrees with Claude's assessment or approach
- When Claude seems to be agreeing too quickly without proper analysis
- When the user wants to ensure thorough critical evaluation of competing ideas

**Workflow value:**
- Prevents "You're absolutely right!" responses when you might actually be wrong
- Forces deeper analysis of disagreements and competing approaches
- Encourages honest technical debate rather than compliance

### `planner` Tool - Interactive Step-by-Step Planning

**When to use:**
- Validating complex multi-phase development plans
- Breaking down implementations with multiple dependencies
- Migration strategies and architectural changes requiring sequencing
- System design projects where plan structure matters

**When NOT to use:**
- Simple single-step tasks or straightforward implementations
- Time-sensitive quick fixes

**Workflow value:**
- Provides systematic analysis of plan structure and technical dependencies
- Identifies missing infrastructure concerns (environment management, migrations)
- Validates engineering judgment with expert perspective
- Supports revision and alternative approach exploration

### `consensus` Tool - Multi-Model Decision Validation

**When to use:**
- Validating technical decisions or architectural choices
- When you need expert perspectives on competing approaches
- Resolving debates about best practices or implementation strategies
- Getting structured analysis of complex trade-offs

**When NOT to use:**
- Simple technical questions with clear answers
- When time is critical and one expert opinion suffices

**Workflow value:**
- Provides multiple expert perspectives with different stances (for/against/neutral)
- Structured analysis of technical feasibility, risks, and alternatives
- Validates engineering judgment with systematic expert consultation
- Helps resolve conflicts between different valid approaches

## Context7 Documentation Tools

### Documentation Lookup Workflow

**Primary advantage:** Gets current, accurate documentation vs potentially outdated web search results

**Workflow:**
1. Use `resolve-library-id` first to get the correct Context7-compatible library ID
2. Then use `get-library-docs` with specific topics for focused documentation

For each topic, ask for a low number of tokens (e.g. 1000) to save on Claude API usage. If the response
doesn't contain the information that you're looking for, try with different search terms. Ask the user
before making a request with a larger number of tokens.

**When to use:**
- Anytime you need library-specific documentation
- When debugging framework-specific configuration issues
- Before relying on potentially outdated web search results

## Playwright Browser Tools

### Visual Testing and Verification

**When to use:**
- Verifying web applications are loading and displaying correctly
- Taking screenshots for documentation or issue reporting
- Testing user interfaces and interactions during development
- Validating that servers are running and accessible

**Key capabilities:**
- Navigate to URLs and capture page state
- Take screenshots of full pages or specific elements
- Interact with page elements (click, type, etc.)
- Verify page content and accessibility

**Workflow value:**
- Provides immediate visual confirmation that applications are working
- Generates screenshots for documentation and debugging
- Enables automated testing of UI components and user flows

**IMPORTANT: Call `browser_close` when finished with browser tasks**
- Prevents "Browser is already in use" errors when using Playwright tools again
- Call it at the end of each browser workflow, before moving to the next task
- Not needed between individual tools in the same workflow (navigate → snapshot → close)

## Tool Selection Decision Tree

1. **Complex system problem requiring investigation** → zen `debug` for systematic analysis
2. **Need expert opinion or validation** → zen `chat` for collaborative thinking  
3. **User disagrees with your assessment** → zen `challenge` for critical re-evaluation
4. **Need current library documentation** → Context7 workflow first, WebSearch as fallback
5. **Complex project requiring step-by-step planning** → zen `planner` for structured breakdown
6. **Technical decision needs expert validation** → zen `consensus` for multi-model analysis
7. **Need to verify web application is working** → Playwright tools for visual testing

## Key Workflow Insights

- **MCP tools excel at providing systematic approaches and expert perspectives**
- **Use them when you need methodical investigation or collaborative validation**
- **The `debug` tool should be used more frequently - it excels at complex multi-layered problems**
- **The `consensus` tool provides valuable expert validation for technical decisions**
- **The `challenge` tool is crucial for preventing reflexive agreement when users disagree**
- **Playwright tools provide immediate visual confirmation of web application functionality**
- **They complement (don't replace) standard development tools**
- **Context7 is invaluable for getting current, accurate documentation**
- **Systematic tools like `debug` shine for complex problems but can be overkill for simple issues**

## Development Workflow Reminders

### After Making Code Changes

When making changes to the codebase (especially adding new components or dependencies):

1. **Rebuild Docker container**: `docker-compose up --build`
   - Docker uses cached images by default, so new files won't be included without the `--build` flag
   - This is essential when adding new components, dependencies, or any source code changes

2. **Verify changes with Playwright**: Use browser tools to confirm changes are visible
   - Navigate to the application URL (typically http://localhost:3000)
   - Use browser snapshot to verify that components render correctly
   - Don't assume successful builds mean successful rendering - always verify visually
