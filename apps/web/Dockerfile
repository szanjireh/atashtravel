# ==================================
# Stage 1: Dependencies
# ==================================
FROM node:20-slim AS dependencies

WORKDIR /app

COPY .npmrc ./
COPY package.json package-lock.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm ci --workspace=web || \
    npm ci --workspace=web || \
    npm ci --workspace=web

RUN npm cache clean --force

# ==================================
# Stage 2: Build
# ==================================
FROM node:20-slim AS build

WORKDIR /app

COPY .npmrc ./
COPY package.json package-lock.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm ci --workspace=web || \
    npm ci --workspace=web || \
    npm ci --workspace=web

COPY apps/web/ ./apps/web/

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build --workspace=web

# ==================================
# Stage 3: Production
# ==================================
FROM node:20-slim AS production

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs -m -s /bin/bash nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# The standalone output already includes its own pruned node_modules
# (mirroring the workspace path), so nothing else needs to be copied.
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone /app
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static /app/apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/web/public /app/apps/web/public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/web/server.js"]