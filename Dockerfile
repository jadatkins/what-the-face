# 1. Base stage with Node.js and Corepack
FROM node:24-alpine AS base
# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser
WORKDIR /app
RUN chown appuser:nodejs /app
RUN corepack enable

# 2. Dependencies stage to cache yarn install
FROM base AS deps
USER appuser
COPY --chown=appuser:nodejs package.json yarn.lock .yarnrc.yml ./
COPY --chown=appuser:nodejs .yarn ./.yarn
RUN yarn install --immutable

# 3. Build stage to create the application bundle
FROM deps AS build
USER appuser
COPY --chown=appuser:nodejs . .
RUN yarn build

# 4. Production stage with only necessary artifacts
FROM base AS production
ENV NODE_ENV=production
ENV HUSKY=0
ENV DOTENVX_IGNORE=MISSING_ENV_FILE
USER appuser
COPY --from=deps --chown=appuser:nodejs /app/package.json /app/yarn.lock /app/.yarnrc.yml ./
COPY --from=deps --chown=appuser:nodejs /app/.yarn ./.yarn
RUN yarn install --immutable --mode skip-build
COPY --from=build --chown=appuser:nodejs /app/build ./build
COPY .env.production .

EXPOSE 3000
CMD ["yarn", "start"]
