'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// --- DATA STRUCTURES ---
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
    badgeType: 'danger'
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
    badgeType: 'gold'
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
    badgeType: 'info'
  }
];

const VALUES = [
  { title: 'مجوز رسمی', desc: 'دارای مجوز رسمی گردشگری و عضو انجمن آژانس‌های مسافرتی ایران', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { title: 'بهترین قیمت', desc: 'ضمانت بهترین نرخ با شفافیت کامل در اعلام هزینه‌ها و بدون هزینه پنهان', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'پشتیبانی ۲۴/۷', desc: 'تیم پشتیبانی ما در تمام لحظات سفر کنار شماست و آماده پاسخگویی است', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
  { title: 'ویزا و مدارک', desc: 'راهنمایی کامل برای اخذ ویزا، آماده‌سازی مدارک و انجام تشریفات گمرکی', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
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
  { title: 'تلگرام', text: '@atashtravel', link: 'https://t.me/atashtravel', type: 'telegram', cta: 'پیام در تلگرام' },
  { title: 'اینستاگرام', text: '@atashtravel', link: 'https://instagram.com/atashtravel', type: 'instagram', cta: 'دنبال کنید' },
];

// --- COMPONENT ---
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main dir="rtl" className="site-wrapper">
      
      {/* HEADER */}
      <header className={`site-header ${isMenuOpen ? 'nav-active' : ''}`} id="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <Image 
              src="/images/logo2.png" 
              alt="لوگوی آتاش تراول" 
              width={48} 
              height={48} 
              className="brand-logo"
              priority
            />
            <span className="brand-name">آتاش تراول</span>
          </Link>
          
          <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} id="main-nav">
            {NAV_LINKS.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-nav" onClick={() => setIsMenuOpen(false)}>
              رزرو تور
            </a>
          </nav>
          
          <button 
            className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={isMenuOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <span className="hero-badge">
            <svg className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            تجربه سفر متفاوت
          </span>
          <h1 className="hero-title">
            سفر به <em>رویاهایت</em><br />را از اینجا شروع کن
          </h1>
          <p className="hero-subtitle">
            آتاش تراول با بیش از یک دهه تجربه، بهترین تورهای خارجی را<br />
            با قیمت مناسب و خدمات ویژه ارائه می‌دهد
          </p>
          <div className="hero-actions">
            <a href="#tours" className="btn btn-primary">مشاهده تورها</a>
            <a href="#contact" className="btn btn-ghost">مشاوره رایگان</a>
          </div>
          
          <div className="hero-stats">
            {HERO_STATS.map((stat, idx) => (
              <div key={idx} className="hero-stat-item">
                <div className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
                {idx < HERO_STATS.length - 1 && <div className="hero-stat-sep" />}
              </div>
            ))}
          </div>
        </div>
        <div className="scroll-hint"><span></span></div>
      </section>

      {/* TOURS */}
      <section className="section" id="tours">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">تورهای ویژه</span>
            <h2 className="section-title">محبوب‌ترین مقصدها</h2>
            <p className="section-sub">از بین بهترین تورها انتخاب کنید و سفر رویایی‌تان را آغاز نمایید</p>
          </div>
          
          <div className="tours-grid">
            {FEATURED_TOURS.map((tour) => (
              <Link key={tour.slug} href={`/tours/${tour.slug}`} className="tour-card">
                <div className="tour-img-wrap">
                  <Image 
                    src={`/images/${tour.slug}.jpg`} 
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="tour-image"
                  />
                  <span className={`tour-badge tour-badge--${tour.badgeType}`}>
                    {tour.badge}
                  </span>
                </div>
                <div className="tour-body">
                  <div className="tour-meta">
                    <span>{tour.flag} {tour.location}</span>
                    <span>{tour.duration}</span>
                  </div>
                  <h3>{tour.title}</h3>
                  <p>{tour.description}</p>
                  <div className="tour-footer">
                    <span className="tour-price">از <strong>{tour.price}</strong></span>
                    <span className="tour-arrow">جزئیات ←</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section why-section">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">چرا آتاش تراول؟</span>
            <h2 className="section-title">سفر با اطمینان کامل</h2>
          </div>
          <div className="why-grid">
            {VALUES.map((val, idx) => (
              <div key={idx} className="why-card">
                <div className="why-icon">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-md">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={val.icon} />
                  </svg>
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section" id="services">
        <div className="container services-inner">
          <div className="services-text">
            <span className="section-tag">خدمات ما</span>
            <h2 className="section-title">همه چیز برای سفر شما</h2>
            <p className="section-sub">از لحظه تصمیم‌گیری تا بازگشت، مدیریت سفر شما با ماست</p>
            <ul className="services-list">
              {SERVICES.map((srv, idx) => (
                <li key={idx}>
                  <span className="check">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-xs">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span> 
                  {srv}
                </li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-primary">درخواست مشاوره رایگان</a>
          </div>
          <div className="services-visual">
            <div className="image-overlay-wrapper">
              <Image 
                src="/images/antalya.jpg" 
                alt="خدمات جامع مسافرتی آتاش تراول" 
                fill
                sizes="(max-width: 992px) 100vw, 50vw"
                className="services-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">تماس با ما</span>
            <h2 className="section-title">آماده‌ایم تا کمک کنیم</h2>
            <p className="section-sub">همین الان با ما در ارتباط باشید و مشاوره رایگان دریافت کنید</p>
          </div>
          <div className="contact-grid">
            {CONTACTS.map((con, idx) => (
              <a 
                key={idx} 
                href={con.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`contact-card contact-card--${con.type}`}
              >
                <div className="contact-icon">
                  {con.type === 'whatsapp' && (
                    <svg fill="currentColor" viewBox="0 0 24 24" className="icon-md"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.454L0 24zm6.59-4.846c1.66.986 3.288 1.498 4.76 1.499 5.385 0 9.766-4.381 9.77-9.766.002-2.607-1.01-5.059-2.85-6.902-1.84-1.844-4.293-2.859-6.905-2.86-5.388 0-9.77 4.381-9.774 9.766-.001 1.83.49 3.626 1.419 5.197l-.992 3.622 3.71-.973zm8.42-3.666c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.149-.674.15-.199.299-.773.979-.948 1.178-.175.199-.35.224-.651.075-.3-.15-1.266-.467-2.41-1.487-.89-.794-1.49-1.775-1.665-2.074-.175-.3-.019-.461.13-.61.135-.133.301-.35.451-.524.149-.174.199-.299.301-.498.101-.2.05-.374-.025-.524-.075-.15-.674-1.622-.924-2.224-.244-.587-.493-.508-.674-.517-.175-.008-.375-.01-.575-.01-.2 0-.526.075-.802.374-.275.3-.1.723-.1.723s-.125.274-.025.798c.15.797.525 1.571.751 1.87.225.299 1.83 2.796 4.434 3.92.619.267 1.103.427 1.48.547.622.197 1.187.17 1.634.103.499-.075 1.78-.728 2.03-1.432.25-.704.25-1.307.175-1.432-.075-.124-.275-.199-.576-.349z"/></svg>
                  )}
                  {con.type === 'telegram' && (
                    <svg fill="currentColor" viewBox="0 0 24 24" className="icon-md"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.461-.168.582-.446.777-.736.786-.632.021-1.11-.454-1.722-.856-.957-.629-1.496-.959-2.427-1.571-1.076-.708-.378-1.097.235-1.734.161-.167 2.952-2.708 3.006-2.937.007-.029.012-.138-.052-.196-.065-.057-.16-.039-.229-.023-.098.022-1.66 1.056-4.689 3.097-.444.305-.845.455-1.204.447-.395-.008-1.155-.223-1.72-.407-.693-.226-1.244-.346-1.196-.731.025-.2.277-.406.757-.619 2.968-1.291 4.947-2.144 5.937-2.558 2.824-1.184 3.41-1.39 3.793-1.397.084-.002.274.019.397.12.103.084.132.2.143.284.014.102.02.327.009.529z"/></svg>
                  )}
                  {con.type === 'instagram' && (
                    <svg fill="currentColor" viewBox="0 0 24 24" className="icon-md"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  )}
                </div>
                <h3>{con.title}</h3>
                <p dir="ltr">{con.text}</p>
                <span className="contact-cta">{con.cta} ←</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Image src="/images/logo2.png" alt="آتاش تراول" width={56} height={56} />
            <h2>آتاش تراول</h2>
            <p>سفر با اطمینان، لحظات ماندگار</p>
          </div>
          
          <div className="footer-col">
            <h4>لینک‌های سریع</h4>
            <nav>
              {NAV_LINKS.map((link, idx) => (
                <a key={idx} href={link.href}>{link.label}</a>
              ))}
            </nav>
          </div>
          
          <div className="footer-col">
            <h4>تورهای ویژه</h4>
            <nav>
              {FEATURED_TOURS.map((tour) => (
                <Link key={tour.slug} href={`/tours/${tour.slug}`}>{tour.title}</Link>
              ))}
            </nav>
          </div>
          
          <div className="footer-col">
            <h4>شبکه‌های اجتماعی</h4>
            <div className="footer-socials">
              {CONTACTS.map((con, idx) => (
                <a key={idx} href={con.link} target="_blank" rel="noopener noreferrer">{con.title}</a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© ۱۴۰۵ آتاش تراول – تمامی حقوق محفوظ است</p>
        </div>
      </footer>
    </main>
  );
}