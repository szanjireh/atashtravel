# 🎯 Quick Start - Tour Management System

## ⚡ 3-Minute Setup

```bash
# 1. Run the setup script
./setup-tour-system.sh

# 2. Start API (Terminal 1)
cd apps/api && npm run dev

# 3. Start Web (Terminal 2)
cd apps/web && npm run dev

# 4. Open admin panel
http://localhost:3000/admin/tours
```

---

## 📝 Add Your First Tour (Step-by-Step)

### 1. Access Admin Panel
```
http://localhost:3000/admin/tours
```

### 2. Click "افزودن تور جدید" (Add New Tour)

### 3. Fill Basic Information Tab:
- **عنوان تور** (Title): `تور وان ترکیه`
- **شناسه URL** (Slug): Auto-generated as `tour-van-turkey`
- **مقصد** (Destination): `وان`
- **کشور** (Country): Select from dropdown
- **مدت زمان** (Duration): `۳ شب و ۴ روز`
- **تعداد روز** (Days): `4`
- **تعداد شب** (Nights): `3`
- **قیمت** (Price): `۴۵۰$`
- **جزئیات قیمت** (Price Detail): `قیمت به ازای هر نفر در اتاق دو تخته`
- **توضیحات کوتاه** (Short Description): Write 1-2 sentences

### 4. Go to Images Tab:
- Upload **Cover Image** (for card display)
- Upload **Hero Image** (for page header)
- Upload **Gallery Images** (multiple photos)

### 5. Go to Description Tab:
- **توضیحات کامل** (Full Description): Detailed tour description
- **اطلاعات حرکت** (Departure Info): How to get there
- **اطلاعات هتل** (Hotel Info): Hotel details
- **نوع حمل و نقل** (Transportation): Transportation type
- **بهترین زمان سفر** (Best Time): Best season to visit

### 6. Go to SEO Tab:
- **عنوان SEO** (SEO Title): Optimized title for search
- **توضیحات SEO** (SEO Description): Meta description
- **کلمات کلیدی** (Keywords): Comma-separated keywords

### 7. Set Status:
- Check **تور ویژه** (Featured) if featured tour
- Select **فعال** (Active) from status dropdown

### 8. Click "ایجاد تور" (Create Tour)

### 9. View Your Tour:
```
http://localhost:3000/tours/tour-van-turkey
```

### 10. Verify Sitemap:
```
http://localhost:3000/sitemap.xml
```

✅ **Done!** Your tour is live!

---

## 🖼️ Image Guidelines

### Recommended Sizes:
- **Cover Image**: 800x600px (4:3 ratio)
- **Hero Image**: 1920x600px (panoramic)
- **Gallery Images**: 1200x800px (3:2 ratio)

### Format:
- JPEG or WebP
- Max 5MB per image
- Optimized for web

---

## 🎨 Tour Card Preview

Your tour will appear as a card with:
- Cover image
- Title
- Destination
- Duration
- Price
- Featured badge (if marked)

---

## 📱 Tour Detail Page Includes:

✅ Hero section with image
✅ Tour overview
✅ Price and booking CTA
✅ Why choose this tour
✅ Attractions
✅ Itinerary day-by-day
✅ Included services
✅ Excluded services
✅ Hotels
✅ Travel tips
✅ Required documents
✅ FAQs
✅ Related tours
✅ Image gallery
✅ Booking form

---

## 🔄 Edit or Delete Tours

### Edit:
1. Go to `/admin/tours`
2. Click **ویرایش** (Edit) on any tour
3. Make changes
4. Click **بروزرسانی تور** (Update Tour)

### Delete:
1. Go to `/admin/tours`
2. Click **حذف** (Delete) on any tour
3. Confirm deletion

### Toggle Status:
- Click status badge to toggle between **فعال** (Active) and **پیش‌نویس** (Draft)

### Toggle Featured:
- Click featured badge to toggle between **ویژه** (Featured) and **عادی** (Normal)

---

## 🌐 Frontend Pages

### Tours Listing:
```
http://localhost:3000/tours
```
Shows all active tours in a grid

### Tour Detail:
```
http://localhost:3000/tours/[slug]
```
Individual tour page with full details

### Featured Tours (Homepage):
```
http://localhost:3000/
```
Shows featured tours on homepage

---

## 🔍 SEO Features

### Automatic:
✅ Meta tags
✅ Open Graph tags
✅ Twitter Cards
✅ Canonical URLs
✅ Structured data (JSON-LD)
✅ Dynamic sitemap
✅ Breadcrumbs

### Manual:
- Set custom SEO title
- Set custom meta description
- Add keywords
- Set OG image

---

## 📊 Admin Dashboard Stats

View at `/admin/tours`:
- Total tours
- Active tours
- Draft tours
- Featured tours

---

## ⚙️ API Endpoints (For Developers)

```bash
# List all tours
GET /api/v1/tours

# Get featured tours
GET /api/v1/tours/featured?limit=6

# Get single tour
GET /api/v1/tours/van-tour

# Create tour (requires auth)
POST /api/v1/tours

# Update tour (requires auth)
PATCH /api/v1/tours/:id

# Delete tour (requires auth)
DELETE /api/v1/tours/:id

# Upload image (requires auth)
POST /api/v1/upload/tour-image
```

---

## 🐛 Common Issues

### Tours not showing?
- Check tour status is `active`
- Clear browser cache
- Restart Next.js: `rm -rf .next && npm run dev`

### Images not loading?
- Verify MinIO is running: `docker ps | grep minio`
- Check MinIO console: http://localhost:9001
- Verify MINIO_PUBLIC_URL in .env

### Can't access admin panel?
- Make sure you're logged in
- User must have `admin` or `tour_manager` role
- Check authentication token

---

## 🎓 Video Tutorial (Coming Soon)

A video walkthrough will be added showing:
1. How to add a tour
2. How to upload images
3. How to configure SEO
4. How to preview tours
5. How to manage tours

---

## 📞 Support

Need help?
- Check logs: `docker-compose logs -f api`
- View database: `npx prisma studio`
- Test API: `curl http://localhost:4000/api/v1/tours`

---

## ✨ Tips for Success

1. **Use high-quality images** - First impression matters
2. **Write detailed descriptions** - Help customers make decisions
3. **Add all services** - Clear included/excluded items
4. **Create good itineraries** - Day-by-day plans build trust
5. **Optimize SEO** - Better search rankings = more bookings
6. **Keep prices updated** - Accurate pricing builds trust
7. **Use featured wisely** - Highlight best tours
8. **Add FAQs** - Answer common questions upfront

---

## 🚀 Ready to Launch!

Your tour management system is ready. You can now:
- ✅ Add unlimited tours
- ✅ Upload images
- ✅ Update content anytime
- ✅ No manual coding needed
- ✅ SEO optimized
- ✅ Dynamic sitemap
- ✅ Production ready

**Happy touring! 🌍✈️**
