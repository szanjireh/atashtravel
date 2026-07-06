# 📋 PRIORITIZED TODO LIST
## AtashTravel Production Platform - Implementation Plan

**Generated**: 2026-07-06  
**Status**: Ready to implement  
**Approach**: Incremental, tested, documented

---

## 🎯 PHASE 1: AUTHENTICATION & AUTHORIZATION
**Priority**: 🔴 CRITICAL  
**Estimated Time**: 3-5 days  
**Status**: ⏳ READY TO START

### Backend Tasks

#### 1.1 Database Schema Completion
- [ ] Add missing travel module tables (Flights, Cars, Transfer, Insurance, Visa)
- [ ] Generate Prisma migration
- [ ] Run migration on dev database
- [ ] Verify all models generated correctly

#### 1.2 Core Infrastructure
- [ ] Create `PrismaModule` and `PrismaService`
- [ ] Create `ConfigModule` for environment variables
- [ ] Setup global exception filter
- [ ] Setup validation pipe (class-validator)
- [ ] Setup logging interceptor
- [ ] Setup transform interceptor
- [ ] Create common DTOs and interfaces

#### 1.3 Authentication Module
- [ ] Create `modules/auth` folder structure
- [ ] Install additional dependencies if needed
- [ ] Create `PasswordService` (Argon2 hashing)
- [ ] Create `TokenService` (JWT generation/validation)
- [ ] Create `OtpService` (Redis-based OTP)
- [ ] Create Auth DTOs (Register, Login, ResetPassword, etc.)
- [ ] Create `AuthController` with endpoints:
  - [ ] POST `/auth/register`
  - [ ] POST `/auth/login`
  - [ ] POST `/auth/refresh`
  - [ ] POST `/auth/logout`
  - [ ] POST `/auth/forgot-password`
  - [ ] POST `/auth/reset-password`
  - [ ] POST `/auth/verify-email`
  - [ ] POST `/auth/resend-verification`
- [ ] Create `AuthService` with business logic
- [ ] Implement JWT strategy (Passport)
- [ ] Implement JWT refresh strategy
- [ ] Create `AuthGuard` (JWT)
- [ ] Create `RolesGuard` (RBAC)
- [ ] Create `PermissionsGuard`
- [ ] Create decorators:
  - [ ] `@CurrentUser()`
  - [ ] `@Roles(...roles)`
  - [ ] `@Permissions(...permissions)`
  - [ ] `@Public()` (skip auth)
- [ ] Write unit tests for AuthService
- [ ] Write integration tests for auth endpoints

#### 1.4 User Module
- [ ] Create `modules/user` folder structure
- [ ] Create User DTOs (UpdateProfile, ChangePassword, etc.)
- [ ] Create `UserController` with endpoints:
  - [ ] GET `/users/profile`
  - [ ] PATCH `/users/profile`
  - [ ] POST `/users/avatar`
  - [ ] PATCH `/users/password`
  - [ ] GET `/users/addresses`
  - [ ] POST `/users/addresses`
  - [ ] PATCH `/users/addresses/:id`
  - [ ] DELETE `/users/addresses/:id`
  - [ ] GET `/users/travelers`
  - [ ] POST `/users/travelers`
  - [ ] PATCH `/users/travelers/:id`
  - [ ] DELETE `/users/travelers/:id`
  - [ ] GET `/users/sessions`
  - [ ] DELETE `/users/sessions/:id`
- [ ] Create `UserService`
- [ ] Implement file upload for avatar (MinIO)
- [ ] Write tests

#### 1.5 Email Service
- [ ] Create `modules/mail` folder
- [ ] Setup Nodemailer
- [ ] Create email templates (HTML)
- [ ] Create `MailService` with methods:
  - [ ] sendWelcomeEmail()
  - [ ] sendVerificationEmail()
  - [ ] sendPasswordResetEmail()
  - [ ] sendBookingConfirmation()
  - [ ] sendInvoice()
- [ ] Add Bull queue for email sending

#### 1.6 Redis Service
- [ ] Create `RedisModule` and `RedisService`
- [ ] Implement OTP storage/retrieval
- [ ] Implement session caching
- [ ] Implement rate limiting storage

