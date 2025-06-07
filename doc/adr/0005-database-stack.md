# 5. Database Stack

Date: 2025-06-07

## Status

Accepted

## Context

The application requires a database solution that can scale from zero usage (hobby project) to production loads, with minimal operational overhead. We need both a database engine and an ORM that provide type safety and integrate well with our TypeScript stack.

## Decision

We will use:
- **Neon** as our PostgreSQL hosting provider
- **Prisma** as our ORM

### Alternatives Considered

**Database Hosting:**
- **Supabase** - Rejected due to higher costs and additional features (like built-in auth) that we don't need, given our separate auth provider choice
- **Prisma.io database hosting** - Considered but Neon offers better cost-effectiveness
- **Self-hosted PostgreSQL** - Rejected due to operational complexity for a hobby project

**ORM:**
- **Drizzle** - Rejected in favor of Prisma's better schema readability, automatic migrations, and wider adoption in the community

### Key Factors

- **Cost-effectiveness**: Neon offers a generous free tier and true serverless scaling
- **Type safety**: Prisma provides excellent TypeScript integration
- **Developer experience**: Automatic migrations and schema management
- **Simplicity**: Focus on database functionality without additional services

## Consequences

**What becomes easier:**
- True serverless PostgreSQL with scale-to-zero cost benefits
- Type-safe database queries with Prisma's generated client
- Automatic schema migrations and version control
- Excellent TypeScript integration across the stack
- Minimal operational overhead for database management

**What becomes more difficult:**
- Vendor lock-in to Neon's platform and Prisma's ORM approach
- Less flexibility compared to raw SQL for complex queries
- Potential migration complexity if switching providers later

**Risks:**
- Dependency on Neon's platform stability and pricing
- Prisma's code generation approach may add build complexity
