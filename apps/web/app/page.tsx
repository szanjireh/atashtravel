'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'خانه', href: '#home' },
  { label: 'تورها', href: '#tours' },
  { label: 'خدمات', href: '#services' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '#contact' },
];

const HERO_STATS = [
  { value: '+۵۰۰۰', label: 'مسافر راضی' },
  { value: '+۱۰', label: 'سال تجربه' },
  { value: '+۳۰', label: 'مقصد فعال' },
];

const FEATURED_TOURS = [
  {
    slug: 'van',
    title: 'تور وان',
    description: 'خرید، تفریح و طبیعت بکر در نزدیکی مرز ایران و ترکیه',
    location: 'ترکیه',
    flag: '🇹🇷',
    duration: '۳ شب | ۴ روز',
    price: '۴۵۰$',
    badge: 'داغ',
    badgeType: 'danger',
  },
  {
    slug: 'antalya',
    title: 'تور آنتالیا',
    description: 'ساحل آبی مدیترانه، هتل‌های لوکس و تفریحات دریایی',
    location: 'ترکیه',
    flag: '🇹🇷',
    duration: '۶ شب | ۷ روز',
    price: '۷۵۰$',
    badge: 'پرواز + هتل',
    badgeType: 'gold',
  },
  {
    slug: 'armenia-water',
    title: 'جشن آب ارمنستان',
    description: 'تجربه جشنواره وارداوار؛ شادترین رویداد تابستانی قفقاز',
    location: 'ارمنستان',
    flag: '🇦🇲',
    duration: '۴ شب | ۵ روز',
    price: '۵۵۰$',
    badge: 'رویداد ویژه',
    badgeType: 'info',
  },
];

