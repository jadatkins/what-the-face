# 4. Hosting Provider Selection

Date: 2025-06-07

## Status

Accepted

## Context

Having selected React Router v7 as our full-stack framework, we need a hosting provider that supports this framework well, offers a good developer experience, and provides cost-effective hosting for a hobby project. The hosting choice is influenced by framework compatibility and deployment ease.

## Decision

We will use **Vercel** for hosting.

### Alternatives Considered

- **Netlify** - Rejected due to less optimal React ecosystem integration compared to Vercel
- **Railway** - Rejected as it's more complex than needed for this project's requirements
- **Heroku** - Rejected due to cost considerations and less modern deployment pipeline
- **Fly.io** - Considered but Vercel offers superior developer experience for React-based applications

### Key Factors

Framework support was a significant consideration, as different hosting providers have varying levels of support for React Router v7 and React-based full-stack applications.

## Consequences

**What becomes easier:**
- Zero-configuration deployments with automatic builds
- Excellent React ecosystem integration
- GitHub integration for automatic deployments
- Superior developer experience with preview deployments
- Built-in performance optimization and edge network

**What becomes more difficult:**
- Potential vendor lock-in to Vercel-specific features
- Cost scaling for high-traffic applications (though free tier is generous for hobby projects)

**Risks:**
- Dependency on Vercel's platform and pricing changes
- Less control over deployment infrastructure compared to self-hosted solutions
