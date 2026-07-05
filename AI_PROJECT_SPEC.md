# AI_PROJECT_SPEC.md

# Production Travel Agency Platform

Version: 1.0

---

# IMPORTANT

This project already exists.

DO NOT create a new project.

DO NOT replace existing pages.

DO NOT delete any existing code unless it is unused.

First analyze the current project completely.

Understand every file.

Understand every route.

Understand every component.

Understand every API.

Understand every database model.

Understand every Docker configuration.

Only after understanding everything, start improving the project.

All changes must be incremental.

Never break existing functionality.

Always preserve backward compatibility whenever possible.

----------------------------------------------------

# PROJECT GOAL

Build a production-ready travel agency platform.

The project must become comparable to:

• Booking.com
• Expedia
• Alibaba Travel
• Trip.com

The website must support:

✔ Tour Reservation

✔ Hotel Reservation

✔ Flight Reservation

✔ Airport Transfer

✔ Car Rental

✔ Visa Services

✔ Travel Insurance

✔ Blog

✔ Wallet

✔ Coupons

✔ Loyalty Points

✔ Referral System

✔ Customer Dashboard

✔ Agency Dashboard (B2B)

✔ Admin Dashboard

✔ SEO

✔ Multi Language

✔ Multi Currency

✔ Invoice

✔ Voucher

✔ Notification

✔ Email

✔ SMS

✔ Analytics

✔ Reports

✔ Audit Logs

✔ Security

----------------------------------------------------

# EXISTING PROJECT

The current website already contains multiple pages.

The existing design should not be removed.

Instead:

Improve it.

Modernize it.

Optimize it.

Refactor it.

Reuse as much code as possible.

Never rebuild from scratch unless absolutely necessary.

----------------------------------------------------

# UI / UX GOALS

The new UI must look modern.

Reference websites:

Booking.com

Airbnb

Expedia

Tripadvisor

Trip.com

The design language should be clean.

Rounded corners.

Large cards.

Smooth animations.

Minimal shadows.

Professional spacing.

Responsive.

Fast.

Elegant.

----------------------------------------------------

# COLOR PALETTE

Primary

#0057B8

Secondary

#0099FF

Accent

#FFB400

Background

#F8FAFC

Cards

#FFFFFF

Success

#16A34A

Warning

#F59E0B

Danger

#DC2626

----------------------------------------------------

# TYPOGRAPHY

Use modern readable fonts.

Persian:

Vazirmatn

English:

Inter

Font sizes must follow design system.

----------------------------------------------------

# DESIGN SYSTEM

Create reusable components only.

Buttons

Cards

Inputs

Dropdown

Modal

Tooltip

Tabs

Badge

Breadcrumb

Navbar

Sidebar

Footer

Carousel

Gallery

Calendar

Date Picker

Pagination

Search Box

Data Table

Charts

Statistics Cards

Loading Skeleton

Toast

Notification

Avatar

Timeline

Accordion

Empty State

Error State

----------------------------------------------------

# RESPONSIVE BREAKPOINTS

Mobile

Tablet

Laptop

Desktop

Ultra Wide

Everything must work perfectly.

----------------------------------------------------

# PERFORMANCE

Use lazy loading.

Image optimization.

Code splitting.

Dynamic imports.

Server Components where appropriate.

Caching.

Prefetching.

Pagination.

Infinite scrolling where useful.

----------------------------------------------------

# ACCESSIBILITY

Keyboard navigation

ARIA labels

High contrast

Focus states

Screen readers

----------------------------------------------------

# SEO

Every page must include

Title

Description

Canonical URL

Open Graph

Twitter Card

Schema.org

Sitemap

robots.txt

Breadcrumb schema

FAQ schema where applicable.

----------------------------------------------------

# MULTI LANGUAGE

Persian

English

Turkish

Architecture must support adding more languages later.

----------------------------------------------------

# MULTI CURRENCY

IRR

TRY

USD

EUR

Currency conversion must be configurable.

----------------------------------------------------

# FILE STRUCTURE

The AI must reorganize the project only if necessary.

Never rename files unnecessarily.

Never move folders without updating imports.

Never break routes.

----------------------------------------------------

# CLEAN CODE RULES

SOLID

DRY

KISS

YAGNI

Clean Architecture

DDD principles where appropriate.

No duplicated code.

No magic strings.

No hardcoded values.

Use configuration.

Use dependency injection.

----------------------------------------------------

# GIT

Every major feature should be implemented in small commits.

Never modify unrelated files.

Keep history clean.

----------------------------------------------------

END OF PART 1
# PART 2
# SOFTWARE ARCHITECTURE

############################################################
GENERAL RULES
############################################################

This project already exists.

Analyze the entire codebase before making any modifications.

Never rewrite working code without a strong reason.

Refactor incrementally.

Keep the project deployable after every major change.

Use feature-based architecture.

Avoid circular dependencies.

Every module must be independent.

############################################################
TECH STACK
############################################################

Frontend
- Next.js (App Router)
- React
- TypeScript
- TailwindCSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- Axios

Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis
- JWT Authentication
- Passport
- Swagger

Storage
- MinIO (S3 Compatible)

Infrastructure
- Docker
- Docker Compose
- Nginx Reverse Proxy
- HTTPS Ready

############################################################
PROJECT STRUCTURE
############################################################

Frontend

/apps/web

app/

components/

features/

hooks/

lib/

services/

providers/

styles/

types/

utils/

config/

public/

middleware.ts

Backend

/apps/api

src/

modules/

common/

config/

database/

prisma/

guards/

interceptors/

filters/

middlewares/

decorators/

pipes/

jobs/

mail/

sms/

storage/

payments/

notifications/

main.ts

############################################################
FEATURE MODULES
############################################################

Every feature must be isolated.

Example:

modules/

auth/

users/

tours/

hotels/

flights/

bookings/

payments/

wallet/

coupon/

