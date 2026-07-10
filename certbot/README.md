# SSL Certificate Management

## Overview

This directory contains SSL certificate configuration and initialization scripts for Atash Travel. The system uses a two-stage certificate lifecycle:

### Stage 1: First Boot (Self-Signed Certificate)
When the application starts for the first time, the `certbot` service automatically:
1. Checks if certificates exist in `/etc/letsencrypt/live/atashtravel.com/`
2. If missing, generates a **self-signed certificate** valid for 90 days
3. This allows nginx to start immediately without errors
4. The self-signed cert is temporary and only used for initial validation

### Stage 2: Production (Let's Encrypt Certificate)
When ready for production, trigger certificate provisioning:
1. Re-run the deployment with `provision_ssl=true` in GitHub Actions
2. Certbot replaces the self-signed certificate with a real Let's Encrypt certificate
3. Nginx automatically uses the new certificate (same file path)
4. The process repeats automatically for certificate renewals

## Directory Structure

```
certbot/
├── init-certs.sh        # Script that generates self-signed cert on first boot
├── conf/                # Let's Encrypt certificate storage (created on first boot)
│   └── live/
│       └── atashtravel.com/
│           ├── fullchain.pem    # Combined certificate chain
│           └── privkey.pem      # Private key
└── www/                 # ACME challenge files for certificate validation
```

## First Deployment

On the first deployment, no manual SSL setup is needed:

```bash
# 1. Deploy normally (certificates will be self-signed)
git push origin main

# 2. Verify deployment
curl http://atashtravel.com/health

# 3. Once ready for HTTPS with real certs:
# - Go to GitHub Actions
# - Click "Deploy Atash Travel" workflow
# - Click "Run workflow"
# - Set "provision_ssl" to "true"
# - Click "Run workflow"

# 4. Monitor the deployment
# Certbot will obtain the certificate and nginx will reload
```

## Troubleshooting

### Nginx won't start
Check if certbot initialized properly:
```bash
docker compose logs certbot
docker compose exec certbot ls -la /etc/letsencrypt/live/atashtravel.com/
```

### Certificate errors in logs
If you see SSL certificate warnings:
- First deployment: This is expected, you're using a self-signed cert
- After production deployment: Run with `provision_ssl=true` to get a real cert

### Manual Certificate Renewal
To manually renew certificates without waiting for Certbot's auto-renewal:
```bash
docker compose exec talaseen-certbot certbot renew --force-renewal
```

### Checking Certificate Details
```bash
# View self-signed or real certificate
docker compose exec certbot openssl x509 -in /etc/letsencrypt/live/atashtravel.com/fullchain.pem -text -noout

# Check expiration date
docker compose exec certbot openssl x509 -enddate -noout -in /etc/letsencrypt/live/atashtravel.com/fullchain.pem
```

## Security Notes

- ⚠️ Self-signed certificates are **for initial testing only**
- ✅ Always obtain a real Let's Encrypt certificate before production use
- ✅ Certificates are automatically renewed before expiration
- ✅ ACME validation uses the `/var/www/certbot` directory over HTTP
- ✅ Nginx is configured to serve ACME challenges on port 80 while SSL is port 443

## File References

- **docker-compose.yml**: Certbot service and volume configuration
- **docker/nginx/conf.d/default.conf**: Nginx SSL configuration and ACME routing
- **.github/workflows/deploy.yml**: Deployment workflow with `provision_ssl` option
