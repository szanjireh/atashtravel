# Atash Travel - Production Travel Agency Platform

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Private-red.svg)

## 🌟 Overview

Atash Travel is a comprehensive, production-ready travel agency platform comparable to Booking.com, Expedia, and Trip.com. This platform supports tour reservations, hotel bookings, flight reservations, and various travel services with a complete booking, payment, and management system.

## 🏗️ Architecture

This is a **monorepo** using npm workspaces with the following structure:

```
atashtravel/
├── apps/
│   ├── web/          # Next.js frontend (App Router)
│   └── api/          # NestJS backend API
├── packages/
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configuration
│   └── types/        # Shared TypeScript types
├── docker/           # Docker configurations
├── legacy/           # Previous static site (preserved)
└── docker-compose.yml
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Forms**: React Hook Form + Zod
- **State Management**: TanStack Query
- **HTTP Client**: Axios

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Authentication**: JWT + Passport
- **Documentation**: Swagger

### Infrastructure
- **Containers**: Docker + Docker Compose
- **Web Server**: Nginx
- **Storage**: MinIO (S3-compatible)
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker & Docker Compose
- PostgreSQL 16 (via Docker)
- Redis 7 (via Docker)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd atashtravel

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Start infrastructure services
npm run docker:up

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start development servers
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Documentation**: http://localhost:4000/api/docs

## 📦 Workspace Commands

### Development
```bash
npm run dev              # Start both frontend and backend
npm run dev:web          # Start frontend only
npm run dev:api          # Start backend only
```

### Build
```bash
npm run build            # Build all apps
npm run build:web        # Build frontend
npm run build:api        # Build backend
```

### Production
```bash
npm run start            # Start production servers
npm run docker:build     # Build Docker images
npm run docker:up        # Start all services
```

### Database
```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
```

### Quality
```bash
npm run lint             # Lint all workspaces
npm run test             # Test all workspaces
```

## 🐳 Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services:
- **web**: Next.js frontend (port 3000)
- **api**: NestJS backend (port 4000)
- **postgres**: PostgreSQL database (port 5432)
- **redis**: Redis cache (port 6379)
- **minio**: MinIO storage (port 9000)
- **nginx**: Reverse proxy (port 80/443)

## 🗄️ Database Schema

The database includes comprehensive tables for:
- ✅ User management & authentication
- ✅ Tours, hotels, flights
- ✅ Bookings & payments
- ✅ Wallet & coupons
- ✅ Invoices & vouchers
- ✅ Reviews & ratings
- ✅ Blog & CMS
- ✅ Audit logs

See [DATABASE.md](./docs/DATABASE.md) for complete schema documentation.

## 🔐 Security

- ✅ JWT authentication with refresh tokens
- ✅ Password hashing with Argon2
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ HTTPS enforcement
- ✅ Role-based access control (RBAC)

## 📱 Features

### Customer Features
- ✅ Tour search & booking
- ✅ Hotel reservations
- ✅ Flight booking
- ✅ User dashboard
- ✅ Booking management
- ✅ Payment processing
- ✅ Wallet system
- ✅ Coupon management
- ✅ Loyalty points
- ✅ Reviews & ratings

### Admin Features
- ✅ Complete admin dashboard
- ✅ User management
- ✅ Tour/hotel/flight management
- ✅ Booking management
- ✅ Payment tracking
- ✅ Analytics & reports
- ✅ Content management
- ✅ Settings configuration

### Additional Services
- ✅ Car rental
- ✅ Airport transfer
- ✅ Visa services
- ✅ Travel insurance
- ✅ Multi-language support (Persian, English, Turkish)
- ✅ Multi-currency support (IRR, USD, EUR, TRY)

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/DATABASE.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Contributing Guide](./docs/CONTRIBUTING.md)

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests for specific workspace
npm run test --workspace=apps/api
```

## 📝 License

Private - All rights reserved © 2024 Atash Travel

## 👥 Team

Developed with ❤️ by the Atash Travel team

---

**Version**: 2.0.0  
**Status**: In Development  
**Last Updated**: 2026-07-04
