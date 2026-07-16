# Quick Testing Guide - Authentication System

## 🚀 Quick Start

### 1. Start the Services

```bash
# Terminal 1: Start API
cd apps/api
npm run start:dev

# Terminal 2: Start Web
cd apps/web
npm run dev
```

### 2. Test URLs
- **Homepage**: http://localhost:3000
- **Register**: http://localhost:3000/register
- **Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard
- **Admin Panel**: http://localhost:3000/admin
- **Email Verify**: http://localhost:3000/verify-email?token=YOUR_TOKEN

## 📝 Test Scenarios

### Scenario 1: Complete Registration Flow
1. ✅ Go to `/register`
2. ✅ Fill form:
   - Name: محمد رضایی
   - Email: test@example.com
   - Phone: 09121234567
   - Password: 12345678
3. ✅ Submit and see success message
4. ✅ Check database for new user
5. ✅ Get verification token from `email_verifications` table
6. ✅ Visit: `/verify-email?token=YOUR_TOKEN`
7. ✅ Should redirect to `/login?verified=true`

### Scenario 2: Login Flow
1. ✅ Go to `/login`
2. ✅ Enter credentials
3. ✅ Click "ورود"
4. ✅ Should redirect to `/dashboard`
5. ✅ Should see welcome message with your name
6. ✅ Check localStorage for tokens:
   ```javascript
   localStorage.getItem('accessToken')
   localStorage.getItem('refreshToken')
   ```

### Scenario 3: Dashboard Access
1. ✅ Login first
2. ✅ Navigate to `/dashboard`
3. ✅ Should see:
   - Welcome message
   - Profile card with your info
   - Verification status badge
   - Dashboard sections (Bookings, Tours, Wishlist, etc.)
   - Logout button

### Scenario 4: Protected Route
1. ✅ Logout or clear localStorage
2. ✅ Try to access `/dashboard`
3. ✅ Should redirect to `/login`
4. ✅ Login again
5. ✅ Should access dashboard successfully

### Scenario 5: Error Handling
1. ✅ Try login with wrong password
2. ✅ Should show: "ایمیل یا رمز عبور اشتباه است"
3. ✅ Try login with non-existent email
4. ✅ Should show same error message
5. ✅ Try registering with existing email
6. ✅ Should show: "کاربری با این ایمیل یا شماره تلفن قبلا ثبت‌نام کرده است"

### Scenario 6: Logout Flow
1. ✅ Login first
2. ✅ Go to `/dashboard`
3. ✅ Click "خروج" button
4. ✅ Should redirect to `/login`
5. ✅ Check localStorage - tokens should be removed
6. ✅ Try accessing `/dashboard` - should redirect to `/login`

### Scenario 7: Session Persistence
1. ✅ Login
2. ✅ Go to dashboard
3. ✅ Refresh the page (F5)
4. ✅ Should stay logged in
5. ✅ Should still see dashboard
6. ✅ Close browser completely
7. ✅ Reopen and go to `/dashboard`
8. ✅ Should still be logged in (until token expires)

### Scenario 8: Admin Panel
1. ✅ Login as any user
2. ✅ Navigate to `/admin`
3. ✅ Should be accessible (role check not enforced yet)
4. ✅ Should see admin navigation
5. ✅ Should see user name in header

## 🔍 Database Queries for Testing

### Check registered user
```sql
SELECT id, "firstName", "lastName", email, "isVerified", status 
FROM users 
WHERE email = 'test@example.com';
```

### Get verification token
```sql
SELECT token, "verifiedAt" 
FROM email_verifications 
WHERE "userId" = 'USER_ID' 
ORDER BY "createdAt" DESC 
LIMIT 1;
```

### Check active sessions
```sql
SELECT id, "refreshToken", device, browser, "expiresAt"
FROM sessions 
WHERE "userId" = 'USER_ID' 
AND "expiresAt" > NOW();
```

### Manually verify user
```sql
UPDATE users 
SET "isVerified" = true 
WHERE email = 'test@example.com';
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot read property 'user' of undefined"
**Solution**: Check if `/auth/me` endpoint returns data correctly

### Issue: Stuck on loading screen
**Solution**: 
1. Check API is running on port 4000
2. Check browser console for errors
3. Verify tokens in localStorage

### Issue: 401 Unauthorized
**Solution**:
1. Clear localStorage
2. Login again
3. Check if JWT secret matches between API and tokens

### Issue: Dashboard redirects to login immediately
**Solution**:
1. Check if tokens exist: `localStorage.getItem('accessToken')`
2. Check browser console for errors
3. Verify API client is sending Authorization header

### Issue: Email verification link doesn't work
**Solution**:
1. Copy token from database manually
2. Visit: `/verify-email?token=PASTE_TOKEN_HERE`
3. For production: implement email sending

## 🔧 Development Tools

### Check Tokens in Browser Console
```javascript
// View current tokens
console.log('Access Token:', localStorage.getItem('accessToken'));
console.log('Refresh Token:', localStorage.getItem('refreshToken'));

// Decode JWT (paste in jwt.io)
const token = localStorage.getItem('accessToken');
console.log(token);

// Clear tokens
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
```

### API Testing with curl
```bash
# Register
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "محمد",
    "lastName": "رضایی",
    "email": "test@example.com",
    "phone": "09121234567",
    "password": "12345678"
  }'

# Login
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "12345678"
  }'

# Get current user (with token)
curl -X GET http://localhost:4000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## ✅ Success Indicators

You'll know the system is working when:
1. ✅ Registration creates user in database
2. ✅ Login returns tokens and redirects to dashboard
3. ✅ Dashboard shows user information
4. ✅ Page refresh keeps user logged in
5. ✅ Logout clears tokens and redirects to login
6. ✅ Protected routes redirect unauthenticated users
7. ✅ Error messages display correctly in Persian
8. ✅ Email verification marks user as verified

## 📊 Performance Checks

- [ ] Login completes in < 2 seconds
- [ ] Dashboard loads in < 1 second when authenticated
- [ ] No console errors in browser
- [ ] No unnecessary API calls
- [ ] Token refresh is transparent to user

## 🎯 Ready for Production Checklist

Before deploying to production:
- [ ] Implement email sending (SMTP or service)
- [ ] Add rate limiting to auth endpoints
- [ ] Enable HTTPS only
- [ ] Set secure httpOnly cookies for tokens
- [ ] Add CSRF protection
- [ ] Implement password strength requirements
- [ ] Add captcha to registration/login
- [ ] Set up monitoring and logging
- [ ] Configure proper CORS
- [ ] Remove sensitive data from responses
- [ ] Add admin role checking
- [ ] Test all error scenarios
- [ ] Perform security audit

---

**Quick Test**: Register → Verify → Login → Dashboard → Logout ✅
