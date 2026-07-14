# Atash Travel Platform - API Endpoints Reference

## Base URL
- Development: `http://localhost:4000/api/v1`
- Production: `https://api.atashtravel.com/api/v1`

## Authentication
Most admin endpoints require authentication. Include JWT token in headers:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@atashtravel.com",
  "password": "password"
}

Response:
{
  "tokens": {
    "accessToken": "...",
    "refreshToken": "..."
  },
  "user": { ... }
}
```

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "..."
}
```

---

## 🗺️ Tours API

### List Tours
```http
GET /tours?page=1&limit=20&search=istanbul&status=active

Response:
{
  "data": [ ... ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

### Get Single Tour
```http
GET /tours/:id
# or
GET /tours/:slug
```

### Get Featured Tours
```http
GET /tours/featured?limit=6
```

### Create Tour (Admin)
```http
POST /tours
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Istanbul City Tour",
  "slug": "istanbul-city-tour",
  "destination": "Istanbul, Turkey",
  "shortDescription": "Explore the historic city",
  "fullDescription": "...",
  "countryId": "uuid",
  "categoryId": "uuid",
  "duration": "3 nights 4 days",
  "durationDays": 4,
  "durationNights": 3,
  "price": "450$",
  "coverImage": "url",
  "status": "active",
  "featured": true
}
```

### Update Tour (Admin)
```http
PATCH /tours/:id
Authorization: Bearer <token>
Content-Type: application/json

{ ... same fields as create ... }
```

### Delete Tour (Admin)
```http
DELETE /tours/:id
Authorization: Bearer <token>
```

---

## 🏨 Hotels API

### List Hotels
```http
GET /hotels?page=1&limit=20&search=hilton&status=active
```

### Get Single Hotel
```http
GET /hotels/:id
```

### Create Hotel (Admin)
```http
POST /hotels
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Hilton Istanbul",
  "slug": "hilton-istanbul",
  "countryId": "uuid",
  "cityId": "uuid",
  "address": "123 Main St",
  "starRating": 5,
  "description": "Luxury hotel",
  "checkInTime": "14:00",
  "checkOutTime": "12:00",
  "status": "active"
}
```

### Update Hotel (Admin)
```http
PATCH /hotels/:id
Authorization: Bearer <token>
```

### Delete Hotel (Admin)
```http
DELETE /hotels/:id
Authorization: Bearer <token>
```

### Toggle Hotel Status (Admin)
```http
PATCH /hotels/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "inactive"
}
```

---

## 📝 Visa Services API

### List Visa Services
```http
GET /visa?page=1&limit=20&status=active
```

### Get Single Visa Service
```http
GET /visa/:id
```

### Get Featured Visa Services
```http
GET /visa/featured?limit=6
```

### Create Visa Service (Admin)
```http
POST /visa
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Turkey Tourist Visa",
  "slug": "turkey-tourist-visa",
  "countryId": "uuid",
  "description": "Tourist visa for Turkey",
  "processingDays": 7,
  "price": 150,
  "currency": "USD",
  "requirements": ["Passport", "Photo", "Form"],
  "documents": ["Passport copy", "ID"],
  "status": "active",
  "featured": true
}
```

### Update Visa Service (Admin)
```http
PATCH /visa/:id
Authorization: Bearer <token>
```

### Delete Visa Service (Admin)
```http
DELETE /visa/:id
Authorization: Bearer <token>
```

---

## 📰 Blog API

### List Articles
```http
GET /blog?page=1&limit=20&status=published&published=true
```

### Get Single Article
```http
GET /blog/:id
```

### Get Featured Articles
```http
GET /blog/featured?limit=6
```

### Create Article (Admin)
```http
POST /blog
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Top 10 Destinations",
  "slug": "top-10-destinations",
  "excerpt": "Discover amazing places",
  "content": "Full article content in markdown...",
  "coverImage": "url",
  "categoryId": "uuid",
  "tags": ["travel", "tips"],
  "status": "published",
  "published": true,
  "featured": false,
  "seoTitle": "Top 10 Destinations to Visit",
  "seoDescription": "...",
  "seoKeywords": ["travel", "destinations"]
}
```

### Update Article (Admin)
```http
PATCH /blog/:id
Authorization: Bearer <token>
```

### Delete Article (Admin)
```http
DELETE /blog/:id
Authorization: Bearer <token>
```

### Toggle Publish Status (Admin)
```http
PATCH /blog/:id/publish
Authorization: Bearer <token>
Content-Type: application/json

