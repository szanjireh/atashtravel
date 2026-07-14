import type { Metadata } from 'next';
import Header from '@/components/header';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'درباره ما | آتاش تراول',
  description: 'آتاش تراول با بیش از ۱۰ سال تجربه در صنعت گردشگری، ارائه دهنده بهترین تورهای خارجی',
};

const STATS = [
  { value: '+۵۰۰۰', label: 'مسافر راضی' },
  { value: '+۱۰', label: 'سال تجربه' },
  { value: '+۳۰', label: 'مقصد فعال' },
  { value: '۹۸٪', label: 'رضایت مشتریان' },
];

const VALUES = [
  {
    title: 'اعتماد و شفافیت',
    description: 'شفافیت کامل در قیمت‌گذاری و خدمات بدون هیچ هزینه پنهان',
  },
  {
    title: 'کیفیت برتر',
    description: 'انتخاب بهترین هتل‌ها و پروازها با استانداردهای جهانی',
  },
  {
    title: 'تخصص و تجربه',
    description: 'بیش از یک دهه تجربه در برگزاری تورهای خارجی',
  },
  {
    title: 'پشتیبانی ۲۴/۷',
    description: 'تیم حرفه‌ای در تمام مراحل سفر در کنار شما',
  },
];

export default function AboutPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              <span>🏢</span>
              درباره آتاش تراول
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              همراه شما در سفری <span className="gradient-text">بی‌نظیر</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              آتاش تراول با بیش از ۱۰ سال تجربه، ارائه‌دهنده بهترین تورهای خارجی با کیفیت بالا و قیمت مناسب
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                <span>🎯</span>
                ماموریت ما
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                خلق تجربه‌ای ماندگار
              </h2>
              <p className="text-gray-600 leading-relaxed">
                ماموریت ما ایجاد تجربه‌های سفر بی‌نظیر و خاطره‌انگیز برای مسافران ایرانی است. 
                ما می‌خواهیم با ارائه خدمات حرفه‌ای و شفاف، سفر به خارج از کشور را برای همه آسان و لذت‌بخش کنیم.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                <span>🔭</span>
                چشم‌انداز ما
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                پیشرو در صنعت گردشگری
              </h2>
              <p className="text-gray-600 leading-relaxed">
                هدف ما تبدیل شدن به برترین و معتبرترین آژانس گردشگری ایران با ارائه خدمات نوآورانه، 
                استانداردهای بین‌المللی و رضایت ۱۰۰٪ مشتریان است.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              ارزش‌های ما
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اصولی که ما را متمایز می‌کند
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <div key={value.title} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              آماده برای شروع سفر خود هستید؟
            </h2>
            <p className="text-xl text-blue-100">
              همین حالا با ما تماس بگیرید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/989128637309"
                className="btn btn-primary btn-lg bg-white text-blue-600 hover:bg-blue-50"
              >
                مشاوره رایگان
              </a>
              <Link href="/tours" className="btn btn-outline btn-lg border-white text-white hover:bg-white/10">
                مشاهده تورها
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container-custom text-center">
          <p>© {new Date().getFullYear()} آتاش تراول — تمامی حقوق محفوظ است</p>
        </div>
      </footer>
    </div>
  );
}
