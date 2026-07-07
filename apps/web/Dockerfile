# ==================================
# Stage 1: Dependencies
# ==================================
FROM node:20-alpine AS dependencies

WORKDIR /app

# Copy npm config for timeout settings
COPY .npmrc ./

# Copy root package files for workspace
COPY package*.json ./

# Copy workspace package files
COPY apps/web/package*.json ./apps/web/

# Install dependencies with cache mount and retry
RUN --mount=type=cache,target=/root/.npm \
    npm ci --workspace=web || \
    npm ci --workspace=web || \
    npm ci --workspace=web

# Clean cache
RUN npm cache clean --force

# ==================================
# Stage 2: Build
# ==================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy npm config for timeout settings
COPY .npmrc ./

# Copy root package files
COPY package*.json ./

# Copy workspace package files
COPY apps/web/package*.json ./apps/web/

# Install all dependencies with cache mount and retry
RUN --mount=type=cache,target=/root/.npm \
    npm ci --workspace=web || \
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

WORKDIR /app/apps/web

# Build the application
RUN npm run build

# ==================================
# Stage 3: Production
# ==================================
FROM node:20-alpine AS production

WORKDIR /app

# Install dumb-init
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from build stage
COPY --from=build --chown=nextjs:nodejs /app/apps/web/public ./public
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/web/server.js"]
