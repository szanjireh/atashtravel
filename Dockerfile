# ==================================
# Stage 1: Dependencies
# ==================================
FROM node:20-slim AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm ci --workspace=apps/web
RUN npm cache clean --force

# ==================================
# Stage 2: Build
# ==================================
FROM node:20-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package*.json ./apps/web/

RUN npm ci --workspace=apps/web

COPY apps/web ./apps/web/

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build --workspace=apps/web

# ==================================
# Stage 3: Production
# ==================================
FROM node:20-slim AS production

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init && rm -rf /var/lib/apt/lists/*
RUN groupadd -g 1001 nodejs && useradd -u 1001 -g nodejs -m -s /bin/bash nextjs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=80

COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone /app
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static /app/apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/web/public /app/apps/web/public

USER nextjs

EXPOSE 80

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/web/server.js"]