#### 1.7 Swagger Documentation
- [ ] Setup Swagger module
- [ ] Document auth endpoints
- [ ] Document user endpoints
- [ ] Add authentication to Swagger UI
- [ ] Add response examples

### Frontend Tasks

#### 1.8 Project Setup
- [ ] Create folder structure:
  - [ ] `app/(auth)/` - Auth pages
  - [ ] `app/(dashboard)/` - Protected pages
  - [ ] `components/ui/` - shadcn components
  - [ ] `components/common/` - Custom shared components
  - [ ] `lib/` - Utilities
  - [ ] `services/` - API services
  - [ ] `hooks/` - Custom hooks
  - [ ] `types/` - TypeScript types
  - [ ] `providers/` - Context providers
- [ ] Setup TanStack Query provider
- [ ] Create API client (Axios with interceptors)
- [ ] Create auth context and provider
- [ ] Setup middleware for protected routes

#### 1.9 UI Components (shadcn/ui)
- [ ] Install and configure shadcn/ui CLI
- [ ] Add Button component
- [ ] Add Input component
- [ ] Add Label component
- [ ] Add Form components
- [ ] Add Card component
- [ ] Add Dialog component
- [ ] Add Toast component
- [ ] Add Avatar component
- [ ] Add Dropdown Menu component
- [ ] Create Loading spinner component
- [ ] Create Error message component

#### 1.10 Authentication Pages
- [ ] Create `/login` page with form
  - [ ] Email/password form
  - [ ] Form validation (Zod)
  - [ ] Error handling
  - [ ] Loading states
  - [ ] Redirect after login
- [ ] Create `/register` page
  - [ ] Multi-step form (optional)
  - [ ] Validation
  - [ ] Terms acceptance
- [ ] Create `/forgot-password` page
- [ ] Create `/reset-password` page
- [ ] Create `/verify-email` page
- [ ] Create email verification success page

#### 1.11 Protected Layout
- [ ] Create dashboard layout component
- [ ] Create sidebar navigation
- [ ] Create top navbar
  - [ ] User avatar
  - [ ] Notifications bell
  - [ ] Language selector
  - [ ] Currency selector
  - [ ] Logout button
- [ ] Create breadcrumb component

#### 1.12 Profile Pages
- [ ] Create `/dashboard/profile` page
  - [ ] View profile
  - [ ] Edit profile form
  - [ ] Avatar upload
- [ ] Create `/dashboard/security` page
  - [ ] Change password form
  - [ ] Active sessions list
  - [ ] Terminate session action

---

## 🎯 PHASE 2: CORE TRAVEL MODULES (READ-ONLY)
**Priority**: 🔴 HIGH  
**Estimated Time**: 7-9 days  
**Status**: ⏳ PENDING Phase 1

### Backend Tasks

#### 2.1 Common Services
- [ ] Create `FileService` (MinIO integration)
- [ ] Create `CacheService` (Redis wrapper)
- [ ] Create `SearchService` (full-text search)

#### 2.2 Tour Module
- [ ] Create `modules/tour` structure
- [ ] Create Tour DTOs (filters, create, update)
- [ ] Create `TourController`:
  - [ ] GET `/tours` (list with filters, pagination)
  - [ ] GET `/tours/:slug` (detail)
  - [ ] GET `/tours/:id/dates` (available dates)
  - [ ] GET `/tours/:id/prices` (pricing)
  - [ ] POST `/tours` (admin only)
  - [ ] PATCH `/tours/:id` (admin only)
  - [ ] DELETE `/tours/:id` (admin only - soft delete)
  - [ ] POST `/tours/:id/images` (admin only)
- [ ] Create `TourService`
- [ ] Implement search with filters (destination, price, duration, rating)
- [ ] Implement availability checking
- [ ] Write tests

#### 2.3 Hotel Module
- [ ] Create `modules/hotel` structure
- [ ] Create Hotel DTOs
- [ ] Create `HotelController`:
  - [ ] GET `/hotels` (list with filters)
  - [ ] GET `/hotels/:slug` (detail)
  - [ ] GET `/hotels/:id/rooms` (available rooms)
  - [ ] GET `/hotels/:id/prices` (pricing calendar)
  - [ ] POST `/hotels` (admin)
  - [ ] PATCH `/hotels/:id` (admin)
  - [ ] POST `/hotels/:id/images` (admin)
