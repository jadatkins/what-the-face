# 5. Database Stack

Date: 2025-06-17 (edited 2026-06-21 and 2026-07-02)

## Status

Accepted

## Context

The application requires a database solution that is affordable for a hobby project with
minimal operational overhead. We need both a database engine and an ORM that provide type
safety and integrate well with our TypeScript stack. The solution should align with our
priorities of simplicity, cost-effectiveness, and strong data privacy protections.

## Decision

We will use:
- **Drizzle** as our ORM
- **Render Postgres** as our PostgreSQL hosting provider

Render will host the database in their EU (Frankfurt) region to match our application hosting location (see ADR-0003).

### Alternatives Considered

**ORM:**
- **Prisma** - PRejected in favour of Drizzle's lower runtime overhead, SQL-like query model, extensibility, and lack of a code generation step
- **Sequelize** - Rejected due to reduced learning opportunity since I am already familiar with raw SQL

**Database Hosting:**
- **Aiven** - Rejected in favor of consolidating hosting providers
- **Neon** - Rejected due to US ownership
- **Supabase** - Rejected due to US ownership
- **Xata Lite** - British company but hardware is AWS (Amazon Web Services)
- **Scaleway** - French company with own hardware but rejected due to lack of free tier and added complexity

### Key Factors

1. **Simplicity**: Single hosting provider (Render) for both application and database reduces complexity and account management overhead
2. **Developer sentiment**: Drizzle has strong developer preference among respondents in the State of Databases ORM survey
3. **Cost-effectiveness**: Render offers free PostgreSQL for 90 days, then Basic tier from $7/month
4. **Data privacy**: Canadian ownership with EU hosting option (Frankfurt region)
5. **Integration**: Native integration between Render services and Render Postgres databases
6. **Query transparency**: Drizzle's SQL-like API makes it easier to reason about the efficiency of generated queries and to drop down to SQL when needed

## Consequences

**What becomes easier:**
- Single platform for both application and database simplifies operations
- Automatic private networking between Render services and databases
- One account to manage instead of two (previously Koyeb + Aiven)
- Unified billing and monitoring
- Database backups and point-in-time recovery included
- No ORM client generation step is required after schema changes
- SQL-like syntax makes query efficiency easier to reason about

**What becomes more difficult:**
- Database hosting is not European-owned (though data is EU-hosted)
- Learning industry standards: the most widely-known ORM for TypeScript is Prisma

**Risks:**
- Dependency on Render's platform stability for both application and database
- Canadian ownership means slightly weaker data privacy laws than EU providers like Aiven
- Less mature database offering compared to specialized providers like Aiven
- Single point of failure if Render experiences issues
- Drizzle's ecosystem is much younger than Prisma's, and the documentation is incomplete in places

### Notes

While this decision moves away from European-owned infrastructure, the benefits
of consolidation, cost savings, and developer experience outweigh the geographic
ownership preference. Canada has strong data privacy protections, and hosting
data in the EU (Frankfurt) region provides adequate privacy safeguards.