visa/

insurance/

transfer/

cars/

agency/

blog/

notification/

review/

dashboard/

analytics/

settings/

reports/

files/

Each module contains:

controller

service

dto

repository

entities

validators

tests

############################################################
CLEAN ARCHITECTURE
############################################################

Controller

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

Never access Prisma directly from Controller.

Business logic must exist only inside Services.

############################################################
API RULES
############################################################

REST API

/api/v1/

Example

/api/v1/auth/login

/api/v1/auth/register

/api/v1/users

/api/v1/tours

/api/v1/hotels

/api/v1/flights

/api/v1/bookings

/api/v1/payments

Version every API.

############################################################
ERROR HANDLING
############################################################

Global Exception Filter

Standard Response

{
success,

message,

data,

errors,

timestamp
}

############################################################
VALIDATION
############################################################

Use DTO

Use class-validator

Validate every request.

Never trust client input.

############################################################
LOGGING
############################################################

Every error

Every payment

Every booking

Every login

Every admin action

must be logged.

############################################################
REDIS
############################################################

Use Redis for

Cache

OTP

Sessions

Rate Limiting

Temporary Booking Locks

Search Cache

############################################################
BACKGROUND JOBS
############################################################

Email Queue

SMS Queue

Invoice Queue

Voucher Queue

Cleanup Queue

Notification Queue

############################################################
STORAGE
############################################################

Store

Images

PDF

Invoices

Vouchers

Documents

Passports

Visa files

inside MinIO.

Never store uploaded files inside project folders.

############################################################
SEARCH
############################################################

Implement advanced search.

Support

keyword

price

country

city

hotel

duration

airline

date

rating

availability

sorting

pagination

############################################################
PAGINATION
############################################################

Every list page supports

page

limit

sort

filter

search

############################################################
SECURITY
############################################################

JWT

Refresh Token

Email Verification

OTP Login

Password Hashing (Argon2)

Helmet

Rate Limiter

CORS

Input Validation

SQL Injection Prevention

XSS Prevention

Audit Logs

RBAC

############################################################
PERMISSIONS
############################################################

Roles

Super Admin

Admin

Manager

Operator

Support

Agency

Customer

Guest

Permissions must be dynamic.

############################################################
DOCKER
############################################################

Separate containers

Frontend

Backend

PostgreSQL

Redis

MinIO

Nginx

############################################################
ENVIRONMENT VARIABLES
############################################################

No secrets inside code.

Everything configurable using .env

############################################################
TESTING
############################################################

Unit Tests

Integration Tests

E2E Tests

############################################################
DOCUMENTATION
############################################################

Swagger

README

Architecture Diagrams

ER Diagram

Deployment Guide

############################################################
AI DEVELOPMENT RULES
############################################################

Before writing any code:

1. Analyze existing project.
2. Explain planned changes.
3. Wait for approval if architecture changes.
4. Implement in small commits.
5. Run lint.
6. Run tests.
7. Ensure Docker still works.
8. Never break existing pages.
9. Never remove features without replacement.
10. Reuse components whenever possible.

END OF PART 2
############################################################
DATABASE DESIGN
############################################################

Database Engine

PostgreSQL Latest Stable

ORM

Prisma ORM

Naming Convention

snake_case

Primary Key

id UUID

created_at

updated_at

deleted_at (Soft Delete)

Every table must have:

id

created_at

updated_at

deleted_at

created_by

updated_by

############################################################
TABLE: users
############################################################

id
first_name
last_name
username
email
phone
password_hash
avatar
birth_date
gender
nationality
preferred_language
preferred_currency
status
is_verified
last_login_at
created_at
updated_at
deleted_at

Indexes

email

phone

username

############################################################
TABLE: roles
############################################################

id

name

description

created_at

updated_at

############################################################
TABLE: permissions
############################################################

id

module

action

description

############################################################
TABLE: role_permissions
############################################################

role_id

permission_id

############################################################
TABLE: user_roles
############################################################

user_id

role_id

############################################################
TABLE: sessions
############################################################

id

user_id

refresh_token

ip_address

device

browser

os

country

city

expires_at

created_at

############################################################
TABLE: otp_codes
############################################################

id

user_id

phone

email

code

purpose

expires_at

used_at

############################################################
TABLE: email_verifications
############################################################

id

user_id

token

verified_at

############################################################
TABLE: password_resets
############################################################

id

user_id

token

expires_at

used_at

############################################################
TABLE: user_addresses
############################################################

id

user_id

country

state

city

street

postal_code

latitude

longitude

############################################################
TABLE: travelers
############################################################

Multiple travelers per account

Fields

id

user_id

first_name

last_name

gender

birth_date

passport_number

passport_expiry

nationality

national_code

phone

email

is_default

############################################################
TABLE: passports
############################################################

id

traveler_id

passport_number

country

issue_date

expiry_date

scan_front

scan_back

############################################################
TABLE: emergency_contacts
############################################################

id

traveler_id

name

phone

relation

############################################################
TABLE: wallets
############################################################

id

user_id

balance

currency

status

############################################################
TABLE: wallet_transactions
############################################################

id

wallet_id

type

amount

currency

reference

description

status

############################################################
TABLE: loyalty_accounts
############################################################

id

user_id

points

level

############################################################
TABLE: loyalty_transactions
############################################################

id

account_id

points

type

reason

############################################################
TABLE: coupons
############################################################

id

code

title

discount_type

discount_value

minimum_purchase

maximum_discount

start_date

end_date

usage_limit

usage_count

status

############################################################
TABLE: coupon_usages
############################################################

id

coupon_id

user_id

booking_id

used_at

############################################################
TABLE: notifications
############################################################

id

user_id

title

message

type

channel

is_read

sent_at

############################################################
TABLE: notification_templates
############################################################

id

name

type

subject

content

############################################################
TABLE: audit_logs
############################################################

id

user_id

action

