#!/bin/sh
# ============================================
# Certificate Type Detector & Manager
# Identifies self-signed vs Let's Encrypt certs
# Safely removes bootstrap certs before renewal
# ============================================

set -e

CERTDIR="/etc/letsencrypt/live/atashtravel.com"
FULLCHAIN="$CERTDIR/fullchain.pem"

# Check if certificate exists
if [ ! -f "$FULLCHAIN" ]; then
    echo "no-cert"
    exit 0
fi

# Detect if certificate is self-signed or issued by Let's Encrypt
# A Let's Encrypt cert will have "Issuer: CN = R3" or similar (the CA issuer)
# A self-signed cert will have "Issuer: CN = atashtravel.com" (same as subject)

ISSUER=$(openssl x509 -in "$FULLCHAIN" -noout -issuer 2>/dev/null | grep -o 'CN = [^,]*' || echo "CN = unknown")
SUBJECT=$(openssl x509 -in "$FULLCHAIN" -noout -subject 2>/dev/null | grep -o 'CN = [^,]*' || echo "CN = unknown")

# Check if issuer and subject are the same (self-signed)
if [ "$ISSUER" = "$SUBJECT" ]; then
    echo "self-signed"
    exit 0
fi

# Check if issued by Let's Encrypt (contains 'R3' or 'E1' or other LE issuers)
if echo "$ISSUER" | grep -q "R3\|E1\|ISRG"; then
    echo "letsencrypt"
    exit 0
fi

# Default to unknown - treat as potentially valid certificate
echo "unknown"
exit 0