const VALUES = [
  {
    title: 'مجوز رسمی',
    desc: 'دارای مجوز رسمی گردشگری و عضو انجمن آژانس‌های مسافرتی ایران',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    title: 'بهترین قیمت',
    desc: 'ضمانت بهترین نرخ با شفافیت کامل در اعلام هزینه‌ها و بدون هزینه پنهان',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'پشتیبانی ۲۴/۷',
    desc: 'تیم پشتیبانی ما در تمام لحظات سفر کنار شماست و آماده پاسخگویی است',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    title: 'ویزا و مدارک',
    desc: 'راهنمایی کامل برای اخذ ویزا، آماده‌سازی مدارک و انجام تشریفات گمرکی',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
];

const SERVICES = [
  'رزرو بلیط هواپیما داخلی و خارجی',
  'رزرو هتل با بهترین قیمت تضمینی',
  'تور گروهی و اختصاصی (VIP)',
  'اخذ ویزا و راهنمایی مدارک',
  'ترنسفر فرودگاهی شاتل',
  'بیمه مسافرتی جامع بین‌المللی',
];

const CONTACTS = [
  { title: 'واتساپ', text: '+۹۸ ۹۱۲ ۸۶۳ ۷۳۰۹', link: 'https://wa.me/989128637309', type: 'whatsapp', cta: 'ارسال پیام' },
  { title: 'تلگرام', text: '@atashtravel', link: 'https://t.me/atashtravel', type: 'telegram', cta: 'مشاوره فوری' },
  { title: 'اینستاگرام', text: '@atashtravel', link: 'https://instagram.com/atashtravel', type: 'instagram', cta: 'دنبال کنید' },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Dynamic Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-[1200px] left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />

      <div className="relative z-10">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md transition-all duration-300">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
            <Link href="/" className="flex items-center gap-3.5 text-xl font-bold text-white tracking-tight group">
              <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-[1px] ring-1 ring-white/10 shadow-xl transition-transform duration-300 group-hover:scale-105">
                <div className="relative h-full w-full bg-slate-950 rounded-2xl overflow-hidden">
                  <Image src="/images/logo2.png" alt="آتاش تراول" fill className="object-cover" priority />
                </div>
              </div>
              <span className="bg-gradient-to-l from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">آتاش تراول</span>
            </Link>

            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-cyan-400 relative py-1 after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full">
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-200 transition-all hover:bg-slate-800 md:hidden"
              aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={isMenuOpen}
            >
              <span className="flex h-4 w-5 flex-col justify-between">
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full border-b border-white/5 bg-[#030712]/95 backdrop-blur-lg px-6 py-5 sm:px-8 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
              <div className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3 text-slate-300 transition-all hover:bg-cyan-500/10 hover:text-cyan-400">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section id="home" className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 rounded-full bg-cyan-500/10 px-4 py-1.5 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/20 backdrop-blur-sm animate-fade-in">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20">✈</span>
                تجربه سفر متفاوت با پشتیبانی VIP
              </div>

              <div className="space-y-6">
                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-6xl sm:leading-[1.15]">
                  سفر به <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">رویاهایت</span> را از همین امروز شروع کن
                </h1>
                <p className="max-w-xl text-slate-400 text-base sm:text-lg leading-relaxed font-light">
                  آتاش تراول با بیش از یک دهه تجربه، بهترین تورهای خارجی را با برنامه‌ریزی دقیق، قیمت مناسب و پشتیبانی ۲۴ ساعته برای شما فراهم می‌کند.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#tours" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-7 py-4 text-sm font-semibold text-slate-950 transition-all duration-200 hover:opacity-95 shadow-lg shadow-cyan-500/10 hover:scale-[1.02] active:scale-[0.98]">
                  مشاهده تورهای فعال
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-7 py-4 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-cyan-500/40 hover:bg-cyan-500/[0.02] hover:scale-[1.02] active:scale-[0.98]">
                  مشاوره رایگان سفر
                </a>
              </div>

              {/* Stats Layout */}
              <div className="grid gap-4 grid-cols-3 max-w-lg pt-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center backdrop-blur-sm transition-colors duration-300 hover:border-white/10">
                    <p className="text-xl sm:text-2xl font-black bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Interactive Showcase Card */}
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-b from-cyan-500/20 to-transparent opacity-30 blur-2xl transition-opacity group-hover:opacity-40" />
              <div className="relative rounded-[2.2rem] bg-gradient-to-b from-white/10 to-white/5 p-3 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
                <div className="relative h-[380px] sm:h-[460px] overflow-hidden rounded-[1.8rem] bg-slate-950 shadow-inner">
                  <Image src="/images/hero.jpg" alt="سفر به مقاصد رویایی" fill className="object-cover transition duration-700 group-hover:scale-105" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                  
                  {/* Floating Overlay Content Inside Image Container */}
                  <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-8 text-slate-300 space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">پیشنهاد ویژه فصل</p>
                    <h2 className="text-2xl font-extrabold text-white sm:text-3xl">آنتالیا، ساحل و تجربه لوکس</h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md font-light">
                      هفت شب کامل با هتل‌های لوکس ۵ ستاره تماماً یوآل (UALL) و برنامه تفریحی سفارشی برای یک سفر فراموش‌نشدنی.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tours Section */}
        <section id="tours" className="px-6 py-24 sm:px-8 lg:px-10 border-t border-white/5 bg-gradient-to-b from-transparent to-slate-950/40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">لیست جذاب‌ترین تورها</span>
                <h2 className="text-3xl font-black text-white sm:text-4xl">محبوب‌ترین مقصدهای گردشگری</h2>
              </div>
              <p className="max-w-md text-sm text-slate-400 leading-relaxed font-light">
                بهترین تورهای منتخب را بررسی کنید و سفر رویایی خود را با خیالی آسوده و تضمین بالاترین کیفیت برنامه‌ریزی کنید.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {FEATURED_TOURS.map((tour) => (
                <Link
                  key={tour.slug}
                  href={`/tours/${tour.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/30 hover:bg-slate-900/40 shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden bg-slate-900">
                    <Image src={`/images/${tour.slug}.jpg`} alt={tour.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute right-4 top-4 rounded-xl bg-slate-950/80 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-cyan-400 ring-1 ring-white/10">
                      {tour.badge}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span className="inline-flex items-center gap-1.5"><span className="text-base">{tour.flag}</span> {tour.location}</span>
                        <span className="text-slate-500">{tour.duration}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">{tour.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">{tour.description}</p>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-400">شروع قیمت از: <strong className="text-base font-black text-white px-1">{tour.price}</strong></span>
                      <span className="font-bold text-cyan-400 inline-flex items-center gap-1 group-hover:translate-x-[-4px] transition-transform">جزئیات بیشتر ←</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services Showcase */}
        <section id="services" className="px-6 py-24 sm:px-8 lg:px-10 bg-slate-950/40">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-8 rounded-[2.2rem] border border-white/5 bg-slate-900/20 p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
              <span className="inline-flex rounded-full bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-400 ring-1 ring-cyan-500/20">پوشش جامع خدمات</span>
              <div className="space-y-4">
                <h2 className="text-3xl font-black text-white sm:text-4xl">همه چیز برای یک سفر بی‌نقص آماده است</h2>
                <p className="text-sm text-slate-400 leading-relaxed font-light">
                  از لحظه تصمیم‌گیری تا بازگشت به خانه، ما جزئیات سفر شما را با دقت بالا، تکیه بر استانداردهای جهانی و آرامش کامل برنامه‌ریزی می‌کنیم.
                </p>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {SERVICES.map((service) => (
                  <div key={service} className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3.5 text-xs font-medium text-slate-300 transition-colors duration-200 hover:border-cyan-500/20 hover:bg-slate-900/60">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    {service}
                  </div>
                ))}
              </div>
              <a href="#contact" className="inline-flex w-full sm:w-auto justify-center rounded-2xl bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:scale-[1.01]">
                درخواست مشاوره رایگان
              </a>
            </div>
            
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/5 bg-slate-900/30 p-3 shadow-2xl group">
              <div className="relative h-[400px] overflow-hidden rounded-[1.8rem] bg-slate-950">
                <Image src="/images/antalya.jpg" alt="خدمات آتاش تراول" fill className="object-cover transition duration-700 group-hover:scale-103" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Values */}
        <section id="why-us" className="px-6 py-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 space-y-3 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">چرا آتاش تراول؟</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">سفر با اطمینان و امنیت کامل</h2>
              <p className="mx-auto max-w-xl text-sm text-slate-400 leading-relaxed font-light">
                خدمات سفارشی اختصاصی، پشتیبانی همه‌جانبه ۲۴ ساعته و تجربه سفری ایمن و بدون دغدغه را با ما تجربه کنید.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {VALUES.map((item) => (
                <div key={item.title} className="group rounded-[2rem] border border-white/5 bg-slate-900/10 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/20 hover:bg-slate-900/30">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/10 transition-transform duration-300 group-hover:scale-110">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-2.5 text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section id="contact" className="px-6 pb-24 pt-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-slate-900/40 to-slate-900/10 p-8 sm:p-12 shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
            
            <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center relative z-10">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">ارتباط با آژانس</span>
                <h2 className="text-3xl font-black text-white sm:text-4xl">آماده‌ایم تا سفر ایده آل شما را بسازیم</h2>
                <p className="max-w-xl text-sm text-slate-400 leading-relaxed font-light">
                  هم‌اکنون برای دریافت آفرهای لحظه آخری و مشاوره رایگان با کارشناسان با ما تماس بگیرید. پشتیبانی مجرب ما در تمام پلتفرم‌ها آماده پاسخگویی است.
                </p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-6 shadow-inner text-right space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">شماره تماس مستقیم خط ویژه</p>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-wide" dir="ltr">+۹۸ ۹۱۲ ۸۶۳ ۷۳۰۹</p>
                <p className="text-xs text-slate-500">پاسخگویی سریع در تلگرام، واتساپ و اینستاگرام</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3 relative z-10">
              {CONTACTS.map((contact) => (
                <a
                  key={contact.title}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/5 bg-slate-950/40 p-5 shadow-sm transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-950/80 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{contact.title}</div>
                    <p className="text-xs text-slate-400" dir="ltr">{contact.text}</p>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                    {contact.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-[-3px]">←</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#030712] px-6 py-10 text-slate-500 text-xs sm:px-8 lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between">
            <p className="font-light">© ۱۴۰۵ آتاش تراول — تمامی حقوق مادی و معنوی محفوظ است.</p>
            <p className="text-slate-400 font-medium">طراحی شده برای سفرهای لوکس و بی‌دغدغه</p>
          </div>
        </footer>
      </div>
    </main>
  );
}