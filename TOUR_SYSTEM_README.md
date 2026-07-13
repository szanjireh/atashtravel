# 🎉 Tour Management System - Quick Setup

## New Feature: Admin Tour Management

Admins can now add, edit, and manage tours through a web interface without any coding!

### 🚀 Quick Start

```bash
# 1. Run automated setup
./setup-tour-system.sh

# 2. Start API (Terminal 1)
cd apps/api && npm run dev

# 3. Start Web (Terminal 2)
cd apps/web && npm run dev

# 4. Access admin panel
http://localhost:3000/admin/tours
```

### 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Quick reference guide
- **[TOUR_MANAGEMENT_GUIDE.md](TOUR_MANAGEMENT_GUIDE.md)** - Complete implementation guide
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Technical overview
- **[MIGRATION_INSTRUCTIONS.md](MIGRATION_INSTRUCTIONS.md)** - Database migration help

### ✨ Features

✅ **No Manual Coding** - Add tours via web interface
✅ **Image Upload** - Direct upload to MinIO storage
✅ **Dynamic Pages** - Automatic page generation
✅ **SEO Optimized** - Full metadata and structured data
✅ **Dynamic Sitemap** - Auto-updates with new tours
✅ **Draft System** - Save before publishing
✅ **Featured Tours** - Mark special tours
✅ **Rich Content** - Itinerary, FAQs, services, attractions

### 🎯 Admin Panel

Access: `http://localhost:3000/admin/tours`

Features:
- Create, edit, delete tours
- Upload images (cover, hero, gallery)
- Manage tour status (draft/active)
- Toggle featured tours
- View statistics
- Inline quick actions

### 🌐 Public Pages

- `/tours` - Tour listing (fetches from API)
- `/tours/[slug]` - Tour detail page (auto-generated)
- `/sitemap.xml` - Dynamic sitemap

### 🛠️ Technology Stack

- **Backend**: NestJS + PostgreSQL + Prisma
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Storage**: MinIO (S3-compatible)
- **Infrastructure**: Docker Compose

### 📦 What's Included

1. **Enhanced Tour Model** - 30+ fields including images, SEO, content
2. **File Upload Service** - MinIO integration with validation
3. **Tour CRUD API** - Complete REST API with authentication
4. **Admin Interface** - Full-featured management panel
5. **Dynamic Frontend** - Server-side rendered tour pages
6. **SEO Implementation** - Metadata, structured data, sitemap
7. **Documentation** - Comprehensive guides and scripts

### 🎓 Usage Example

**Adding a Tour:**
1. Go to `/admin/tours`
2. Click "افزودن تور جدید"
3. Fill in tour details
4. Upload images
5. Click "ایجاد تور"
6. Tour is live at `/tours/your-slug`

**Result:**
- ✅ Tour appears in listing
- ✅ Detail page is created
- ✅ Sitemap is updated
- ✅ SEO metadata is generated
- ✅ No manual deployment needed

### 🔒 Authentication Required

The admin panel requires authentication. Make sure you have:
- Valid access token
- Admin or tour_manager role

### 💾 Database Migration

First time setup:
```bash
cd apps/api
npx prisma migrate dev
```

Or use the setup script:
```bash
./setup-tour-system.sh
```

### 🐛 Troubleshooting

**Tours not showing?**
- Verify tour status is `active`
- Clear Next.js cache: `rm -rf .next`

**Images not loading?**
- Check MinIO is running: `docker ps | grep minio`
- Verify MINIO_PUBLIC_URL in .env

**Can't access admin?**
- Ensure you're logged in
- Check user has admin role

See [TOUR_MANAGEMENT_GUIDE.md](TOUR_MANAGEMENT_GUIDE.md) for more help.

### 📈 Performance

- Server-side rendering for fast initial load
- Incremental Static Regeneration (ISR) for caching
- Image optimization
- API response caching (60s)

### 🎊 Success!

The Tour Management System is complete and production-ready. Start adding tours now!

For detailed information, see [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)

---

**Original README continues below...**
