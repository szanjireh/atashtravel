# 🔧 Fix: Dockerfile COPY Syntax Error

## خطای رخ داده

```
ERROR: failed to calculate checksum of ref: "/||": not found
```

**علت**: استفاده از shell operators (`2>/dev/null || :`) در دستور `COPY` که در Dockerfile معتبر نیست.

```dockerfile
# ❌ اشتباه
COPY apps/web/.npmrc ./apps/web/ 2>/dev/null || :
```

## راه‌حل اعمال شده

### ✅ حذف Shell Operators از COPY

در Dockerfile نمی‌توان از shell redirects یا operators استفاده کرد. باید دستورات COPY ساده باشند:

```dockerfile
# ✅ صحیح
COPY .npmrc ./
```

### ✅ استفاده از Root .npmrc

npm به صورت اتوماتیک از `.npmrc` در parent directories استفاده می‌کند. بنابراین:

- فقط root `.npmrc` در Docker کپی می‌شود
- فایل‌های `apps/*/. npmrc` اختیاری هستند (برای development محلی)
- npm در workspace ها از root `.npmrc` استفاده می‌کند

## تغییرات اعمال شده

### 1. [apps/web/Dockerfile](apps/web/Dockerfile)
```diff
- COPY .npmrc ./
- COPY apps/web/.npmrc ./apps/web/ 2>/dev/null || :
+ COPY .npmrc ./
```

### 2. [apps/api/Dockerfile](apps/api/Dockerfile)
```diff
- COPY .npmrc ./
- COPY apps/api/.npmrc ./apps/api/
+ COPY .npmrc ./
```

### 3. [.dockerignore](.dockerignore)
اضافه شدن توضیحات:
```properties
# Note: .npmrc in root is needed for Docker build
# apps/*/.npmrc files are optional (npm uses parent .npmrc)
```

## نتیجه

✅ Dockerfile syntax صحیح  
✅ Build بدون خطا  
✅ npm از root `.npmrc` با تنظیمات timeout استفاده می‌کند  
✅ ساده‌تر و maintainable تر

---

**تاریخ:** 2026-07-07  
**خطای برطرف شده:** `/||: not found` در BuildKit
