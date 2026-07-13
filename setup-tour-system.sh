#!/bin/bash

# Tour Management System - Quick Start Script
# This script helps you get the tour management system up and running

set -e

echo "🚀 Starting Atash Travel Tour Management System Setup..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker is running${NC}"

# Start services
echo ""
echo "📦 Starting Docker services..."
docker-compose up -d postgres redis minio

# Wait for PostgreSQL to be ready
echo ""
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check if database is ready
until docker exec atashtravel-postgres pg_isready -U atashtravel > /dev/null 2>&1; do
    echo "Waiting for database..."
    sleep 2
done

echo -e "${GREEN}✅ PostgreSQL is ready${NC}"

# Run migration
echo ""
echo "📊 Running database migration..."
cd apps/api

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run Prisma migration
echo "Running Prisma migrate..."
npx prisma migrate deploy || {
    echo -e "${YELLOW}⚠️  Prisma migrate failed, trying manual migration...${NC}"
    docker exec -i atashtravel-postgres psql -U atashtravel -d atashtravel < prisma/migrations/manual_tour_enhancement.sql
}

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

echo -e "${GREEN}✅ Database migration completed${NC}"

# Check MinIO
echo ""
echo "🗄️  Checking MinIO..."
until curl -s http://localhost:9000/minio/health/live > /dev/null 2>&1; do
    echo "Waiting for MinIO..."
    sleep 2
done
echo -e "${GREEN}✅ MinIO is ready${NC}"

cd ../..

# Install web dependencies if needed
if [ ! -d "apps/web/node_modules" ]; then
    echo ""
    echo "📦 Installing web dependencies..."
    cd apps/web
    npm install
    cd ../..
fi

echo ""
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Start the API server:"
echo "   cd apps/api && npm run dev"
echo ""
echo "2. Start the web server (in another terminal):"
echo "   cd apps/web && npm run dev"
echo ""
echo "3. Access the admin panel:"
echo "   http://localhost:3000/admin/tours"
echo ""
echo "4. MinIO Console (optional):"
echo "   http://localhost:9001 (admin/minioadmin)"
echo ""
echo -e "${YELLOW}⚠️  Note: You need to be logged in as admin to access /admin/tours${NC}"
echo ""
echo "📚 For more information, see TOUR_MANAGEMENT_GUIDE.md"