{
  "published": true
}
```

### Toggle Featured Status (Admin)
```http
PATCH /blog/:id/featured
Authorization: Bearer <token>
Content-Type: application/json

{
  "featured": true
}
```

---

## 📁 Media API

### List Media Files
```http
GET /media?page=1&limit=50&type=image&folder=tours
```

### Get Single Media File
```http
GET /media/:id
```

### Upload Media File (Admin)
```http
POST /media/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- file: [binary]
- folder: "tours" (optional)
- alt: "Alt text" (optional)
- caption: "Caption" (optional)

Response:
{
  "id": "uuid",
  "filename": "image.jpg",
  "url": "http://localhost:9000/atashtravel/media/image.jpg",
  "type": "image",
  "size": 245678
}
```

### Delete Media File (Admin)
```http
DELETE /media/:id
Authorization: Bearer <token>
```

---

## 🎯 SEO API

### List SEO Settings
```http
GET /seo?page=1&limit=50
```

### Get SEO by Page
```http
GET /seo/page/home
# or
GET /seo/page/tours
```

### Get Single SEO Setting
```http
GET /seo/:id
```

### Create SEO Setting (Admin)
```http
POST /seo
Authorization: Bearer <token>
Content-Type: application/json

{
  "page": "home",
  "title": "Atash Travel - Your Travel Partner",
  "description": "Book amazing tours and hotels",
  "keywords": ["travel", "tours", "hotels"],
  "ogTitle": "Atash Travel",
  "ogDescription": "...",
  "ogImage": "url",
  "canonicalUrl": "https://atashtravel.com",
  "robots": "index,follow",
  "structuredData": { ... }
}
```

### Update SEO Setting (Admin)
```http
PATCH /seo/:id
Authorization: Bearer <token>
```

### Delete SEO Setting (Admin)
```http
DELETE /seo/:id
Authorization: Bearer <token>
```

---

## 📤 Upload API

### Upload Tour Image (Admin)
```http
POST /upload/image
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- file: [binary]

Response:
{
  "url": "http://localhost:9000/atashtravel/images/filename.jpg",
  "filename": "filename.jpg",
  "size": 123456,
  "mimeType": "image/jpeg"
}
```

### Upload Multiple Images (Admin)
```http
POST /upload/images
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- files: [binary]
- files: [binary]
- ...

Response:
{
  "urls": ["url1", "url2", ...]
}
```

---

## Query Parameters

### Common Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | number | Page number (1-indexed) | `?page=1` |
| `limit` | number | Items per page | `?limit=20` |
| `search` | string | Search query | `?search=istanbul` |
| `status` | string | Filter by status | `?status=active` |
| `featured` | boolean | Filter featured items | `?featured=true` |
| `published` | boolean | Filter published items | `?published=true` |

### Tours Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `countryId` | uuid | Filter by country |
| `cityId` | uuid | Filter by city |
| `categoryId` | uuid | Filter by category |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |

### Hotels Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `cityId` | uuid | Filter by city |
| `rating` | number | Minimum star rating |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Insufficient permissions",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Rate Limiting

API requests are rate-limited:
- **Authenticated users**: 100 requests per minute
- **Anonymous users**: 30 requests per minute

Response headers include:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1625097600
```

---

## Testing with cURL

### Example: List Tours
```bash
curl http://localhost:4000/api/v1/tours
```

### Example: Create Tour (with auth)
```bash
curl -X POST http://localhost:4000/api/v1/tours \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Istanbul Tour",
    "slug": "istanbul-tour",
    "destination": "Istanbul",
    "price": "450$"
  }'
```

### Example: Upload Image
```bash
curl -X POST http://localhost:4000/api/v1/media/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "folder=tours"
```

---

For more details, see the complete implementation guide: `IMPLEMENTATION_COMPLETE_GUIDE.md`
