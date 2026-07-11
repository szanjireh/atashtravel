'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock, DollarSign } from 'lucide-react';
import Header from '@/components/header';

// Mock search data - Replace with API call if needed
const searchableContent = {
  'تور وان': {
    title: 'تور وان',
    slug: 'van',
    type: 'tour',
    image: '/images/van.jpg',
    location: 'ترکیه',
    description: 'خرید، تفریح و طبیعت بکر در نزدیکی مرز ایران و ترکیه',
    duration: '۳ شب | ۴ روز',
    price: '۴۵۰$',
  },
  'تور آنتالیا': {
    title: 'تور آنتالیا',
    slug: 'antalya',
    type: 'tour',
    image: '/images/antalya.jpg',
    location: 'ترکیه',
    description: 'ساحل آبی مدیترانه، هتل‌های لوکس و تفریحات دریایی',
    duration: '۶ شب | ۷ روز',
    price: '۷۵۰$',
  },
  'جشن آب ارمنستان': {
    title: 'جشن آب ارمنستان',
    slug: 'armenia-water',
    type: 'tour',
    image: '/images/armenia-water.jpg',
    location: 'ارمنستان',
    description: 'تجربه جشنواره وارداوار؛ شادترین رویداد تابستانی قفقاز',
    duration: '۴ شب | ۵ روز',
    price: '۵۵۰$',
  },
  'بلیط هواپیما': {
    title: 'رزرو بلیط هواپیما',
    slug: 'flights',
    type: 'service',
    description: 'رزرو بلیط هواپیما داخلی و خارجی با بهترین قیمت',
  },
  'رزرو هتل': {
    title: 'رزرو هتل',
    slug: 'hotels',
    type: 'service',
    description: 'رزرو هتل‌های معتبر در سراسر جهان با گارانتی بهترین قیمت',
  },
  'بیمه مسافرتی': {
    title: 'بیمه مسافرتی',
    slug: 'insurance',
    type: 'service',
    description: 'بیمه مسافرتی جامع بین‌المللی برای تمام سفرهای خارجی',
  },
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Search through content
  const results = Object.entries(searchableContent).filter(
    ([key, value]) =>
      key.includes(query) ||
      value.title.includes(query) ||
      value.description.includes(query)
  );

  return (
    <div className="relative min-h-screen bg-[#030712]" dir="rtl">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Search Results */}
        <div className="px-6 py-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            {/* Search Header */}
            <div className="mb-12 space-y-3">
              <h1 className="text-3xl font-black text-white sm:text-4xl">
                نتایج جستجو
              </h1>
              <p className="text-slate-400">
                برای:
                <span className="ml-2 font-semibold text-cyan-400">"{query}"</span>
                {results.length > 0 && (
                  <span className="ml-2 text-slate-300">
                    ({results.length} نتیجه)
                  </span>
                )}
              </p>
            </div>

            {results.length > 0 ? (
              <>
                {/* Tours Results */}
                {results.some(([_, value]) => value.type === 'tour') && (
                  <div className="mb-16">
                    <h2 className="mb-6 text-2xl font-bold text-white">تورهای موجود</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {results
                        .filter(([_, value]) => value.type === 'tour')
                        .map(([key, tour]) => (
                          <Link
                            key={key}
                            href={`/tours/${tour.slug}`}
                            className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/30 hover:bg-slate-900/40 shadow-xl"
                          >
                            {tour.image && (
                              <div className="relative h-64 overflow-hidden bg-slate-900">
                                <Image
                                  src={tour.image}
                                  alt={tour.title}
                                  fill
                                  className="object-cover transition duration-500 group-hover:scale-105"
                                />
                              </div>
                            )}
                            <div className="flex-1 flex flex-col justify-between p-6 space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                                  <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {tour.location}
                                  </span>
                                  <span className="inline-flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {tour.duration}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">
                                  {tour.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                                  {tour.description}
                                </p>
                              </div>
                              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                                <span className="inline-flex items-center gap-1.5 text-slate-400">
                                  <DollarSign className="h-3.5 w-3.5" />
                                  <strong className="text-base font-black text-white">
                                    {tour.price}
                                  </strong>
                                </span>
                                <span className="font-bold text-cyan-400 inline-flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">
                                  جزئیات بیشتر
                                  <ArrowRight className="h-4 w-4" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}

                {/* Services Results */}
                {results.some(([_, value]) => value.type === 'service') && (
                  <div>
                    <h2 className="mb-6 text-2xl font-bold text-white">خدمات</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {results
                        .filter(([_, value]) => value.type === 'service')
                        .map(([key, service]) => (
                          <Link
                            key={key}
                            href="#"
                            className="group rounded-2xl border border-white/10 bg-slate-900/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-900/50"
                          >
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                            <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                              جزئیات بیشتر
                              <ArrowRight className="h-4 w-4 group-hover:translate-x-[-4px] transition-transform" />
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-slate-900/30 backdrop-blur-xl p-12 text-center space-y-4">
                <h2 className="text-2xl font-bold text-white">نتیجه‌ای یافت نشد</h2>
                <p className="text-slate-400 max-w-md mx-auto">
                  برای "{query}" نتیجه‌ای موجود نیست. لطفاً جستجو با کلیدواژه‌های دیگری را امتحان کنید.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-semibold transition-all hover:opacity-95"
                >
                  بازگشت به صفحه اصلی
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
