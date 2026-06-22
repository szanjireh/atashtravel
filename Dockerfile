FROM nginx:1.27-alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/atashtravel.conf

# Copy static site files
COPY . /usr/share/nginx/html/atashtravel/

# Remove Docker/config files from the served directory
RUN rm -f /usr/share/nginx/html/atashtravel/Dockerfile \
          /usr/share/nginx/html/atashtravel/nginx.conf \
          /usr/share/nginx/html/atashtravel/docker-compose.yml

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/health || exit 1