module

table_name

record_id

old_data

new_data

ip

device

created_at

############################################################
TABLE: files
############################################################

id

user_id

bucket

path

filename

extension

mime_type

size

checksum

############################################################
TABLE: settings
############################################################

id

group

key

value

############################################################
TABLE: currencies
############################################################

id

code

name

symbol

exchange_rate

is_default

############################################################
TABLE: languages
############################################################

id

code

name

is_default

is_rtl

############################################################
TABLE: countries
############################################################

id

name

iso2

iso3

phone_code

############################################################
TABLE: cities
############################################################

id

country_id

name

latitude

longitude

############################################################
RELATIONSHIPS
############################################################

User

↓

Roles

↓

Permissions

User

↓

Wallet

↓

Wallet Transactions

User

↓

Travelers

↓

Passport

↓

Emergency Contact

User

↓

Notifications

User

↓

Audit Logs

User

↓

Files

User

↓

Coupons

User

↓

Sessions

User

↓

OTP

User

↓

Email Verification

############################################################
RULES
############################################################

Never delete records permanently.

Use Soft Delete.

Use UUID everywhere.

Create indexes on:

email

phone

status

created_at

foreign keys

Always enforce Foreign Keys.

Use cascading carefully.

END OF PART 3.1
############################################################
PART 3.2
TRAVEL MODULE DATABASE
############################################################

Every travel entity supports:

Soft Delete

Audit Logs

Images

SEO

Translations

Status

created_at

updated_at

############################################################
TOURS
############################################################

TABLE tours

id
slug
title
short_description
description
country_id
city_id
tour_category_id
duration_days
duration_nights
meeting_point
transport_type
difficulty
minimum_age
maximum_people
featured
status
seo_title
seo_description

------------------------------------------------------------

TABLE tour_categories

id
name
slug
icon
parent_id
sort_order

------------------------------------------------------------

TABLE tour_images

id
tour_id
file_id
alt_text
sort_order
is_cover

------------------------------------------------------------

TABLE tour_itineraries

id
tour_id
day_number
title
description
hotel_id
meals
activities

------------------------------------------------------------

TABLE tour_dates

id
tour_id
departure_date
return_date
capacity
available_seats
base_price
status

------------------------------------------------------------

TABLE tour_hotels

id
tour_id
hotel_id
room_type_id

------------------------------------------------------------

TABLE tour_services

id
tour_id
service_name
included
description

------------------------------------------------------------

TABLE tour_excluded_services

id
tour_id
service_name

------------------------------------------------------------

TABLE tour_prices

id
tour_date_id
adult_price
child_price
infant_price
single_room_extra
currency

------------------------------------------------------------

TABLE tour_tags

id
name

------------------------------------------------------------

TABLE tour_tag_relations

tour_id
tag_id

############################################################
HOTELS
############################################################

TABLE hotels

id
name
slug
country_id
city_id
address
latitude
longitude
star_rating
description
check_in_time
check_out_time
phone
email
website
status

------------------------------------------------------------

TABLE hotel_images

id
hotel_id
file_id
sort_order
is_cover

------------------------------------------------------------

TABLE room_types

id
hotel_id
name
description
capacity
bed_type
size

------------------------------------------------------------

TABLE rooms

id
room_type_id
room_number
status

------------------------------------------------------------

TABLE room_prices

id
room_type_id
date
price
currency
available_rooms

------------------------------------------------------------

TABLE hotel_facilities

id
name
icon

------------------------------------------------------------

TABLE hotel_facility_relations

hotel_id
facility_id

------------------------------------------------------------

TABLE hotel_reviews

id
hotel_id
user_id
booking_id
rating
title
comment
status

############################################################
FLIGHTS
############################################################

TABLE airlines

id
name
iata
icao
logo

------------------------------------------------------------

TABLE airports

id
name
iata
icao
country_id
city_id
latitude
longitude

------------------------------------------------------------

TABLE flights

id
airline_id
flight_number
departure_airport_id
arrival_airport_id
departure_time
arrival_time
duration
status

------------------------------------------------------------

TABLE flight_classes

id
flight_id
name
capacity

------------------------------------------------------------

TABLE flight_prices

id
flight_class_id
price
currency
available_seats

############################################################
AIRPORT TRANSFER
############################################################

TABLE transfers

id
title
city_id
vehicle_type
from_location
to_location
capacity
price
currency
status

############################################################
CAR RENTAL
############################################################

TABLE cars

id
brand
model
year
gearbox
fuel_type
seats
luggage
status

------------------------------------------------------------

TABLE car_images

id
car_id
file_id

------------------------------------------------------------

TABLE car_prices

id
car_id
daily_price
currency
deposit

############################################################
TRAVEL INSURANCE
############################################################

TABLE insurance_providers

id
name
logo

------------------------------------------------------------

TABLE insurance_plans

id
provider_id
title
coverage
price
currency

############################################################
VISA
############################################################

TABLE visa_types

id
country_id
name
processing_days
price
currency

------------------------------------------------------------

TABLE visa_requirements

id
visa_type_id
title
description

############################################################
DESTINATIONS
############################################################

TABLE destinations

id
country_id
city_id
name
slug
description
cover_image
featured

############################################################
ATTRACTIONS
############################################################

TABLE attractions

id
destination_id
name
description
latitude
longitude
ticket_price

############################################################
RELATIONSHIPS

Country

↓

City

↓

Destination

↓

Hotel

↓

Tour

↓

Attractions

Hotel

↓

Room Types

↓

Rooms

↓

Room Prices

Tour

↓

Dates

↓

Prices

↓

Hotels

↓

Images

↓

Itinerary

Flight

↓

Flight Classes

↓

Flight Prices

############################################################
RULES

Every hotel can belong to multiple tours.

Every tour has multiple dates.

Every hotel has multiple room types.

Every room type has daily prices.

Every flight has multiple seat classes.

