# ==================================
# Stage 1: Dependencies
# ==================================
FROM node:20-slim AS dependencies

WORKDIR /app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy npm config for timeout settings
COPY .npmrc ./

# Copy root package files for workspace (including lock file)
COPY package.json package-lock.json ./

# Copy workspace package files
COPY apps/api/package*.json ./apps/api/

# Install only production dependencies
# Retry npm ci up to 3 times on failure
RUN npm ci --workspace=api --omit=dev || \
    npm ci --workspace=api --omit=dev || \
    npm ci --workspace=api --omit=dev

# Clean up build dependencies
RUN apt-get purge -y --auto-remove python3 build-essential && \
    rm -rf /var/lib/apt/lists/* && \
    npm cache clean --force

# ==================================
# Stage 2: Build
# ==================================
FROM node:20-slim AS build

WORKDIR /app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends python3 build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy npm config for timeout settings
COPY .npmrc ./

# Copy root package files (including lock file)
COPY package.json package-lock.json ./

# Copy workspace package files
COPY apps/api/package*.json ./apps/api/

# Install all dependencies (including dev) with retry
RUN npm ci --workspace=api || \
    npm ci --workspace=api || \
    npm ci --workspace=api

# Copy Prisma schema
COPY apps/api/prisma ./apps/api/prisma/

# Generate Prisma Client (npm workspace hoists to root node_modules)
RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

# Copy source code
COPY apps/api/ ./apps/api/

# Build the application (change to api directory to run nest build)
WORKDIR /app/apps/api
RUN npm run build

# Return to app root
WORKDIR /app

# Clean up build dependencies
RUN apt-get purge -y --auto-remove python3 build-essential && \
    rm -rf /var/lib/apt/lists/*

# ==================================
# Stage 3: Production
# ==================================
FROM node:20-slim AS production

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init && \
    rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -g 1001 nodejs && \
    useradd -m -u 1001 -g nodejs nestjs

# Copy root package files
COPY --from=dependencies --chown=nestjs:nodejs /app/package*.json ./

# Copy dependencies from dependencies stage
COPY --from=dependencies --chown=nestjs:nodejs /app/node_modules ./node_modules

# Copy generated Prisma Client from build stage (npm workspace hoists to root node_modules)
COPY --from=build --chown=nestjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build --chown=nestjs:nodejs /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copy built application from build stage
COPY --from=build --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=build --chown=nestjs:nodejs /app/apps/api/prisma ./prisma
COPY --from=build --chown=nestjs:nodejs /app/apps/api/package*.json ./apps/api/

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application using dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main"]
