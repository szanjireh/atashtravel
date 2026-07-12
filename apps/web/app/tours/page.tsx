import { Metadata } from 'next';
import Header from '@/components/header';
import TourCard from '@/components/tours/TourCard';
import { toursData } from '@/data/tours';

export const metadata: Metadata = {
  title: 'تورهای خارجی | رزرو تور ترکیه و دبی | آتاش تراول',
  description: 'رزرو تور وان، آنتالیا، استانبول و ترابزون با بهترین قیمت و خدمات گردشگری از آتاش تراول.',
  keywords: ['تور خارجی', 'تور ترکیه', 'تور وان', 'تور آنتالیا', 'تور استانبول', 'تور ترابزون', 'رزرو تور', 'آتاش تراول'],
  openGraph: {
    title: 'تورهای خارجی | رزرو تور ترکیه و دبی | آتاش تراول',
    description: 'رزرو تور وان، آنتالیا، استانبول و ترابزون با بهترین قیمت و خدمات گردشگری از آتاش تراول.',
    type: 'website',
    locale: 'fa_IR',
  },
  alternates: {
    canonical: 'https://atashtravel.com/tours',
  },
};

export default function ToursPage() {
  // Get all tours as array
  const tours = Object.values(toursData);

  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Dynamic Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-[800px] left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section className="relative px-6 pb-16 pt-32 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
              تورهای گردشگری
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              تورهای آتاش تراول
            </h1>

            {/* Description */}
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              رزرو بهترین تورهای خارجی با خدمات کامل، هتل، پرواز و پشتیبانی حرفه‌ای. تجربه سفری بی‌نظیر با برنامه‌ریزی دقیق و قیمت مناسب.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/989128637309"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                مشاوره رایگان
              </a>

              <a
                href="tel:+989128637309"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-lg transition-all duration-200 hover:bg-white/20 hover:scale-[1.02] active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                تماس تلفنی
              </a>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="px-6 pb-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">۴+</div>
                <div className="text-sm text-slate-400">مقصد گردشگری</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">۵۰۰۰+</div>
                <div className="text-sm text-slate-400">مسافر راضی</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">۱۰+</div>
                <div className="text-sm text-slate-400">سال تجربه</div>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">۲۴/۷</div>
                <div className="text-sm text-slate-400">پشتیبانی</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tours Grid */}
        <section className="px-6 pb-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                تورهای فعال
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl">
                مقصدهای محبوب را کشف کنید و سفر رویایی خود را با بهترین قیمت و خدمات رزرو کنید.
              </p>
            </div>

            {/* Tours Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {tours.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </div>

            {/* Empty State (if no tours) */}
            {tours.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/50 mb-4">
                  <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-slate-400 text-lg">در حال حاضر توری موجود نیست</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="px-6 pb-24 sm:px-8 lg:px-10 bg-gradient-to-b from-transparent to-white/[0.02]">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl bg-gradient-to-br from-cyan-500/10 to-sky-500/5 border border-cyan-500/20 p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  چرا آتاش تراول؟
                </h2>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  تجربه سفری بی‌نظیر با برنامه‌ریزی دقیق و پشتیبانی حرفه‌ای
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-500/20 text-cyan-400 mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">مجوز رسمی</h3>
                  <p className="text-slate-400 text-sm">دارای مجوز رسمی گردشگری</p>
                </div>

                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-500/20 text-cyan-400 mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">بهترین قیمت</h3>
                  <p className="text-slate-400 text-sm">تضمین بهترین نرخ بازار</p>
                </div>

                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-500/20 text-cyan-400 mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">پشتیبانی ۲۴/۷</h3>
                  <p className="text-slate-400 text-sm">همیشه در کنار شما هستیم</p>
                </div>

                <div className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-cyan-500/20 text-cyan-400 mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">ویزا و مدارک</h3>
                  <p className="text-slate-400 text-sm">راهنمایی کامل اخذ ویزا</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 pb-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 border border-cyan-500/30 p-8 md:p-12 text-center">
              {/* Background Decoration */}
              <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/30 to-transparent blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tl from-sky-500/30 to-transparent blur-3xl" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  سفر رویایی خود را شروع کنید
                </h2>
                <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                  تیم ما آماده است تا بهترین تور را متناسب با نیاز شما طراحی کند
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/989128637309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/30"
                  >
                    رزرو آنلاین
                  </a>
                  
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-lg transition-all duration-200 hover:bg-white/20 hover:scale-[1.02] active:scale-95"
                  >
                    تماس با ما
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#030712]/80 backdrop-blur-md py-12 px-6 sm:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-slate-400">
              © {new Date().getFullYear()} آتاش تراول. تمامی حقوق محفوظ است.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
