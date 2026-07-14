import Header from '@/components/header';
import Link from 'next/link';

export const metadata = {
  title: 'اخذ ویزا | آتاش تراول',
  description: 'راهنمایی کامل و اخذ ویزا برای تمام کشورها',
};

const VISA_SERVICES = [
  'ویزای توریستی',
  'ویزای کاری',
  'ویزای تحصیلی',
  'راهنمایی مدارک',
];

export default function VisaPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              <span>✈️</span>
              خدمات ویزا
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              اخذ <span className="gradient-text">ویزا</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              راهنمایی کامل و اخذ ویزا برای تمام کشورها با تیم متخصص
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              خدمات ویزای ما
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {VISA_SERVICES.map((service) => (
                <div key={service} className="card p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900">{service}</h3>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-8">
                برای مشاوره و اخذ ویزا با ما تماس بگیرید
              </p>
              <a
                href="https://wa.me/989128637309"
                className="btn btn-primary btn-lg"
              >
                مشاوره رایگان
              </a>
            </div>
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
