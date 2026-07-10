'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main dir="rtl">
      {/* HEADER */}
      <header className="site-header" id="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <img src="/images/logo2.png" alt="آتاش تراول" className="brand-logo" />
            <span className="brand-name">آتاش تراول</span>
          </Link>
          <nav className="main-nav" id="main-nav">
            <a href="#home" className="nav-link">خانه</a>
            <a href="#tours" className="nav-link">تورها</a>
            <a href="#services" className="nav-link">خدمات</a>
            <a href="/about" className="nav-link">درباره ما</a>
            <a href="#contact" className="nav-link">تماس</a>
            <a href="#contact" className="btn btn-nav">رزرو تور</a>
          </nav>
          <button className="hamburger" id="hamburger" aria-label="باز کردن منو">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <span className="hero-badge">✈ تجربه سفر متفاوت</span>
          <h1 className="hero-title">سفر به <em>رویاهایت</em><br/>را از اینجا شروع کن</h1>
          <p className="hero-subtitle">
            آتاش تراول با بیش از یک دهه تجربه، بهترین تورهای خارجی را<br/>
            با قیمت مناسب و خدمات ویژه ارائه می‌دهد
          </p>
          <div className="hero-actions">
            <a href="#tours" className="btn btn-primary">مشاهده تورها</a>
            <a href="#contact" className="btn btn-ghost">مشاوره رایگان</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>+۵۰۰۰</strong><span>مسافر راضی</span></div>
            <div className="hero-stat-sep"></div>
            <div className="hero-stat"><strong>+۱۰</strong><span>سال تجربه</span></div>
            <div className="hero-stat-sep"></div>
            <div className="hero-stat"><strong>+۳۰</strong><span>مقصد فعال</span></div>
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
            <a href="tours/van.html" className="tour-card">
              <div className="tour-img-wrap">
                <img src="/images/van.jpg" alt="تور وان" loading="lazy" />
                <span className="tour-badge">داغ 🔥</span>
              </div>
              <div className="tour-body">
                <div className="tour-meta">
                  <span>🇹🇷 ترکیه</span>
                  <span>۳ شب | ۴ روز</span>
                </div>
                <h3>تور وان</h3>
                <p>خرید، تفریح و طبیعت بکر در نزدیکی مرز ایران و ترکیه</p>
                <div className="tour-footer">
                  <span className="tour-price">از <strong>۴۵۰$</strong></span>
                  <span className="tour-arrow">جزئیات ←</span>
                </div>
              </div>
            </a>
            <a href="tours/antalya.html" className="tour-card">
              <div className="tour-img-wrap">
                <img src="/images/antalya.jpg" alt="تور آنتالیا" loading="lazy" />
                <span className="tour-badge tour-badge--gold">پرواز + هتل ✈</span>
              </div>
              <div className="tour-body">
                <div className="tour-meta">
                  <span>🇹🇷 ترکیه</span>
                  <span>۶ شب | ۷ روز</span>
                </div>
                <h3>تور آنتالیا</h3>
                <p>ساحل آبی مدیترانه، هتل‌های لوکس و تفریحات دریایی</p>
                <div className="tour-footer">
                  <span className="tour-price">از <strong>۷۵۰$</strong></span>
                  <span className="tour-arrow">جزئیات ←</span>
                </div>
              </div>
            </a>
            <a href="tours/armenia-water.html" className="tour-card">
              <div className="tour-img-wrap">
                <img src="/images/armenia-water.jpg" alt="جشن آب ارمنستان" loading="lazy" />
                <span className="tour-badge tour-badge--blue">رویداد ویژه 🎉</span>
              </div>
              <div className="tour-body">
                <div className="tour-meta">
                  <span>🇦🇲 ارمنستان</span>
                  <span>۴ شب | ۵ روز</span>
                </div>
                <h3>جشن آب ارمنستان</h3>
                <p>تجربه جشنواره وارداوار؛ شادترین رویداد تابستانی قفقاز</p>
                <div className="tour-footer">
                  <span className="tour-price">از <strong>۵۵۰$</strong></span>
                  <span className="tour-arrow">جزئیات ←</span>
                </div>
              </div>
            </a>
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
            <div className="why-card">
              <div className="why-icon">🏆</div>
              <h3>مجوز رسمی</h3>
              <p>دارای مجوز رسمی گردشگری و عضو انجمن آژانس‌های مسافرتی ایران</p>
            </div>
            <div className="why-card">
              <div className="why-icon">💰</div>
              <h3>بهترین قیمت</h3>
              <p>ضمانت بهترین نرخ با شفافیت کامل در اعلام هزینه‌ها و بدون هزینه پنهان</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🛡️</div>
              <h3>پشتیبانی ۲۴/۷</h3>
              <p>تیم پشتیبانی ما در تمام لحظات سفر کنار شماست و آماده پاسخگویی است</p>
            </div>
            <div className="why-card">
              <div className="why-icon">📋</div>
              <h3>ویزا و مدارک</h3>
              <p>راهنمایی کامل برای اخذ ویزا، آماده‌سازی مدارک و انجام تشریفات گمرکی</p>
            </div>
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
              <li><span className="check">✓</span> رزرو بلیط هواپیما داخلی و خارجی</li>
              <li><span className="check">✓</span> رزرو هتل با بهترین قیمت تضمینی</li>
              <li><span className="check">✓</span> تور گروهی و اختصاصی (VIP)</li>
              <li><span className="check">✓</span> اخذ ویزا و راهنمایی مدارک</li>
              <li><span className="check">✓</span> ترنسفر فرودگاهی</li>
              <li><span className="check">✓</span> بیمه مسافرتی جامع</li>
            </ul>
            <a href="#contact" className="btn btn-primary">درخواست مشاوره رایگان</a>
          </div>
          <div className="services-visual">
            <img src="/images/antalya.jpg" alt="خدمات آتاش تراول" loading="lazy" />
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
            <a href="https://wa.me/989128637309" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon contact-icon--green">💬</div>
              <h3>واتساپ</h3>
              <p dir="ltr">+98 912 863 7309</p>
              <span className="contact-cta">ارسال پیام ←</span>
            </a>
            <a href="https://t.me/atashtravel" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon contact-icon--blue">✈</div>
              <h3>تلگرام</h3>
              <p>@atashtravel</p>
              <span className="contact-cta">پیام در تلگرام ←</span>
            </a>
            <a href="https://instagram.com/atashtravel" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="contact-icon contact-icon--pink">📷</div>
              <h3>اینستاگرام</h3>
              <p>@atashtravel</p>
              <span className="contact-cta">دنبال کنید ←</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/images/logo2.png" alt="آتاش تراول" />
            <h2>آتاش تراول</h2>
            <p>سفر با اطمینان، لحظات ماندگار</p>
          </div>
          <div className="footer-col">
            <h4>لینک‌های سریع</h4>
            <nav>
              <a href="#tours">تورها</a>
              <a href="#services">خدمات</a>
              <a href="/about">درباره ما</a>
              <a href="#contact">تماس</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>تورهای ویژه</h4>
            <nav>
              <a href="tours/van.html">تور وان</a>
              <a href="tours/antalya.html">تور آنتالیا</a>
              <a href="tours/armenia-water.html">جشن آب ارمنستان</a>
            </nav>
          </div>
          <div className="footer-col">
            <h4>شبکه‌های اجتماعی</h4>
            <div className="footer-socials">
              <a href="https://instagram.com/atashtravel" target="_blank" rel="noopener noreferrer">اینستاگرام</a>
              <a href="https://t.me/atashtravel" target="_blank" rel="noopener noreferrer">تلگرام</a>
              <a href="https://wa.me/989128637309" target="_blank" rel="noopener noreferrer">واتساپ</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© ۱۴۰۴ آتاش تراول – تمامی حقوق محفوظ است</p>
        </div>
      </footer>
    </main>
  );
}
