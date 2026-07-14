import Header from '@/components/header';
import Link from 'next/link';

export const metadata = {
  title: 'رزرو هتل | آتاش تراول',
  description: 'رزرو هتل‌های ۳ تا ۵ ستاره در سراسر جهان با بهترین قیمت',
};

export default function HotelsPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              <span>🏨</span>
              رزرو هتل
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              رزرو <span className="gradient-text">هتل</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              رزرو هتل‌های ۳ تا ۵ ستاره در سراسر جهان با بهترین قیمت
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://wa.me/989128637309"
                className="btn btn-primary btn-lg"
              >
                مشاوره رایگان
              </a>
              <Link href="/tours" className="btn btn-outline btn-lg">
                مشاهده تورها
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              برای رزرو هتل با تیم ما تماس بگیرید
            </p>
            <a
              href="https://wa.me/989128637309"
              className="btn btn-primary btn-lg"
            >
              تماس با مشاور
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container-custom text-center">
          <p>© {new Date().getFullYear()} آتاش تراول — تمامی حقوق محفوظ است</p>
        </div>
      </footer>
    </div>
  );
}
