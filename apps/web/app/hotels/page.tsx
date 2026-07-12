import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'رزرو هتل | آتاش تراول',
  description: 'رزرو آنلاین هتل‌های ۳ تا ۵ ستاره در بهترین مقاصد گردشگری جهان با قیمت مناسب و تضمین کیفیت',
  keywords: 'رزرو هتل, هتل خارجی, هتل ترکیه, هتل دبی, هتل ارمنستان, قیمت هتل, رزرو آنلاین هتل',
  openGraph: {
    title: 'رزرو هتل | آتاش تراول',
    description: 'رزرو آنلاین هتل‌های ۳ تا ۵ ستاره در بهترین مقاصد گردشگری جهان با قیمت مناسب و تضمین کیفیت',
    type: 'website',
    locale: 'fa_IR',
  },
};

const HOTEL_CATEGORIES = [
  {
    title: 'هتل‌های لوکس ۵ ستاره',
    description: 'اقامت در بهترین و لوکس‌ترین هتل‌های جهان با تمامی امکانات رفاهی',
    emoji: '⭐',
    color: 'from-amber-500 to-yellow-500',
  },
  {
    title: 'هتل‌های ۴ ستاره',
    description: 'هتل‌های مدرن با استانداردهای عالی و قیمت مناسب',
    emoji: '🏨',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'هتل‌های ساحلی',
    description: 'اقامت در کنار ساحل با دسترسی مستقیم به دریا',
    emoji: '🏖️',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    title: 'هتل‌های بوتیک',
    description: 'هتل‌های کوچک با طراحی منحصر به فرد و خدمات اختصاصی',
    emoji: '🎨',
    color: 'from-purple-500 to-pink-500',
  },
];

const FEATURED_HOTELS = [
  {
    name: 'هتل رویال وینگز آنتالیا',
    location: 'آنتالیا، ترکیه',
    flag: '🇹🇷',
    stars: 5,
    rating: '۹.۲',
    type: 'تمام شامل (Ultra All Inclusive)',
    amenities: ['استخر بزرگ', 'ساحل اختصاصی', 'اسپا و ماساژ', 'رستوران‌های متنوع'],
    price: '۱۸۰$',
    priceNote: 'هر شب',
    image: 'antalya',
  },
  {
    name: 'هتل متروپل پالاس ایروان',
    location: 'ایروان، ارمنستان',
    flag: '🇦🇲',
    stars: 5,
    rating: '۹.۰',
    type: 'لوکس (Luxury)',
    amenities: ['مرکز شهر', 'رستوران گورمه', 'سالن ورزشی', 'روف‌تاپ بار'],
    price: '۱۲۰$',
    priceNote: 'هر شب',
    image: 'armenia-water',
  },
  {
    name: 'هتل گرند ویزیر استانبول',
    location: 'استانبول، ترکیه',
    flag: '🇹🇷',
    stars: 5,
    rating: '۸.۹',
    type: 'بوتیک',
    amenities: ['نزدیک به تقسیم', 'سبک عثمانی', 'تراس بام', 'صبحانه بوفه'],
    price: '۹۵$',
    priceNote: 'هر شب',
    image: 'van',
  },
  {
    name: 'هتل ددمان آنتالیا',
    location: 'آنتالیا، ترکیه',
    flag: '🇹🇷',
    stars: 4,
    rating: '۸.۷',
    type: 'ساحلی',
    amenities: ['ساحل خصوصی', 'اتاق‌های دریا', 'پارک آبی', 'کلوپ کودک'],
    price: '۱۱۰$',
    priceNote: 'هر شب',
    image: 'antalya',
  },
  {
    name: 'هتل رادیسون وان',
    location: 'وان، ترکیه',
    flag: '🇹🇷',
    stars: 4,
    rating: '۸.۵',
    type: 'شهری',
    amenities: ['نزدیک مرکز خرید', 'رستوران', 'پارکینگ رایگان', 'وای‌فای'],
    price: '۷۰$',
    priceNote: 'هر شب',
    image: 'van',
  },
  {
    name: 'هتل کنراد دبی',
    location: 'دبی، امارات',
    flag: '🇦🇪',
    stars: 5,
    rating: '۹.۴',
    type: 'لوکس',
    amenities: ['برج خلیفه', 'استخر بام', 'اسپای لوکس', 'رستوران‌های معتبر'],
    price: '۲۵۰$',
    priceNote: 'هر شب',
    image: 'antalya',
  },
];

