# 5. Database Stack

Date: 2025-06-17 (amended 2026-06-21)

## Status

Accepted

## Context

The application requires a database solution that is affordable for a hobby project with minimal operational overhead. We need both a database engine and an ORM that provide type safety and integrate well with our TypeScript stack. The solution should align with our priorities of simplicity, cost-effectiveness, and strong data privacy protections.

## Decision

We will use:
- **Prisma** as our ORM
- **Render Postgres** as our PostgreSQL hosting provider

Render will host the database in their EU (Frankfurt) region to match our application hosting location (see ADR-0003).

### Alternatives Considered

**ORM:**
- **Drizzle** - Rejected in favour of Prisma's better schema readability and maturity
- **Sequelize** - Rejected due to reduced learning opportunity since I am already familiar with raw SQL

**Database Hosting:**
- **Aiven** - Initially chosen but later rejected in favor of consolidating hosting providers
- **Neon** - Rejected due to US ownership
- **Supabase** - Rejected due to US ownership
- **Xata Lite** - British company but hardware is AWS (Amazon Web Services)
- **Scaleway** - French company with own hardware but rejected due to lack of free tier and added complexity

### Key Factors

1. **Simplicity**: Single hosting provider (Render) for both application and database reduces complexity and account management overhead
2. **Developer experience**: Type safety with Prisma, automatic schema migrations, easy connection to application
3. **Cost-effectiveness**: Render offers free PostgreSQL for 90 days, then Basic tier from $7/month
4. **Data privacy**: Canadian ownership with EU hosting option (Frankfurt region)
5. **Integration**: Native integration between Render services and Render Postgres databases

## Consequences

**What becomes easier:**
- Single platform for both application and database simplifies operations
- Automatic private networking between Render services and databases
- One account to manage instead of two (previously Koyeb + Aiven)
- Unified billing and monitoring
- Database backups and point-in-time recovery included

**What becomes more difficult:**
- Prisma's code generation approach adds a build step
- Less flexibility compared to raw SQL for complex queries
- Database hosting is not European-owned (though data is EU-hosted)

**Risks:**
- Dependency on Render's platform stability for both application and database
- Canadian ownership means slightly weaker data privacy laws than EU providers like Aiven
- Less mature database offering compared to specialized providers like Aiven
- Single point of failure if Render experiences issues

### Notes

While this decision moves away from European-owned infrastructure (Aiven is Finnish), the benefits of consolidation, cost savings, and developer experience outweigh the geographic ownership preference. Canada has strong data privacy protections, and hosting data in the EU (Frankfurt) region provides adequate privacy safeguards for a UK-based hobby project.
