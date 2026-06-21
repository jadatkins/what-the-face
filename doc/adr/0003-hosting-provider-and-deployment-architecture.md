# 3. Hosting Provider and Deployment Architecture

Date: 2025-06-15 (amended 2026-06-21)

## Status

Accepted

## Context

We need to select both a deployment architecture and hosting provider for our React / TypeScript application. The solution should align with our project priorities of minimizing development effort while providing learning opportunities. For data protection and privacy, I prefer hosting providers and infrastructure that are politically safe and have strong data privacy protections. The solution needs to be cost-effective for a hobby project.

Two primary deployment approaches are available:
1. **Platform as a Service with buildpacks** (zero-config deployment from Git)
2. **Docker containers** (explicit control over build and runtime environment)

## Decision

We will use:
- **Buildpacks** as our primary deployment method (with Docker as a fallback option)
- **Render** as our hosting provider

Render is a Canadian company, and we will use their EU (Frankfurt) region for data hosting.

### Deployment Architecture Decision

**Buildpacks** were chosen as the primary deployment method for:
- Zero-configuration deployment from Git repositories
- Automatic detection of Node.js, TypeScript, and pnpm
- Simpler developer experience with less boilerplate
- Still runs in isolated containers under the hood
- Docker remains available as a fallback for advanced use cases

### Hosting Provider Decision

**Render** was chosen for:
- **Superior developer experience**: Automatic deployments, preview environments for PRs, excellent documentation
- **Cost-effectiveness**: Generous free tier (web services that sleep after inactivity), then affordable paid plans starting at $7/month
- **Data privacy**: Canadian ownership with strong privacy protections, plus EU hosting option (Frankfurt region)
- **Simplicity**: Single platform for both application hosting and database (see ADR-0005)
- **Modern features**: Native buildpack support, preview environments, zero-downtime deploys

### Hosting Provider Alternatives Considered

- **Koyeb** - Initially chosen but later rejected due to acquisition by Mistral AI and loss of free tier (minimum $29/month)
- **Northflank** - UK-based with good free tier, but rejected due to:
  - Northflank Cloud runs on Google Cloud Platform (US-owned infrastructure)
  - Website and documentation suggested steeper learning curve than Render
- **Railway** - Rejected due to US ownership
- **Scaleway** - French company but rejected due to complex setup requirements and no PaaS features
- **Hetzner** - German company but rejected as it's VPS-focused, not a PaaS platform
- **Fly.io** - Rejected due to Canadian ownership without EU hosting options and Docker-only deployment

### Key Factors

1. **Data privacy and political safety**: UK/EU/Canada acceptable; US-owned infrastructure avoided where possible
2. **Cost-effectiveness**: Free tier for development, affordable for hobby project in production
3. **Developer experience**: Minimal configuration, automatic deployments, preview environments
4. **Simplicity**: Single provider for both compute and database reduces complexity
5. **Geographic data location**: EU region available (Frankfurt)

## Consequences

**What becomes easier:**
- Extremely fast setup - push to Git and deploy automatically
- Preview environments for every pull request
- No Dockerfile to maintain for simple Node.js applications
- Single platform reduces account management overhead
- Generous free tier enables cost-free development

**What becomes more difficult:**
- Less explicit control over build environment compared to Docker
- Canadian ownership means slightly weaker data privacy laws than EU (though still strong)
- Vendor-specific deployment configuration (though Render supports Docker as escape hatch)

**Risks:**
- Dependency on Render's platform stability and pricing
- Less control over infrastructure compared to European providers like Scaleway or Hetzner
- Future pricing changes could impact viability for hobby project

### Notes

While Render is Canadian-owned rather than European, Canada has strong data privacy protections and is considered politically safe. The combination of Canadian ownership with EU data hosting (Frankfurt region) provides an acceptable balance of privacy, cost, and developer experience for a UK-based hobby project with primarily UK/EU users.
