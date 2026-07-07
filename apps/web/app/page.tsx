import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900">
            آتش تراول
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            پلتفرم جامع رزرو تور، هتل و خدمات گردشگری
          </p>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            سفری بی‌دغدغه را با ما تجربه کنید. رزرو آنلاین، پشتیبانی 24 ساعته و بهترین قیمت‌ها
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <Link href="/tours">
              <Button size="lg" className="text-lg px-8">
                مشاهده تورها
              </Button>
            </Link>
            <Link href="/hotels">
              <Button size="lg" variant="outline" className="text-lg px-8">
                رزرو هتل
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                ثبت‌نام رایگان
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-xl font-bold mb-2">تورهای گردشگری</h3>
            <p className="text-gray-600">
              صدها تور داخلی و خارجی با بهترین قیمت‌ها
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-4">🏨</div>
            <h3 className="text-xl font-bold mb-2">رزرو هتل</h3>
            <p className="text-gray-600">
              رزرو آنلاین هتل در سراسر دنیا
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-2">پرداخت امن</h3>
            <p className="text-gray-600">
              پرداخت آنلاین با بالاترین سطح امنیت
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-3xl font-bold text-blue-600">1000+</div>
            <div className="text-gray-600 mt-2">تور فعال</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-3xl font-bold text-blue-600">5000+</div>
            <div className="text-gray-600 mt-2">هتل</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-3xl font-bold text-blue-600">50K+</div>
            <div className="text-gray-600 mt-2">کاربر فعال</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="text-3xl font-bold text-blue-600">4.8/5</div>
            <div className="text-gray-600 mt-2">رضایت کاربران</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 bg-blue-600 text-white p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            آماده برای شروع سفر بعدی هستید؟
          </h2>
          <p className="text-lg mb-8 opacity-90">
            همین حالا ثبت‌نام کنید و از تخفیف‌های ویژه بهره‌مند شوید
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-12">
              ثبت‌نام رایگان
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 آتش تراول. تمامی حقوق محفوظ است.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/about" className="text-gray-400 hover:text-white">
              درباره ما
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white">
              تماس با ما
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
