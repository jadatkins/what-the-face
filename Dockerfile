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
# Install ALL dependencies needed for the build
RUN yarn install --immutable

# 3. Build stage to create the application bundle
FROM deps AS build
USER appuser
COPY --chown=appuser:nodejs . .
# Run the build script from your package.json
RUN yarn build

# 4. Production stage with only necessary artifacts
FROM base AS production
ENV NODE_ENV=production
ENV HUSKY=0
USER appuser
# Copy necessary files from the build stage
COPY --from=build --chown=appuser:nodejs /app/package.json /app/yarn.lock /app/.yarnrc.yml ./
COPY --from=build --chown=appuser:nodejs /app/.pnp.cjs /app/.pnp.loader.mjs ./
COPY --from=build --chown=appuser:nodejs /app/.yarn ./.yarn
# Copy the built application output
COPY --from=build --chown=appuser:nodejs /app/build ./build

# Expose the port your SSR server listens on
EXPOSE 3000

# The command to run your SSR server
CMD ["yarn", "start"]