Every travel entity supports SEO.

Every travel entity supports gallery images.

Every travel entity supports translations.

Indexes required:

slug

country_id

city_id

status

featured

departure_date

price

rating

END OF PART 3.2
############################################################
PART 3.3
BOOKINGS • PAYMENTS • FINANCE
############################################################

GENERAL RULES

Every booking must have:

UUID Primary Key
Soft Delete
Status History
Audit Log
Payment History
Invoice
Voucher
Cancellation Support

############################################################
BOOKINGS
############################################################

TABLE bookings

id
booking_number (Unique)
user_id
booking_type
status
currency
subtotal
discount_amount
tax_amount
service_fee
total_amount
coupon_id
wallet_amount
payment_status
invoice_id
voucher_id
notes
expires_at
created_at
updated_at

------------------------------------------------------------

TABLE booking_items

id
booking_id
item_type
item_id
quantity
unit_price
total_price

------------------------------------------------------------

TABLE booking_passengers

id
booking_id
traveler_id
seat_number
room_assignment
special_requests

------------------------------------------------------------

TABLE booking_status_history

id
booking_id
old_status
new_status
changed_by
reason
created_at

------------------------------------------------------------

TABLE booking_notes

id
booking_id
user_id
note
is_internal

############################################################
PAYMENTS
############################################################

TABLE payment_gateways

id
name
provider
is_active
config_json

------------------------------------------------------------

TABLE payments

id
booking_id
user_id
gateway_id
payment_method
transaction_reference
amount
currency
status
paid_at

------------------------------------------------------------

TABLE payment_transactions

id
payment_id
gateway_transaction_id
request_payload
response_payload
status
created_at

------------------------------------------------------------

TABLE refunds

id
payment_id
amount
reason
status
requested_by
approved_by
processed_at

############################################################
INVOICES
############################################################

TABLE invoices

id
invoice_number
booking_id
user_id
subtotal
discount
tax
total
currency
pdf_file_id
issued_at

############################################################
VOUCHERS
############################################################

TABLE vouchers

id
voucher_number
booking_id
user_id
pdf_file_id
issued_at

############################################################
CANCELLATIONS
############################################################

TABLE cancellations

id
booking_id
requested_by
reason
refund_amount
status
processed_at

############################################################
PROMOTIONS
############################################################

TABLE promotions

id
title
description
discount_type
discount_value
start_date
end_date
priority
status

------------------------------------------------------------

TABLE promotion_items

id
promotion_id
item_type
item_id

############################################################
LOYALTY
############################################################

TABLE loyalty_levels

id
name
minimum_points
discount_percent

############################################################
REFERRAL SYSTEM
############################################################

TABLE referrals

id
referrer_user_id
referred_user_id
reward_points
status

############################################################
WISHLIST
############################################################

TABLE wishlists

id
user_id

------------------------------------------------------------

TABLE wishlist_items

id
wishlist_id
item_type
item_id

############################################################
SUPPORT
############################################################

TABLE support_tickets

id
ticket_number
user_id
department
priority
status
subject

------------------------------------------------------------

TABLE support_messages

id
ticket_id
sender_id
message
attachment_file_id

############################################################
REVIEWS
############################################################

TABLE reviews

id
user_id
booking_id
item_type
item_id
rating
title
comment
status

############################################################
REPORTS
############################################################

TABLE report_exports

id
user_id
report_type
filters_json
file_id
generated_at

############################################################
RELATIONSHIPS

User
↓
Bookings
↓
Booking Items
↓
Passengers

Booking
↓
Payments
↓
Transactions

Booking
↓
Invoice

Booking
↓
Voucher

Payment
↓
Refund

Booking
↓
Cancellation

User
↓
Support Tickets
↓
Messages

User
↓
Wishlist
↓
Wishlist Items

############################################################
BOOKING STATUS

draft

pending

awaiting_payment

paid

confirmed

ticketed

completed

cancelled

expired

refunded

############################################################
PAYMENT STATUS

pending

processing

paid

failed

cancelled

partially_refunded

refunded

############################################################
PAYMENT METHODS

Wallet

Credit Card

Bank Transfer

Online Gateway

Cash

Agency Credit

############################################################
INDEXES

booking_number

user_id

status

payment_status

transaction_reference

invoice_number

voucher_number

ticket_number

rating

created_at

############################################################
RULES

- Booking numbers must be unique.
- Never permanently delete financial records.
- Every payment must be traceable.
- Every refund must reference its original payment.
- Every booking automatically generates an invoice after successful payment.
- Every confirmed booking generates a downloadable PDF voucher.
- All financial operations must be written to Audit Logs.
- All monetary values must support multiple currencies.
- Every payment gateway must be configurable through the database or environment variables.

END OF PART 3.3
############################################################
PART 4
AUTHENTICATION
AUTHORIZATION
SECURITY
############################################################

PROJECT GOAL

Implement an enterprise-grade authentication and authorization system.

Security has the highest priority.

Never trust client input.

Every endpoint must be protected according to permissions.

############################################################
AUTHENTICATION METHODS
############################################################

Support all of the following:

✓ Email + Password

✓ Mobile + OTP

✓ Email Verification

✓ Password Reset

✓ Refresh Token

✓ JWT Access Token

✓ Remember Me

✓ Google Login (Optional)

✓ Apple Login (Optional)

✓ Agency Login

✓ Admin Login

############################################################
USER REGISTRATION
############################################################

Registration Flow

1. User enters:
   - First Name
   - Last Name
   - Email
   - Mobile
   - Password

2. Validate data.

3. Check duplicate email/mobile.

4. Hash password using Argon2.

5. Create user.

6. Send Email Verification.

7. Send OTP (optional).

8. Login only after verification (configurable).

############################################################
LOGIN FLOW
############################################################

User Login

↓

Validate credentials

↓

Generate Access Token

↓

Generate Refresh Token

↓

