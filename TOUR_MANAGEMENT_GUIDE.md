# Tour Management System - Setup Guide

## ✅ Implementation Complete!

A complete tour management system has been built for Atash Travel. Admins can now add tours through a web interface without any manual coding.

---

## 🎯 What's Been Built

### Backend (NestJS)
- ✅ Enhanced Tour model with all required fields
- ✅ File upload service with MinIO integration
- ✅ Complete CRUD API for tours (`/api/v1/tours`)
- ✅ Image upload endpoints (`/api/v1/upload/tour-image`)
- ✅ Tour services (included/excluded)
- ✅ Tour itinerary support

### Frontend (Next.js)
- ✅ Admin tour management interface (`/admin/tours`)
- ✅ Tour creation/editing form with image upload
- ✅ Dynamic tour listing page (fetches from API)
- ✅ Dynamic tour detail pages (`/tours/[slug]`)
- ✅ Dynamic sitemap generation
- ✅ SEO metadata and structured data (JSON-LD)

---

## 🚀 Getting Started

### 1. Run Database Migration

```bash
cd apps/api
npx prisma migrate dev --name add_tour_management_fields
```

This will create all the necessary database tables and fields.

### 2. Start the Services

```bash
# Start all services with Docker Compose
docker-compose up -d

# Or start individually:
docker-compose up -d postgres redis minio
cd apps/api && npm run dev
cd apps/web && npm run dev
```

### 3. Access the Admin Panel

Navigate to:
```
http://localhost:3000/admin/tours
```

### 4. Create Your First Tour

1. Click "افزودن تور جدید" (Add New Tour)
2. Fill in the tour information:
   - Basic info (title, slug, destination, price, duration)
   - Upload images (cover, hero, gallery)
   - Add descriptions and details
   - Configure itinerary
   - Set included/excluded services
   - Add SEO metadata
3. Click "ایجاد تور" (Create Tour)
4. The tour will appear at `/tours/[your-slug]`

---

## 📋 API Endpoints

### Tours
- `GET /api/v1/tours` - List all tours
- `GET /api/v1/tours/featured` - Featured tours
- `GET /api/v1/tours/:slug` - Get tour by slug
- `POST /api/v1/tours` - Create tour (admin)
- `PATCH /api/v1/tours/:id` - Update tour (admin)
- `DELETE /api/v1/tours/:id` - Delete tour (admin)

### Image Upload
- `POST /api/v1/upload/tour-image` - Upload single image
- `POST /api/v1/upload/images` - Upload multiple images

---

## 🗂️ Tour Data Structure

### Required Fields
- `title` - Tour title
- `slug` - URL slug (auto-generated from title)
- `countryId` - Country ID
- `durationDays` - Number of days
- `durationNights` - Number of nights

### Optional Fields
- `destination` - Destination name
- `price` - Price (e.g., "450$")
- `priceDetail` - Price details
- `shortDescription` - Brief description
- `fullDescription` - Detailed description
- `coverImage` - Card image URL
- `heroImage` - Hero section image URL
- `galleryImages` - Array of image URLs
- `departureInfo` - Departure information
- `hotelInfo` - Hotel information
- `transportation` - Transportation details
- `whyChoose` - Array of reasons
- `bestTime` - Best time to visit
- `attractions` - Array of attractions
- `tips` - Array of travel tips
- `requiredDocuments` - Array of required documents
- `faqs` - Array of FAQ objects
- `servicesIncluded` - Array of included services
- `servicesExcluded` - Array of excluded services
- `hotels` - Array of hotel objects
- `itinerary` - Array of itinerary days
- `seoTitle` - SEO title
- `seoDescription` - SEO description
- `seoKeywords` - Array of keywords
- `seoOgImage` - Open Graph image
- `featured` - Featured flag
- `status` - Status (draft/active/inactive)

---

## 🖼️ Image Upload

### MinIO Configuration
Images are stored in MinIO object storage:
- Endpoint: `http://localhost:9000`
- Bucket: `atashtravel`
- Folder: `images/tours/`