- [ ] Create `HotelService`
- [ ] Implement room availability logic
- [ ] Write tests

#### 2.4 Destination Module
- [ ] Create `modules/destination` structure
- [ ] Create Destination DTOs
- [ ] Create `DestinationController`:
  - [ ] GET `/destinations`
  - [ ] GET `/destinations/:slug`
  - [ ] GET `/destinations/:slug/hotels`
  - [ ] GET `/destinations/:slug/tours`
  - [ ] GET `/destinations/:slug/attractions`
- [ ] Create `DestinationService`
- [ ] Write tests

#### 2.5 Category Module
- [ ] Create `modules/category` structure
- [ ] Create `CategoryController`:
  - [ ] GET `/categories/tours`
  - [ ] GET `/categories/tours/:slug`
- [ ] Create `CategoryService`

### Frontend Tasks

#### 2.6 Public Layout
- [ ] Create public layout component
- [ ] Create main navbar
  - [ ] Logo
  - [ ] Menu items
  - [ ] Search bar
  - [ ] Language/Currency selectors
  - [ ] Login/Register buttons
- [ ] Create footer
  - [ ] Links
  - [ ] Social media
  - [ ] Newsletter form
  - [ ] Contact info
- [ ] Create mobile menu (hamburger)

#### 2.7 Homepage
- [ ] Migrate hero section from legacy
- [ ] Create search widget
  - [ ] Destination autocomplete
  - [ ] Date range picker
  - [ ] Guest/passenger selector
- [ ] Create featured tours section
- [ ] Create popular destinations section
- [ ] Create why choose us section
- [ ] Create testimonials section
- [ ] Create statistics section
- [ ] Create newsletter section

#### 2.8 Tour Pages
- [ ] Create `/tours` listing page
  - [ ] Grid/list view toggle
  - [ ] Filters sidebar (destination, price, duration, rating)
  - [ ] Sort dropdown
  - [ ] Tour cards
  - [ ] Pagination
  - [ ] Loading skeleton
  - [ ] Empty state
- [ ] Create `/tours/[slug]` detail page
  - [ ] Image gallery
  - [ ] Tour info
  - [ ] Itinerary tabs
  - [ ] Pricing
  - [ ] Included/excluded services
  - [ ] Available dates
  - [ ] Reviews
  - [ ] Similar tours
  - [ ] Book now button
- [ ] Create tour card component (reusable)

#### 2.9 Hotel Pages
- [ ] Create `/hotels` listing page
  - [ ] Map view option
  - [ ] Filters (price, rating, facilities)
  - [ ] Hotel cards
  - [ ] Pagination
- [ ] Create `/hotels/[slug]` detail page
  - [ ] Gallery
  - [ ] Facilities
  - [ ] Room types
  - [ ] Pricing calendar
  - [ ] Reviews
  - [ ] Location map
  - [ ] Book button
- [ ] Create hotel card component

#### 2.10 Destination Pages
- [ ] Create `/destinations` listing page
- [ ] Create `/destinations/[country]` page
- [ ] Create `/destinations/[country]/[city]` page
  - [ ] Destination info
  - [ ] Hotels in this destination
  - [ ] Tours to this destination
  - [ ] Attractions

#### 2.11 Search & Filter
- [ ] Create `/search` page
- [ ] Create `/results` page with tabs (tours, hotels, flights)
- [ ] Implement global search functionality
- [ ] Create filter components (reusable)

---

## 🎯 PHASE 3: BOOKING SYSTEM
**Priority**: 🔴 HIGH  
**Estimated Time**: 5-7 days  
**Status**: ⏳ PENDING Phase 2

### Backend Tasks