Save Session

↓

Return Tokens

############################################################
JWT
############################################################

Use:

Short Access Token

Long Refresh Token

Refresh tokens stored securely.

Support token rotation.

Support token revocation.

############################################################
PASSWORD SECURITY
############################################################

Use Argon2.

Never store plaintext passwords.

Password policy:

Minimum 8 characters

Uppercase

Lowercase

Number

Special Character

Prevent common passwords.

############################################################
OTP
############################################################

OTP Length

6 Digits

Expiry

2 Minutes

Maximum Attempts

5

Store inside Redis.

############################################################
EMAIL VERIFICATION
############################################################

Generate unique verification token.

Expire after 24 hours.

Support resend verification.

############################################################
FORGOT PASSWORD
############################################################

User enters email.

↓

Generate secure token.

↓

Email reset link.

↓

Validate token.

↓

Update password.

↓

Invalidate previous sessions.

############################################################
SESSIONS
############################################################

Track:

Device

Browser

Operating System

IP

Country

City

Login Time

Last Activity

Allow user to terminate sessions remotely.

############################################################
MULTI DEVICE LOGIN
############################################################

Configurable.

Allow:

Unlimited

OR

Maximum N devices.

############################################################
AUTHORIZATION
############################################################

Use RBAC.

Roles:

Guest

Customer

Agency

Operator

Support

Manager

Admin

Super Admin

############################################################
PERMISSIONS
############################################################

Dynamic permissions.

Example:

users.create

users.edit

users.delete

users.view

bookings.view

bookings.cancel

payments.refund

reports.export

settings.update

Every API checks permission.

############################################################
ROUTE PROTECTION
############################################################

Public

Authenticated

Role Protected

Permission Protected

Admin Only

############################################################
API SECURITY
############################################################

Rate Limiting

Helmet

CORS

Validation

DTO

Global Exception Filter

Input Sanitization

############################################################
FILE SECURITY
############################################################

Validate:

File Type

File Size

Mime Type

Virus Scan (Future)

Never trust uploaded filenames.

Generate random file names.

############################################################
AUDIT LOG
############################################################

Log:

Login

Logout

Password Change

Payment

Refund

Booking Update

Admin Actions

Permission Changes

Settings Changes

############################################################
ACCOUNT SECURITY
############################################################

Temporary account lock after repeated failures.

Example:

5 failed logins

↓

Lock 15 minutes.

############################################################
TWO FACTOR AUTHENTICATION
############################################################

Support:

Authenticator Apps

OTP SMS

Email Code

############################################################
SECURITY HEADERS
############################################################

Enable:

Content Security Policy

X-Frame-Options

XSS Protection

Strict Transport Security

############################################################
CSRF
############################################################

Protect cookie-based endpoints.

############################################################
SQL INJECTION
############################################################

Never use raw SQL unless absolutely necessary.

Always use Prisma safely.

############################################################
XSS
############################################################

Escape user content.

Sanitize HTML.

############################################################
BACKUP
############################################################

Support:

Automatic Database Backup

Automatic File Backup

Retention Policy

############################################################
MONITORING
############################################################

Log Errors

Performance Metrics

Failed Logins

Payment Failures

API Errors

############################################################
AUTH MODULE STRUCTURE
############################################################

auth/

controllers/

services/

guards/

strategies/

dto/

validators/

decorators/

interfaces/

repositories/

tests/

############################################################
USER PAGES
############################################################

Login

Register

Forgot Password

Reset Password

Verify Email

OTP Verification

Profile

Security Settings

Active Sessions

Two Factor Authentication

############################################################
ADMIN PAGES
############################################################

Users

Roles

Permissions

Sessions

Audit Logs

Login History

Blocked Users

############################################################
RULES FOR AI AGENT
############################################################

- Never weaken security for convenience.
- Never expose secrets in frontend code.
- Store secrets only in environment variables.
- Every sensitive action must be logged.
- Validate every request on the server.
- Reuse authentication middleware and guards.
- Write unit tests for authentication and authorization.
- Ensure Swagger documents all protected endpoints.

END OF PART 4
############################################################
PART 5
COMPLETE WEBSITE STRUCTURE
SITE MAP
############################################################

IMPORTANT

Do NOT remove existing pages.

Analyze every existing page.

Reuse layouts.

Improve UI.

Keep URLs compatible whenever possible.

############################################################
PUBLIC PAGES
############################################################

/

Home

/about

About Us

/contact

Contact Us

/faq

Frequently Asked Questions

/privacy

Privacy Policy

/terms

Terms & Conditions

/refund-policy

Refund Policy

/careers

Careers

/partners

Partners

/blog

Blog

/blog/[slug]

Blog Details

/news

News

/news/[slug]

News Details

############################################################
DESTINATIONS
############################################################

/destinations

/destinations/[country]

/destinations/[country]/[city]

############################################################
TOURS
############################################################

/tours

/tours/[slug]

/tour-categories

/tour-categories/[slug]

/last-minute-tours

/luxury-tours

/private-tours

/group-tours

############################################################
HOTELS
############################################################

/hotels

/hotels/[slug]

/hotel-search

############################################################
FLIGHTS
############################################################

/flights

/flight-search

/flight-result

############################################################
CAR RENTAL
############################################################

/cars

/cars/[slug]

############################################################
AIRPORT TRANSFER
############################################################

/transfer

############################################################
TRAVEL INSURANCE
############################################################

/insurance

############################################################
VISA
############################################################

/visa

/visa/[country]

############################################################
SEARCH
############################################################

/search

/results

############################################################
AUTHENTICATION
############################################################

/login

/register

/verify-email

/verify-phone

/forgot-password

/reset-password

############################################################
CUSTOMER PANEL
############################################################

/dashboard

/dashboard/profile

/dashboard/security

/dashboard/sessions

/dashboard/passengers

/dashboard/bookings

/dashboard/bookings/[id]

