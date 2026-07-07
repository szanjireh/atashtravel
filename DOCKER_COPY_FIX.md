# 🔧 Fix: Dockerfile COPY Syntax Error + npm ci Missing Lock File

## خطاهای رخ داده

### 1️⃣ خطای اول: Shell Operators در COPY
```
ERROR: failed to calculate checksum of ref: "/||": not found
```

**علت**: استفاده از shell operators (`2>/dev/null || :`) در دستور `COPY` که در Dockerfile معتبر نیست.

### 2️⃣ خطای دوم: npm ci نیاز به package-lock.json
```
npm error The `npm ci` command can only install with an existing package-lock.json
```

**علت**: فایل `package-lock.json` در `.dockerignore` بود و کپی نمی‌شد.

---

## راه‌حل‌های اعمال شده

### ✅ 1. حذف Shell Operators از COPY

```dockerfile
# ❌ اشتباه
COPY apps/web/.npmrc ./apps/web/ 2>/dev/null || :

# ✅ صحیح
COPY .npmrc ./
```

### ✅ 2. حذف package-lock.json از .dockerignore

```diff
# Dependencies
node_modules/
npm-debug.log*
- package-lock.json  # ❌ حذف شد
+ # Note: package-lock.json is REQUIRED for npm ci in Docker
pnpm-debug.log*
```

**مهم**: `npm ci` برای reproducible builds به `package-lock.json` نیاز دارد!

---

## تغییرات اعمال شده

### 1. [.dockerignore](.dockerignore)
```diff
- package-lock.json
+ # Note: package-lock.json is REQUIRED for npm ci in Docker
```

### 2. [apps/web/Dockerfile](apps/web/Dockerfile)
```diff
- COPY .npmrc ./
- COPY apps/web/.npmrc ./apps/web/ 2>/dev/null || :
+ COPY .npmrc ./
```

### 3. [apps/api/Dockerfile](apps/api/Dockerfile)
```diff
- COPY .npmrc ./
- COPY apps/api/.npmrc ./apps/api/
+ COPY .npmrc ./
```

---

## چرا package-lock.json مهم است؟

| Command | نیاز به Lock File | Use Case |
|---------|-------------------|----------|
| `npm install` | ❌ نیاز ندارد | Development |
| `npm ci` | ✅ **ضروری است** | CI/CD, Production |

**مزایای npm ci:**
- ✅ سریع‌تر از `npm install`
- ✅ نصب دقیق همان versionsهای lock file
- ✅ Deterministic builds
- ✅ پاک کردن خودکار `node_modules` قبل از نصب

---

## نتیجه

✅ Dockerfile syntax صحیح  
✅ `package-lock.json` کپی می‌شود  
✅ `npm ci` با موفقیت اجرا می‌شود  
✅ Reproducible builds تضمین شده

---

**تاریخ:** 2026-07-07  
**خطاهای برطرف شده:**
- ❌ `/||: not found` → ✅ با حذف shell operators
- ❌ `npm ci` needs lock file → ✅ با حذف از .dockerignore
