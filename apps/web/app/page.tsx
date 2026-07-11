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
          <div className="mx