### Upload Process
1. Admin selects image in form
2. Image is uploaded to MinIO
3. Public URL is saved in database
4. Image is accessible via: `http://localhost:9000/atashtravel/images/tours/[filename]`

---

## 🔒 Authentication

The admin panel requires authentication. Make sure you have:
1. Created an admin user in the database
2. Assigned the `admin` or `tour_manager` role
3. Logged in before accessing `/admin/tours`

---

## 🎨 SEO Features

### Automatic Generation
- Meta title and description
- Open Graph tags
- Twitter Card tags
- Canonical URLs

### Structured Data
- TouristTrip schema
- FAQPage schema
- BreadcrumbList schema

### Dynamic Sitemap
- Automatically includes all active tours
- Updates when new tours are added
- Accessible at `/sitemap.xml`

---

## 📱 Frontend Integration

### Tours Listing Page
```typescript
// Fetches from API
const response = await fetch('/api/v1/tours?status=active')
```

### Tour Detail Page
```typescript
// Dynamic route: /tours/[slug]
const tour = await fetch(`/api/v1/tours/${slug}`)
```

### Featured Tours
```typescript
const featured = await fetch('/api/v1/tours/featured?limit=6')
```

---

## 🧪 Testing

### Test the Complete Flow

1. **Create a tour:**
   ```bash
   # Via admin panel
   http://localhost:3000/admin/tours/new
   
   # Or via API
   curl -X POST http://localhost:4000/api/v1/tours \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{
       "title": "تور وان ترکیه",
       "slug": "van-tour",
       "destination": "وان",
       "countryId": "COUNTRY_ID",
       "durationDays": 4,
       "durationNights": 3,
       "price": "450$",
       "status": "active"
     }'
   ```

2. **View the tour:**
   ```
   http://localhost:3000/tours/van-tour
   ```

3. **Check sitemap:**
   ```
   http://localhost:3000/sitemap.xml
   ```

4. **Edit the tour:**
   ```
   http://localhost:3000/admin/tours/edit/TOUR_ID
   ```

---

## 🚨 Troubleshooting

### Database Connection Error
```bash
# Make sure PostgreSQL is running
docker-compose up -d postgres

# Check connection
psql -U atashtravel -d atashtravel -h localhost
```

### MinIO Connection Error
```bash
# Make sure MinIO is running
docker-compose up -d minio

# Access MinIO console
http://localhost:9001
# Login: minioadmin / minioadmin
```

### Images Not Showing
1. Check MinIO is running
2. Verify bucket policy allows public read
3. Check MINIO_PUBLIC_URL in environment variables

### Tours Not Appearing
1. Verify tour status is `active`
2. Check API connection: `curl http://localhost:4000/api/v1/tours`
3. Clear Next.js cache: `rm -rf .next`

---

## 🎯 Next Steps

### Optional Enhancements
1. Add image optimization (Sharp/Next.js Image)
2. Add tour search and filters
3. Add tour booking functionality
4. Add multi-language support
5. Add tour reviews and ratings
6. Add tour availability calendar

### Production Deployment
1. Set proper environment variables
2. Configure domain for MinIO
3. Enable HTTPS for image URLs
4. Set up CDN for images
5. Configure database backups

---

## 📞 Support

For questions or issues:
- Check logs: `docker-compose logs -f api`
- Review API responses in browser DevTools
- Check database: `npx prisma studio`

---

## ✨ Features Summary

✅ **No Manual Coding** - Add tours via web interface
✅ **Image Upload** - Direct upload to MinIO storage
✅ **Dynamic Pages** - Automatic page generation
✅ **SEO Optimized** - Full metadata and structured data
✅ **Dynamic Sitemap** - Auto-updates with new tours
✅ **Draft System** - Save tours as draft before publishing
✅ **Featured Tours** - Mark tours as featured
✅ **Rich Content** - Itinerary, FAQs, services, attractions
✅ **Responsive Design** - Works on all devices

The system is production-ready and can be deployed! 🚀