/dashboard/payments

/dashboard/invoices

/dashboard/vouchers

/dashboard/wallet

/dashboard/wishlist

/dashboard/reviews

/dashboard/coupons

/dashboard/notifications

/dashboard/support

/dashboard/settings

############################################################
AGENCY PANEL (B2B)
############################################################

/agency

/agency/dashboard

/agency/bookings

/agency/customers

/agency/reports

/agency/commissions

############################################################
ADMIN PANEL
############################################################

/admin

/admin/dashboard

############################################################
USERS
############################################################

/admin/users

/admin/users/create

/admin/users/[id]

############################################################
ROLES
############################################################

/admin/roles

/admin/permissions

############################################################
TOURS
############################################################

/admin/tours

/admin/tours/create

/admin/tours/[id]

############################################################
HOTELS
############################################################

/admin/hotels

/admin/hotels/create

############################################################
ROOMS
############################################################

/admin/rooms

/admin/room-types

############################################################
FLIGHTS
############################################################

/admin/flights

/admin/airlines

/admin/airports

############################################################
BOOKINGS
############################################################

/admin/bookings

/admin/bookings/[id]

############################################################
PAYMENTS
############################################################

/admin/payments

/admin/refunds

/admin/invoices

############################################################
FINANCE
############################################################

/admin/wallets

/admin/coupons

/admin/promotions

############################################################
CMS
############################################################

/admin/pages

/admin/blog

/admin/blog/categories

/admin/faqs

/admin/news

############################################################
REVIEWS
############################################################

/admin/reviews

############################################################
MEDIA
############################################################

/admin/files

############################################################
SETTINGS
############################################################

/admin/settings

/admin/currencies

/admin/languages

/admin/countries

/admin/cities

############################################################
SUPPORT
############################################################

/admin/tickets

############################################################
ANALYTICS
############################################################

/admin/reports

/admin/statistics

############################################################
SYSTEM
############################################################

/admin/logs

/admin/audit

/admin/jobs

/admin/cache

############################################################
ERROR PAGES
############################################################

/401

/403

/404

/500

############################################################
COMMON UI COMPONENTS
############################################################

Navbar

Mega Menu

Footer

Search Bar

Destination Selector

Calendar

Passenger Selector

Currency Selector

Language Selector

Dark Mode Toggle (optional)

Notification Bell

Breadcrumb

Floating WhatsApp Button

Live Chat

Newsletter

Testimonials

Partners Carousel

FAQ Accordion

############################################################
PAGE FEATURES
############################################################

Every listing page supports:

Search

Filters

Sorting

Pagination

Grid/List View

Map View (where applicable)

Favorites

Share

SEO Metadata

Loading Skeleton

Empty State

Error State

############################################################
RULES FOR AI AGENT
############################################################

- Preserve existing routes whenever possible.
- Do not create duplicate pages.
- Reuse layouts and components.
- Every page must be responsive.
- Every page must include loading and error states.
- Every form must include validation.
- Every protected page must check authentication and permissions.
- Keep the UI consistent across the entire application.

END OF PART 5
############################################################
PART 6
BOOKING FLOW
PAYMENT FLOW
BUSINESS RULES
############################################################

IMPORTANT

Never allow direct payment without a valid booking.

Every booking must have a complete history.

All critical operations must be logged.

Support multiple booking types with one unified workflow.

############################################################
SUPPORTED BOOKING TYPES
############################################################

Tour

Hotel

Flight

Car Rental

Airport Transfer

Travel Insurance

Visa Service

Custom Travel Package

############################################################
UNIFIED BOOKING FLOW
############################################################

Step 1
User searches

↓

Step 2
Display search results

↓

Step 3
User selects service

↓

Step 4
Display complete details

↓

Step 5
Select date / room / class / options

↓

Step 6
Add travelers

↓

Step 7
Validate availability

↓

Step 8
Reserve temporarily (lock inventory)

↓

Step 9
Apply coupon / wallet / loyalty points

↓

Step 10
Calculate final price

↓

Step 11
Create Draft Booking

↓

Step 12
Redirect to Payment

↓

Step 13
Verify payment callback

↓

Step 14
Confirm booking

↓

Step 15
Generate Invoice

↓

Step 16
Generate PDF Voucher

↓

Step 17
Send Email

↓

Step 18
Send SMS

↓

Step 19
Create Notification

↓

Step 20
Show success page

############################################################
BOOKING LIFECYCLE
############################################################

Draft

↓

Pending

↓

Awaiting Payment

↓

Paid

↓

Confirmed

↓

Completed

OR

Cancelled

OR

Expired

OR

Refunded

############################################################
PRICE CALCULATION
############################################################

Base Price

+

Room Upgrade

+

Extra Services

+

Insurance

+

Transfer

+

Visa

+

Taxes

+

Service Fee

-

Coupon

-

Wallet

-

Loyalty Discount

=

Final Price

############################################################
INVENTORY MANAGEMENT
############################################################

Lock seats/rooms during checkout.

Reservation lock timeout:

15 minutes (configurable)

If payment fails or expires:

Release inventory automatically.

############################################################
PAYMENT FLOW
############################################################

User chooses payment method:

- Wallet
- Online Gateway
- Bank Transfer
- Agency Credit
- Mixed Payment (Wallet + Gateway)

↓

Create payment request

↓

Redirect to gateway

↓

Gateway callback

↓

Verify server-to-server

↓

Update payment status

↓

Update booking status

↓

Generate invoice and voucher

############################################################
REFUND FLOW
############################################################

User requests cancellation

↓

System checks cancellation policy

↓

Calculate refundable amount

↓

Admin approval (if required)

↓

Create refund record

↓

Process refund

↓

Notify customer

############################################################
COUPON RULES
############################################################

Support:

Fixed amount

Percentage

First booking only

Specific tours

Specific hotels

Specific airlines

Minimum purchase