#### 3.1 Booking Module
- [ ] Create `modules/booking` structure
- [ ] Create Booking DTOs
- [ ] Create `BookingController`:
  - [ ] POST `/bookings` (create draft)
  - [ ] GET `/bookings/:id`
  - [ ] PATCH `/bookings/:id` (update)
  - [ ] POST `/bookings/:id/confirm`
  - [ ] POST `/bookings/:id/cancel`
  - [ ] GET `/bookings` (user's bookings)
- [ ] Create `BookingService`:
  - [ ] createDraft()
  - [ ] calculatePrice()
  - [ ] applyCoupon()
  - [ ] applyWallet()
  - [ ] applyLoyaltyPoints()
  - [ ] checkAvailability()
  - [ ] lockInventory() (Redis, 15min timeout)
  - [ ] releaseInventory()
  - [ ] confirmBooking()
  - [ ] cancelBooking()
- [ ] Create `PricingService`
- [ ] Create `InventoryService`
- [ ] Implement booking lifecycle state machine
- [ ] Create background job for expired booking cleanup
- [ ] Write comprehensive tests

#### 3.2 Coupon Module
- [ ] Create `modules/coupon` structure
- [ ] Create `CouponController`:
  - [ ] POST `/coupons/validate`
  - [ ] GET `/coupons/my-coupons`
- [ ] Create `CouponService`:
  - [ ] validateCoupon()
  - [ ] calculateDiscount()
  - [ ] useCoupon()
- [ ] Write tests

#### 3.3 Wallet Module
- [ ] Create `modules/wallet` structure
- [ ] Create `WalletController`:
  - [ ] GET `/wallet/balance`
  - [ ] GET `/wallet/transactions`
  - [ ] POST `/wallet/add-funds`
- [ ] Create `WalletService`
- [ ] Write tests

### Frontend Tasks

#### 3.4 Booking Flow Pages
- [ ] Create `/booking/tour/:tourId` page
  - [ ] Step 1: Select date and travelers
  - [ ] Step 2: Add passenger details
  - [ ] Step 3: Review and pricing
  - [ ] Step 4: Payment method selection
- [ ] Create `/booking/hotel/:hotelId` page (similar flow)
- [ ] Create booking context for state management
- [ ] Create stepper component
- [ ] Create passenger form component
- [ ] Create pricing summary component
- [ ] Create booking timer component (15min countdown)

#### 3.5 Booking Management Pages
- [ ] Create `/dashboard/bookings` page (list)
- [ ] Create `/dashboard/bookings/[id]` detail page
  - [ ] Booking info
  - [ ] Status timeline
  - [ ] Download invoice button
  - [ ] Download voucher button
  - [ ] Cancel booking button (if allowed)
  - [ ] Add review button (if completed)

---

## 🎯 PHASE 4: PAYMENT INTEGRATION
**Priority**: 🔴 HIGH  
**Estimated Time**: 4-5 days  
**Status**: ⏳ PENDING Phase 3

### Backend Tasks

#### 4.1 Payment Module
- [ ] Create `modules/payment` structure
- [ ] Create Payment DTOs
- [ ] Create `PaymentController`:
  - [ ] POST `/payments/initialize`
  - [ ] POST `/payments/callback` (gateway webhook)
  - [ ] POST `/payments/verify`
  - [ ] GET `/payments/:id`
  - [ ] GET `/payments` (user's payment history)
- [ ] Create `PaymentService`:
  - [ ] initializePayment()
  - [ ] handleCallback()
  - [ ] verifyPayment()
  - [ ] processRefund()
- [ ] Create gateway adapters:
  - [ ] ZarinPal adapter
  - [ ] Saman adapter (future)
  - [ ] Stripe adapter (for international)
- [ ] Implement payment transaction logging
- [ ] Create background job for payment timeout
- [ ] Write tests (use sandbox)

#### 4.2 Invoice Module
- [ ] Create `modules/invoice` structure
- [ ] Create `InvoiceService`:
  - [ ] generateInvoice()
  - [ ] generatePDF()
  - [ ] sendInvoiceEmail()
- [ ] Create invoice PDF template
- [ ] Integrate with file storage (MinIO)
- [ ] Create `InvoiceController`:
  - [ ] GET `/invoices/:id`
  - [ ] GET `/invoices/:id/pdf` (download)

#### 4.3 Voucher Module
- [ ] Create `modules/voucher` structure
- [ ] Create `VoucherService`:
  - [ ] generateVoucher()
  - [ ] generatePDF()
  - [ ] sendVoucherEmail()
- [ ] Create voucher PDF template (with QR code)
- [ ] Create `VoucherController`:
  - [ ] GET `/vouchers/:id`
  - [ ] GET `/vouchers/:id/pdf`

#### 4.4 Notification Module
- [ ] Create `modules/notification` structure
- [ ] Create `NotificationService`:
  - [ ] sendBookingConfirmation()
  - [ ] sendPaymentSuccess()
  - [ ] sendPaymentFailed()
  - [ ] sendCancellation()
  - [ ] createInAppNotification()
- [ ] Integrate with Bull queue
- [ ] Create `NotificationController`:
  - [ ] GET `/notifications` (user's notifications)
  - [ ] PATCH `/notifications/:id/read`
  - [ ] PATCH `/notifications/read-all`

### Frontend Tasks

#### 4.5 Payment Pages
- [ ] Create `/payment/:bookingId` page
  - [ ] Payment method selector (wallet, gateway, mixed)
  - [ ] Wallet balance display
  - [ ] Gateway redirect handling
  - [ ] Loading states
- [ ] Create `/payment/success` page
  - [ ] Success message
  - [ ] Booking summary
  - [ ] Download invoice/voucher
  - [ ] Share options
- [ ] Create `/payment/failed` page
  - [ ] Error message
  - [ ] Retry button
  - [ ] Support contact

#### 4.6 Invoice & Voucher
- [ ] Create `/dashboard/invoices` page (list)
- [ ] Create invoice viewer component
- [ ] Create `/dashboard/vouchers` page (list)
- [ ] Create voucher viewer component
- [ ] Create download functionality

#### 4.7 Notifications
- [ ] Create notification bell component
- [ ] Create notification dropdown
- [ ] Create `/dashboard/notifications` page
- [ ] Implement real-time notifications (optional: WebSocket)

---

## 🎯 PHASE 5: CUSTOMER DASHBOARD
**Priority**: 🟡 MEDIUM  
**Estimated Time**: 3-4 days  
**Status**: ⏳ PENDING Phase 4

### Tasks
- [ ] Dashboard overview with statistics
- [ ] Wallet management page
- [ ] Wishlist page
- [ ] Reviews page
- [ ] Support ticket creation
- [ ] Settings page

---

## 🎯 PHASE 6: ADMIN PANEL - CORE
**Priority**: 🟡 MEDIUM  
**Estimated Time**: 7-10 days  
**Status**: ⏳ PENDING Phase 5

### Backend Tasks
- [ ] Admin dashboard statistics API
- [ ] User management CRUD
- [ ] Role/Permission management
- [ ] Tour management CRUD
- [ ] Hotel management CRUD
- [ ] Booking management
- [ ] Payment/Refund management
- [ ] Reports API

### Frontend Tasks
- [ ] Admin layout
- [ ] Dashboard with charts
- [ ] User management pages
- [ ] Tour management pages
- [ ] Hotel management pages
- [ ] Booking management pages
- [ ] Payment management pages
- [ ] Reports pages

---

## 🎯 PHASE 7: ADDITIONAL TRAVEL MODULES
**Priority**: 🟡 MEDIUM  
**Estimated Time**: 5-7 days  
**Status**: ⏳ PENDING Phase 6

### Tasks
- [ ] Complete Flight module (schema + backend + frontend)
- [ ] Complete Car rental module
- [ ] Complete Airport transfer module
- [ ] Complete Insurance module
- [ ] Complete Visa service module

---

## 🎯 PHASE 8: CMS & CONTENT
**Priority**: 🟢 LOW  
**Estimated Time**: 4-5 days  
**Status**: ⏳ PENDING Phase 7

### Tasks
- [ ] Blog system (backend + frontend)
- [ ] Pages management
- [ ] FAQ management
- [ ] News system
- [ ] Content editor integration

---

## 🎯 PHASE 9: SEO & PERFORMANCE
**Priority**: 🟢 LOW  
**Estimated Time**: 2-3 days  
**Status**: ⏳ PENDING Phase 8

### Tasks
- [ ] Add metadata to all pages
- [ ] Implement OpenGraph tags
- [ ] Add Schema.org markup
- [ ] Generate sitemap dynamically
- [ ] Create robots.txt
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Code splitting review

---

## 🎯 PHASE 10: ADVANCED FEATURES
**Priority**: 🟢 LOW  
**Estimated Time**: 5-7 days  
**Status**: ⏳ PENDING Phase 9

### Tasks
- [ ] Loyalty program implementation
- [ ] Referral system implementation
- [ ] Review & rating system
- [ ] Wishlist functionality
- [ ] Support ticket system

---

## 🎯 PHASE 11: TESTING & QA
**Priority**: 🟢 LOW  
**Estimated Time**: 5-7 days  
**Status**: ⏳ PENDING Phase 10

### Tasks
- [ ] Write unit tests (target 80% coverage)
- [ ] Write integration tests
- [ ] Write E2E tests (Playwright/Cypress)
- [ ] Performance testing
- [ ] Security testing
- [ ] Accessibility testing
- [ ] Browser compatibility testing
- [ ] Mobile responsiveness testing

---

## 🎯 PHASE 12: PRODUCTION DEPLOYMENT
**Priority**: 🟢 LOW  
**Estimated Time**: 2-3 days  
**Status**: ⏳ PENDING Phase 11

### Tasks
- [ ] Configure SSL (Let's Encrypt)
- [ ] Setup CI/CD pipeline (GitHub Actions)
- [ ] Configure monitoring (Sentry, New Relic, or similar)
- [ ] Setup automated backups
- [ ] Configure CDN (optional)
- [ ] Load testing
- [ ] Create deployment documentation
- [ ] Create rollback plan
- [ ] Go-live checklist

---

## 📊 PROGRESS TRACKING

### Current Status
- ✅ Phase 0: Foundation - **COMPLETE**
- ⏳ Phase 1: Authentication - **READY TO START**
- ⏳ Phase 2-12: **PENDING**

### Overall Completion
- **Database**: 100% ✅
- **Infrastructure**: 100% ✅
- **Backend**: 0% ❌
- **Frontend**: 0% ❌
- **Testing**: 0% ❌
- **Deployment**: 30% 🟡

**TOTAL PROJECT**: ~8% Complete

---

## 🎯 TODAY'S FOCUS (2026-07-06)

### Immediate Tasks (Next 4-6 hours)
1. ✅ Complete gap analysis - **DONE**
2. ⏳ Add missing schema tables (Flights, Cars, Transfer, Insurance, Visa)
3. ⏳ Generate and run Prisma migration
4. ⏳ Create Prisma service module
5. ⏳ Create Auth module structure
6. ⏳ Implement password hashing service
7. ⏳ Implement registration endpoint
8. ⏳ Implement login endpoint

---

## 📝 IMPLEMENTATION RULES

### Before Starting Each Feature
1. ✅ Read the spec section carefully
2. ✅ Explain what will be changed
3. ✅ Explain why it's needed
4. ✅ List files that will be modified/created
5. ✅ Check for existing similar code to reuse

### During Implementation
1. ✅ Write clean, documented code
2. ✅ Follow SOLID principles
3. ✅ Reuse existing components/services
4. ✅ Keep functions small and focused
5. ✅ Use TypeScript strictly
6. ✅ Add proper error handling

### After Implementation
1. ✅ Verify code compiles (no TS errors)
2. ✅ Run linter (no ESLint errors)
3. ✅ Verify Docker still works
4. ✅ Test the feature manually
5. ✅ Update Swagger documentation (backend)
6. ✅ Update this TODO list
7. ✅ Mark completed items with ✅

---

## 🚀 LET'S BUILD!

**Status**: ✅ READY TO START PHASE 1  
**Next Step**: Add missing schema tables and begin authentication module  
**Timeline**: MVP in 2-3 weeks, Full platform in 6-8 weeks

---

**Generated**: 2026-07-06  
**Last Updated**: 2026-07-06  
**Maintained By**: AI Development Agent
