#!/bin/bash

# ===========================================
# Atash Travel - Quick Setup Script
# ===========================================

echo "🚀 Starting Atash Travel Platform Setup..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if .env exists
echo ""
echo "📝 Step 1: Checking environment configuration..."
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠ .env file not found. Creating from .env.example...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${GREEN}✓ Created .env file${NC}"
    else
        echo -e "${RED}✗ .env.example not found. Please create .env manually.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

# Step 2: Start Docker services
echo ""
echo "🐳 Step 2: Starting Docker services..."
docker-compose up -d postgres redis

echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check if PostgreSQL is ready
until docker-compose exec -T postgres pg_isready -U atashtravel; do
    echo "⏳ Waiting for PostgreSQL..."
    sleep 2
done

echo -e "${GREEN}✓ PostgreSQL is ready${NC}"

# Step 3: Install dependencies
echo ""
echo "📦 Step 3: Installing dependencies..."

echo "Installing root dependencies..."
npm install

echo "Installing API dependencies..."
cd apps/api && npm install && cd ../..

echo "Installing Web dependencies..."
cd apps/web && npm install && cd ../..

echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 4: Setup database
echo ""
echo "🗄️  Step 4: Setting up database..."

cd apps/api

echo "Generating Prisma Client..."
npx prisma generate

echo "Running database migrations..."
npx prisma migrate deploy

echo -e "${GREEN}✓ Database setup complete${NC}"

cd ../..

# Step 5: Summary
echo ""
echo "============================================="
echo -e "${GREEN}✓ Setup Complete!${NC}"
echo "============================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Start API server:"
echo "   cd apps/api && npm run dev"
echo ""
echo "2. In another terminal, start Web server:"
echo "   cd apps/web && npm run dev"
echo ""
echo "3. Access the application:"
echo "   - Web: http://localhost:3000"
echo "   - API: http://localhost:4000"
echo "   - Admin Panel: http://localhost:3000/admin"
echo ""
echo "4. Check the documentation:"
echo "   See IMPLEMENTATION_COMPLETE_GUIDE.md"
echo ""
echo "============================================="