Maximum discount

Expiration date

Usage limit

Per-user limit

############################################################
WALLET RULES
############################################################

Wallet can be used:

Fully

Partially

Wallet balance updates after:

Payment

Refund

Admin adjustment

Referral reward

Loyalty conversion

############################################################
LOYALTY PROGRAM
############################################################

Earn points after completed bookings.

Redeem points during checkout.

Support membership levels:

Bronze

Silver

Gold

Platinum

############################################################
NOTIFICATIONS
############################################################

Events:

Booking Created

Payment Success

Payment Failed

Booking Confirmed

Booking Cancelled

Refund Completed

Voucher Issued

Invoice Issued

Channels:

Email

SMS

In-App Notification

############################################################
ADMIN WORKFLOW
############################################################

Admin can:

View bookings

Edit booking

Cancel booking

Force confirmation

Issue manual voucher

Issue refund

Export booking data

############################################################
REPORTS
############################################################

Daily bookings

Monthly revenue

Top destinations

Top hotels

Top airlines

Payment success rate

Refund statistics

Coupon usage

Wallet usage

Customer growth

############################################################
API DESIGN (Examples)
############################################################

GET    /api/v1/search

GET    /api/v1/tours

GET    /api/v1/hotels

GET    /api/v1/flights

POST   /api/v1/bookings

GET    /api/v1/bookings/{id}

POST   /api/v1/payments

POST   /api/v1/payments/callback

POST   /api/v1/refunds

GET    /api/v1/invoices/{id}

GET    /api/v1/vouchers/{id}

############################################################
BUSINESS RULES
############################################################

- Never confirm a booking before successful payment verification.
- Never oversell hotel rooms or flight seats.
- Every confirmed booking must have an invoice and voucher.
- Every payment callback must be verified server-to-server.
- Support partial refunds when cancellation policy allows.
- All prices must respect the selected currency.
- Every booking action must create an Audit Log entry.
- Use background jobs for email, SMS, PDF generation and notifications to avoid slowing down the user experience.

############################################################
AI AGENT IMPLEMENTATION RULES
############################################################

1. Analyze existing booking logic first.
2. Reuse current models if possible.
3. Extend, do not replace.
4. Write unit tests for booking and payment services.
5. Add integration tests for payment callbacks.
6. Ensure Docker environment continues to work.
7. Document every API with Swagger.
8. Keep all code modular and reusable.

END OF PART 6
############################################################
PART 7
PRODUCTION
DEVOPS
DEPLOYMENT
SEO
PERFORMANCE
############################################################

IMPORTANT

This platform must be production-ready.

Every service must run independently.

Everything must work using Docker Compose.

The project must be deployable on Linux servers.

############################################################
INFRASTRUCTURE
############################################################

Containers

Frontend (Next.js)

Backend (NestJS)

PostgreSQL

Redis

MinIO

Nginx

Scheduler / Worker

############################################################
DOCKER RULES
############################################################

Every service has its own Dockerfile.

Use multi-stage builds.

Keep images small.

Use health checks.

Restart policy:

unless-stopped

Persist data using Docker Volumes.

############################################################
NGINX
############################################################

Responsibilities

SSL

Reverse Proxy

Compression

Static File Cache

Image Cache

Rate Limiting

Security Headers

HTTP → HTTPS Redirect

############################################################
HTTPS
############################################################

Support Let's Encrypt.

Auto renewal.

Force HTTPS.

############################################################
ENVIRONMENT VARIABLES
############################################################

Store everything in .env

Examples

DATABASE_URL

JWT_SECRET

JWT_REFRESH_SECRET

REDIS_URL

MINIO_ENDPOINT

MINIO_ACCESS_KEY

MINIO_SECRET_KEY

SMTP_HOST

SMTP_PORT

SMTP_USERNAME

SMTP_PASSWORD

SMS_PROVIDER_KEY

PAYMENT_GATEWAY_KEY

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

############################################################
REDIS
############################################################

Use for

Caching

OTP

Sessions

Rate Limiting

Queue

Temporary Booking Lock

Search Cache

############################################################
BACKGROUND JOBS
############################################################

Email Queue

SMS Queue

Voucher Generation

Invoice Generation

Notification Queue

Cleanup Jobs

Scheduled Reports

############################################################
MINIO
############################################################

Buckets

avatars

hotels

tours

blog

documents

passports

visas

invoices

vouchers

temporary

############################################################
BACKUP STRATEGY
############################################################

Automatic PostgreSQL Backup

Daily

Weekly

Monthly

Automatic MinIO Backup

Backup Verification

Restore Documentation

############################################################
MONITORING
############################################################

Monitor

CPU

RAM

Disk

Containers

API Response Time

Failed Payments

Errors

Bookings

############################################################
LOGGING
############################################################

Application Logs

Access Logs

Error Logs

Audit Logs

Payment Logs

Security Logs

############################################################
SEO
############################################################

Every page must include

Meta Title

Meta Description

Canonical URL

Open Graph

Twitter Card

JSON-LD Schema

Breadcrumb Schema

FAQ Schema (where applicable)

Article Schema

Organization Schema

Generate XML Sitemap automatically.

Generate robots.txt automatically.

############################################################
PERFORMANCE
############################################################

Use

Image Optimization

Lazy Loading

Code Splitting

Dynamic Imports

Pagination

Server Components

Caching

Compression

CDN Ready

############################################################
IMAGE OPTIMIZATION
############################################################

Automatically generate

Thumbnail

Medium

Large

WebP

AVIF (if supported)

############################################################
API PERFORMANCE
############################################################

Pagination

Filtering

Sorting

Selective Fields

Database Indexes

Redis Cache

############################################################
DATABASE OPTIMIZATION
############################################################

Indexes

Foreign Keys

Constraints

Query Optimization

Connection Pooling

############################################################
SECURITY
############################################################

Helmet

Rate Limiting