const BOOKING_ADVANTAGES = [
  {
    title: 'بهترین قیمت تضمینی',
    description: 'با ارتباط مستقیم با هتل‌ها، پایین‌ترین نرخ را برای شما تضمین می‌کنیم',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'رزرو فوری و تایید سریع',
    description: 'رزرو شما ظرف چند دقیقه تایید و واچر به ایمیل شما ارسال می‌شود',
    icon: 'M5 13l4 4L19 7',
  },
  {
    title: 'پشتیبانی ۲۴/۷',
    description: 'در صورت بروز هرگونه مشکل در طول اقامت، پشتیبانی ۲۴ ساعته در دسترس است',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    title: 'امکان کنسلی رایگان',
    description: 'بسیاری از هتل‌ها امکان کنسلی رایگان تا چند روز قبل از ورود را دارند',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
];

const POPULAR_DESTINATIONS = [
  { city: 'آنتالیا', country: 'ترکیه', hotels: '+۲۵۰', flag: '🇹🇷' },
  { city: 'استانبول', country: 'ترکیه', hotels: '+۴۰۰', flag: '🇹🇷' },
  { city: 'دبی', country: 'امارات', hotels: '+۳۰۰', flag: '🇦🇪' },
  { city: 'ایروان', country: 'ارمنستان', hotels: '+۱۵۰', flag: '🇦🇲' },
  { city: 'تفلیس', country: 'گرجستان', hotels: '+۱۲۰', flag: '🇬🇪' },
  { city: 'کوالالامپور', country: 'مالزی', hotels: '+۲۰۰', flag: '🇲🇾' },
];

export default function HotelsPage() {
  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans">
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-[1200px] left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="px-6 pb-16 pt-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/20">
                <span className="text-xl">🏨</span>
                رزرو هتل
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                رزرو <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">بهترین هتل‌ها</span> در سراسر جهان
              </h1>
              <p className="mx-auto max-w-3xl text-base text-slate-400 leading-relaxed sm:text-lg">
                از هتل‌های لوکس ۵ ستاره تا اقامتگاه‌های اقتصادی، بیش از ۱۰۰۰ هتل در بهترین مقاصد گردشگری 
                جهان را با قیمت مناسب و تضمین کیفیت رزرو کنید.
              </p>
            </div>
          </div>
        </section>

        {/* Hotel Search Section */}
        <section className="px-6 py-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[2rem] border border-white/5 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="mb-6 space-y-2">
                <h2 className="text-2xl font-black text-white">جستجوی هتل</h2>
                <p className="text-sm text-slate-400">مقصد و تاریخ سفر خود را انتخاب کنید</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <label className="text-sm font-medium text-slate-300">مقصد</label>
                  <input
                    type="text"
                    placeholder="شهر یا کشور"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">تاریخ ورود</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">تاریخ خروج</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">تعداد مسافر</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="2"
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              </div>

              <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-4 text-sm font-semibold text-slate-950 transition-all hover:opacity-95 hover:scale-[1.01] shadow-lg shadow-cyan-500/20">
                جستجوی هتل
              </button>
            </div>
          </div>
        </section>

        {/* Hotel Categories */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">دسته‌بندی هتل‌ها</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">انتخاب بر اساس نوع اقامت</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {HOTEL_CATEGORIES.map((category) => (
                <div key={category.title} className="group rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/40 cursor-pointer">
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${category.color} text-3xl`}>
                    {category.emoji}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{category.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Hotels */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 bg-slate-950/40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">پیشنهاد ویژه</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">هتل‌های منتخب</h2>
              <p className="text-slate-400 leading-relaxed">
                بهترین هتل‌ها با بالاترین کیفیت خدمات و امتیازات عالی
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {FEATURED_HOTELS.map((hotel) => (
                <div key={hotel.name} className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/30 hover:bg-slate-900/40 shadow-xl">
                  <div className="relative h-56 overflow-hidden bg-slate-900">
                    <Image
                      src={`/images/${hotel.image}.jpg`}
                      alt={hotel.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute right-4 top-4 flex gap-2">
                      <div className="rounded-xl bg-slate-950/80 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-amber-400 ring-1 ring-white/10">
                        {'⭐'.repeat(hotel.stars)}
                      </div>
                      <div className="rounded-xl bg-green-500/90 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-white ring-1 ring-white/10">
                        {hotel.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <span className="text-base">{hotel.flag}</span>
                        <span>{hotel.location}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-xs text-cyan-400 font-medium">{hotel.type}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-400">امکانات:</p>
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity) => (
                          <span key={amenity} className="rounded-lg bg-slate-950/60 px-2 py-1 text-xs text-slate-300">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400">شروع قیمت از</p>
                        <p className="text-2xl font-black text-white">{hotel.price}</p>
                        <p className="text-xs text-slate-500">{hotel.priceNote}</p>
                      </div>
                      <button className="rounded-xl bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-400 ring-1 ring-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                        رزرو
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">مقاصد محبوب</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">هتل در محبوب‌ترین شهرها</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {POPULAR_DESTINATIONS.map((dest) => (
                <div key={dest.city} className="group rounded-2xl border border-white/5 bg-slate-900/20 p-5 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/40 cursor-pointer">
                  <div className="mb-3 text-4xl">{dest.flag}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{dest.city}</h3>
                  <p className="text-xs text-slate-400 mb-2">{dest.country}</p>
                  <p className="text-xs font-bold text-cyan-400">{dest.hotels} هتل</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Advantages */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 bg-slate-950/40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">مزایای رزرو</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">چرا از ما رزرو کنید؟</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {BOOKING_ADVANTAGES.map((advantage) => (
                <div key={advantage.title} className="rounded-[2rem] border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/10">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={advantage.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white">{advantage.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 pb-24 pt-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-cyan-500/10 to-sky-500/5 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-md">
              <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
              
              <div className="relative z-10 space-y-6">
                <div className="text-4xl">🎯</div>
                <h2 className="text-3xl font-black text-white sm:text-4xl">هتل مورد نظرتان را پیدا نکردید؟</h2>
                <p className="mx-auto max-w-xl text-slate-400 leading-relaxed">
                  کارشناسان ما آماده‌اند تا بهترین پیشنهاد را متناسب با بودجه و نیاز شما ارائه دهند. 
                  همین حالا با ما تماس بگیرید.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-4 text-sm font-semibold text-slate-950 transition-all hover:opacity-95 hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
                  >
                    تماس با ما
                  </Link>
                  <a
                    href="https://wa.me/989128637309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/[0.02] hover:scale-[1.02]"
                  >
                    <span>💬</span>
                    واتساپ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
