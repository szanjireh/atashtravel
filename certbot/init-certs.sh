#!/bin/sh
# ============================================
# Certificate Initialization Script
# Generates self-signed certificate on first boot
# Later replaced by real certificate from Let's Encrypt
# ============================================

set -e

CERTDIR="/etc/letsencrypt/live/atashtravel.com"

# Generate self-signed certificate if it doesn't exist
if [ ! -f "$CERTDIR/fullchain.pem" ]; then
    echo "→ First boot detected: Generating self-signed certificate..."
    mkdir -p "$CERTDIR"
    
    # Generate self-signed cert valid for 90 days
    openssl req -x509 \
        -nodes \
        -days 90 \
        -newkey rsa:2048 \
        -keyout "$CERTDIR/privkey.pem" \
        -out "$CERTDIR/fullchain.pem" \
        -subj "/CN=atashtravel.com/O=Atash Travel/C=TR" \
        -addext "subjectAltName=DNS:atashtravel.com,DNS:www.atashtravel.com" \
        2>/dev/null
    
    echo "✓ Self-signed certificate generated at $CERTDIR"
    echo "  This will be replaced by a real certificate when provision_ssl=true"
fi

# Keep container alive
trap exit TERM
while :; do sleep 6h & wait $${!}; done