CORS

HTTPS

Secure Cookies

Argon2

JWT

Refresh Token Rotation

RBAC

Audit Logs

Input Validation

Output Sanitization

############################################################
CI/CD
############################################################

GitHub Actions

Pipeline

Install

Lint

Tests

Build

Docker Build

Docker Push

Deploy

Health Check

Rollback on Failure

############################################################
DOCUMENTATION
############################################################

README.md

INSTALL.md

DEPLOYMENT.md

API.md

DATABASE.md

CHANGELOG.md

############################################################
ERROR PAGES
############################################################

401

403

404

500

503

Custom Design

############################################################
CODE QUALITY
############################################################

ESLint

Prettier

Strict TypeScript

No unused imports

No dead code

No duplicated logic

############################################################
TESTING
############################################################

Unit Tests

Integration Tests

End-to-End Tests

Target Coverage: 80%+

############################################################
ANALYTICS
############################################################

Google Analytics

Google Search Console

Conversion Tracking

Booking Funnel

Revenue Dashboard

############################################################
RULES FOR AI AGENT
############################################################

- Never hardcode secrets.
- Always use environment variables.
- Ensure every container has a health check.
- Generate Docker Compose for development and production.
- Keep deployment reproducible.
- Optimize SEO for every public page.
- Ensure Lighthouse scores are high for Performance, Accessibility, Best Practices and SEO.
- Document all deployment steps.

END OF PART 7############################################################
PART 8
AI AGENT DEVELOPMENT RULES
PROJECT ROADMAP
DEFINITION OF DONE
############################################################

IMPORTANT

This is NOT a greenfield project.

The project already exists.

Analyze first.

Never rewrite the project.

Never remove working features.

Always improve incrementally.

############################################################
PHASE 0
PROJECT ANALYSIS
############################################################

Before writing ANY code:

1. Analyze the entire repository.

2. Explain:

- Current architecture
- Existing pages
- Existing APIs
- Existing database
- Existing Docker setup
- Existing authentication
- Existing UI

3. Detect:

Unused files

Dead code

Duplicate code

Security issues

Performance issues

SEO issues

Accessibility issues

4. Produce an improvement plan.

Do NOT implement anything before the analysis.

############################################################
PHASE 1
FOUNDATION
############################################################

✔ Clean architecture

✔ Shared components

✔ Config system

✔ Error handling

✔ Logging

✔ Environment variables

✔ Docker verification

############################################################
PHASE 2
AUTHENTICATION
############################################################

Registration

Login

Refresh Token

Logout

OTP

Email Verification

Forgot Password

Profile

Sessions

RBAC

############################################################
PHASE 3
DATABASE
############################################################

Implement Prisma Schema.

Generate migrations.

Seed data.

Indexes.

Constraints.

############################################################
PHASE 4
CORE MODULES
############################################################

Users

Tours

Hotels

Flights

Transfers

Cars

Insurance

Visa

Destinations

############################################################
PHASE 5
BOOKING SYSTEM
############################################################

Booking

Inventory

Pricing

Coupons

Wallet

Payments

Refunds

Invoice

Voucher

############################################################
PHASE 6
CUSTOMER DASHBOARD
############################################################

Bookings

Invoices

Wallet

Wishlist

Reviews

Passengers

Support

Settings

############################################################
PHASE 7
ADMIN PANEL
############################################################

Dashboard

Users

Tours

Hotels

Flights

Bookings

Payments

Reports

Media

CMS

Settings

############################################################
PHASE 8
CMS
############################################################

Blog

Pages

FAQs

News

SEO

############################################################
PHASE 9
SEO
############################################################

Metadata

OpenGraph

Schema.org

Canonical

Sitemap

robots.txt

############################################################
PHASE 10
OPTIMIZATION
############################################################

Caching

Lazy Loading

Compression

Image Optimization

Pagination

Query Optimization

############################################################
PHASE 11
TESTING
############################################################

Unit Tests

Integration Tests

End-to-End Tests

############################################################
PHASE 12
DEPLOYMENT
############################################################

Docker

Nginx

SSL

CI/CD

Monitoring

Backup

############################################################
AI CODING RULES
############################################################

Always:

✔ Reuse existing code.

✔ Reuse components.

✔ Reuse layouts.

✔ Reuse APIs.

Never:

✘ Duplicate code.

✘ Break routes.

✘ Remove functionality.

✘ Hardcode secrets.

############################################################
CODE STYLE
############################################################

TypeScript Strict

Clean Code

SOLID

DRY

KISS

Meaningful names

Small functions

Reusable components

############################################################
DEFINITION OF DONE
############################################################

A task is complete only if:

✔ Code compiles.

✔ Tests pass.

✔ Docker works.

✔ No lint errors.

✔ Swagger updated.

✔ Documentation updated.

✔ Database migration created.

✔ UI responsive.

✔ SEO complete.

✔ Accessibility checked.

✔ Performance acceptable.

############################################################
CHECKLIST BEFORE MERGE
############################################################

[ ] No TypeScript errors

[ ] No ESLint errors

[ ] Docker builds successfully

[ ] API documented

[ ] Tests passed

[ ] Database migration verified

[ ] Responsive on mobile

[ ] Responsive on tablet

[ ] Responsive on desktop

[ ] Security reviewed

[ ] Performance reviewed

[ ] SEO reviewed

############################################################
FINAL AI COMMAND
############################################################

Read this entire specification before writing any code.

Analyze the existing project first.

Never replace the existing application.

Improve it incrementally.

Keep backward compatibility whenever possible.

Follow every section of this document.

When unsure, explain your reasoning and propose options before making architectural changes.

Work feature-by-feature.

After each feature:

- Run tests.
- Run lint.
- Verify Docker.
- Update documentation.

The final goal is a production-ready travel agency platform that is scalable, secure, maintainable and easy to extend.

END OF AI_PROJECT_SPEC.md