# ==================================
# Stage 1: Dependencies
# ==================================
FROM node:20-slim AS dependencies

WORKDIR /app

# Copy npm config for timeout settings
COPY .npmrc ./

# Copy root package files for workspace (including lock file)
COPY package.json package-lock.json ./

# Copy workspace package files
COPY apps/web/package*.json ./apps/web/

# Install dependencies with retry
RUN npm ci --workspace=web || \
    npm ci --workspace=web || \
    npm ci --workspace=web

# Clean cache
RUN npm cache clean --force

# ==================================
# Stage 2: Build
# ==================================
FROM node:20-slim AS build

WORKDIR /app

# Copy npm config for timeout settings
COPY .npmrc ./

# Copy root package files (including lock file)
COPY package.json package-lock.json ./

# Copy workspace package files
COPY apps/web/package*.json ./apps/web/

# Install all dependencies with retry
RUN npm ci --workspace=web || \
    npm ci --workspace=web || \
    npm ci --workspace=web

# Copy source code
COPY apps/web/ ./apps/web/

# Set build-time environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application (stay in /app to find workspace root)
RUN npm run build --workspace=web

# ==================================
# Stage 3: Production
# ==================================
FROM node:20-slim AS production

WORKDIR /app

# Install dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs -m -s /bin/bash nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from build stage
# Standalone output includes the full workspace structure
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone /app
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static /app/apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/web/public /app/apps/web/public

# Ensure .next is accessible from root for server.js
RUN mkdir -p /app/.next && \
    ln -s /app/apps/web/.next/static /app/.next/static || true

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=5 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
