#!/bin/sh
# ============================================
# Certificate Initialization Script
# Generates self-signed certificate on first boot
# Later replaced by real certificate from Let's Encrypt
# ============================================

set -e

CERTDIR="/etc/letsencrypt/live/atashtravel.com"
FULLCHAIN="$CERTDIR/fullchain.pem"

# Generate self-signed certificate if it doesn't exist
if [ ! -f "$FULLCHAIN" ]; then
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
    
    echo "✓ Self-signed certificate generated"
    echo "  This is a temporary bootstrap certificate for initial deployment."
    echo "  It will be replaced with a real certificate when provision_ssl=true"
else
    echo "→ Certificate already exists - skipping bootstrap generation"
    echo "  (type: $(sh /detect-cert-type.sh 2>/dev/null || echo 'unknown'))"
fi

# Keep container alive (POSIX sh compatible, no Bash constructs)
trap 'exit 0' TERM
while true; do
    sleep 6h
done
