# Database Migration Instructions

## Option 1: Using Prisma Migrate (Recommended)

```bash
cd apps/api

# Make sure database is running
docker-compose up -d postgres

# Generate and apply migration
npx prisma migrate dev --name add_tour_management_fields

# Generate Prisma Client
npx prisma generate
```

## Option 2: Manual Migration (If Prisma fails)

If you encounter issues with Prisma, you can apply the migration manually:

```bash
# Connect to database
psql -U atashtravel -d atashtravel -h localhost

# Run the migration
\i apps/api/prisma/migrations/manual_tour_enhancement.sql

# Verify
\d tours
```

## Option 3: Using Docker

```bash
# Copy SQL file to container
docker cp apps/api/prisma/migrations/manual_tour_enhancement.sql atashtravel-postgres:/tmp/

# Execute in container
docker exec -it atashtravel-postgres psql -U atashtravel -d atashtravel -f /tmp/manual_tour_enhancement.sql
```

## Verification

After running the migration, verify the changes:

```bash
# Open Prisma Studio
npx prisma studio

# Or query directly
psql -U atashtravel -d atashtravel -c "\d tours"
```

You should see all the new columns:
- destination
- full_description
- duration
- price
- price_detail
- cover_image
- hero_image
- gallery_images (JSONB)
- departure_info
- hotel_info
- transportation
- why_choose (JSONB)
- best_time
- attractions (JSONB)
- tips (JSONB)
- required_documents (JSONB)
- faqs (JSONB)
- related_tours (JSONB)
- seo_keywords (JSONB)
- seo_og_image
- status (updated default to 'draft')

## Troubleshooting

### Connection refused
```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Start if not running
docker-compose up -d postgres
```

### Permission denied
```bash
# Use superuser
psql -U postgres -d atashtravel -h localhost
```

### Database doesn't exist
```bash
# Create database
createdb -U atashtravel atashtravel -h localhost
```

## Next Steps

After migration:
1. Restart the API server
2. Test the admin panel at `/admin/tours`
3. Try creating a tour
4. Verify images upload to MinIO
5. Check tour detail page
6. Verify sitemap includes new tour
