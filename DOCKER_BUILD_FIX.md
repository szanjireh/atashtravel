# 🔧 رفع مشکل Deploy - Docker Build Timeout

## 🔍 علت خطا

خطای اصلی:
```
npm error code EIDLETIMEOUT
npm error Idle timeout reached for host `registry.npmjs.org:443`
```

این خطا به دلیل timeout در دانلود بسته‌های npm از registry در محیط CI/CD رخ می‌داد.

---

## ✅ راه‌حل‌های اعمال شده

### 1️⃣ **فایل‌های `.npmrc` با تنظیمات Timeout**

ایجاد 3 فایل `.npmrc`:
- [.npmrc](.npmrc) - Root workspace (استفاده می‌شود در Docker build)
- [apps/api/.npmrc](apps/api/.npmrc) - Backend (اختیاری - برای development محلی)
- [apps/web/.npmrc](apps/web/.npmrc) - Frontend (اختیاری - برای development محلی)

**نکته مهم**: در Docker build فقط root `.npmrc` کپی می‌شود و npm به صورت اتوماتیک از آن استفاده می‌کند.

**تنظیمات اعمال شده:**
```properties
fetch-timeout=600000              # 10 دقیقه (قبلاً 5 دقیقه بود)
fetch-retry-mintimeout=60000      # حداقل 60 ثانیه بین retry ها
fetch-retry-maxtimeout=120000     # حداکثر 120 ثانیه بین retry ها
fetch-retries=5                   # 5 بار تلاش مجدد
maxsockets=10                     # محدودیت connection pool
network-concurrency=3             # کاهش همزمانی برای stability
```

---

### 2️⃣ **بهینه‌سازی Dockerfile با BuildKit Cache**

#### Backend ([apps/api/Dockerfile](apps/api/Dockerfile)):
```dockerfile
# استفاده از BuildKit cache mount
RUN --mount=type=cache,target=/root/.npm \
    npm ci --workspace=api --omit=dev || \
    npm ci --workspace=api --omit=dev || \
    npm ci --workspace=api --omit=dev
```

**تغییرات کلیدی:**
- ✅ **BuildKit Cache Mount**: Cache کردن `/root/.npm` برای استفاده مجدد
- ✅ **Retry Logic**: 3 بار تلاش خودکار در صورت fail
- ✅ **جداسازی Layers**: نصب dependencies و cleanup در RUN های جداگانه
- ✅ **کپی `.npmrc`**: فقط root `.npmrc` کپی می‌شود (npm از parent استفاده می‌کند)

#### Frontend ([apps/web/Dockerfile](apps/web/Dockerfile)):
همان pattern اعمال شد.

---

### 3️⃣ **بهینه‌سازی GitHub Actions Workflow**

فایل: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)

```yaml
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

docker compose build --progress=plain
```

**تغییرات:**
- ✅ فعال‌سازی **Docker BuildKit** برای استفاده از cache mounts
- ✅ حذف `--no-cache` برای استفاده از cache بین buildها
- ✅ `--progress=plain` برای لاگ‌های بهتر

---

### 4️⃣ **فایل‌های `.dockerignore`**

ایجاد 3 فایل `.dockerignore`:
- [.dockerignore](.dockerignore) - Root
- [apps/api/.dockerignore](apps/api/.dockerignore) - Backend
- [apps/web/.dockerignore](apps/web/.dockerignore) - Frontend

**فایده:**
- 🚀 کاهش حجم context ارسالی به Docker daemon
- ⚡ سرعت بالاتر در COPY کردن فایل‌ها
- 💾 جلوگیری از کپی فایل‌های غیرضروری (node_modules, .git, etc.)

---

## 📊 مقایسه قبل و بعد

| مورد | قبل | بعد |
|------|-----|-----|
| **Timeout** | 5 دقیقه | 10 دقیقه |
| **Retry** | 2 بار | 5 بار اتوماتیک در npm + 3 بار دستی |
| **Cache** | ❌ | ✅ BuildKit cache mount |
| **Context Size** | بزرگ | کوچک (با .dockerignore) |
| **BuildKit** | غیرفعال | فعال |
| **Layers** | یک RUN بزرگ | چند RUN بهینه |

---

## 🎯 انتظارات

### چرا این تغییرات کار می‌کند؟

1. **Timeout افزایش یافته**: بسته‌های بزرگ وقت بیشتری برای دانلود دارند
2. **Retry مکرر**: در صورت مشکل موقت شبکه، اتوماتیک retry می‌شود
3. **BuildKit Cache**: بسته‌های دانلود شده cache می‌شوند و در build بعدی استفاده می‌شوند
4. **Context کوچکتر**: COPY سریع‌تر انجام می‌شود

### اگر باز هم خطا داد:

1. **npm registry موقتاً down است**: صبر کنید و دوباره push کنید
2. **شبکه سرور مشکل دارد**: بررسی کنید اتصال سرور به اینترنت
3. **نیاز به mirror registry**: می‌توانید از [Verdaccio](https://verdaccio.org/) یا [npm mirror](https://github.com/cnpm/cnpmjs.org) استفاده کنید

---

## 🚀 چطور تست کنیم؟

**توجه**: طبق درخواست، روی سیستم Local اجرا نمی‌شود. فقط تغییرات commit و push شوند:

```bash
# Commit تغییرات
git add .
git commit -m "fix: resolve Docker build errors (EIDLETIMEOUT + npm ci)

Critical fixes:
- Add .npmrc with 10min timeout and 5 retry attempts
- Remove package-lock.json from .dockerignore (required for npm ci)
- Add explicit COPY of package-lock.json in Dockerfiles
- Optimize Dockerfiles with BuildKit cache mounts
- Add 3x retry logic for npm ci commands
- Enable DOCKER_BUILDKIT in GitHub Actions workflow
- Add .dockerignore files to reduce build context
- Remove invalid shell operators from COPY commands

Resolves: EIDLETIMEOUT, npm ci lock file missing, /||: not found"

# Push به GitHub
git push origin main
```

GitHub Actions به صورت اتوماتیک اجرا می‌شود.

---

## 📝 فایل‌های تغییر یافته

- ✅ [.npmrc](.npmrc) - جدید
- ✅ [apps/api/.npmrc](apps/api/.npmrc) - جدید
- ✅ [apps/web/.npmrc](apps/web/.npmrc) - جدید
- ✅ [.dockerignore](.dockerignore) - جدید (package-lock.json NOT ignored)
- ✅ [apps/api/.dockerignore](apps/api/.dockerignore) - جدید
- ✅ [apps/web/.dockerignore](apps/web/.dockerignore) - جدید
- ✅ [apps/api/Dockerfile](apps/api/Dockerfile) - بهینه‌سازی
- ✅ [apps/web/Dockerfile](apps/web/Dockerfile) - بهینه‌سازی
- ✅ [.github/workflows/deploy.yml](.github/workflows/deploy.yml) - بهینه‌سازی

**⚠️ نکته مهم:** `package-lock.json` نباید در `.dockerignore` باشد زیرا `npm ci` به آن نیاز دارد!

---

## 🔒 نکات امنیتی

همه تنظیمات امن هستند:
- ✅ فقط timeout و retry افزایش یافته
- ✅ هیچ credential یا secret اضافه نشده
- ✅ registry همان npm official است

---

## 📞 پشتیبانی

اگر مشکل برطرف نشد:
1. لاگ کامل GitHub Actions را چک کنید
2. زمان دقیق timeout را از لاگ ببینید
3. بررسی کنید که BuildKit فعال شده (`#20 [linux/amd64 api dependencies 1/5]`)

---

**تاریخ اعمال:** 2026-07-07  
**وضعیت:** ✅ آماده برای Deploy
