'use client';

import Link from 'next/link';
import Header from '@/components/header';
import { useState } from 'react';

const CONTACT_INFO = [
  {
    title: 'شماره تماس',
    value: '+۹۸ ۹۱۲ ۸۶۳ ۷۳۰۹',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    link: 'tel:+989128637309',
    color: 'cyan',
  },
  {
    title: 'واتساپ',
    value: '+۹۸ ۹۱۲ ۸۶۳ ۷۳۰۹',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    link: 'https://wa.me/989128637309',
    color: 'green',
  },
  {
    title: 'ایمیل',
    value: 'info@atashtravel.com',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    link: 'mailto:info@atashtravel.com',
    color: 'sky',
  },
  {
    title: 'آدرس',
    value: 'تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲۳۴',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    link: 'https://maps.google.com/?q=Tehran,Valiasr',
    color: 'indigo',
  },
];

const WORKING_HOURS = [
  { day: 'شنبه تا چهارشنبه', hours: '۹:۰۰ - ۱۸:۰۰' },
  { day: 'پنجشنبه', hours: '۹:۰۰ - ۱۴:۰۰' },
  { day: 'جمعه', hours: 'تعطیل (پاسخگویی تلفنی اضطراری)' },
];

const SOCIAL_LINKS = [
  {
    name: 'تلگرام',
    username: '@atashtravel',
    link: 'https://t.me/atashtravel',
    icon: '📱',
    color: 'from-sky-500 to-blue-500',
  },
  {
    name: 'اینستاگرام',
    username: '@atashtravel',
    link: 'https://instagram.com/atashtravel',
    icon: '📸',
    color: 'from-pink-500 to-purple-500',
  },
  {
    name: 'واتساپ',
    username: '+۹۸ ۹۱۲ ۸۶۳ ۷۳۰۹',
    link: 'https://wa.me/989128637309',
    icon: '💬',
    color: 'from-green-500 to-emerald-500',
  },
];

const FAQ_ITEMS = [
  {
    question: 'چطور می‌توانم تور مورد نظرم را رزرو کنم؟',
    answer: 'شما می‌توانید از طریق تماس با شماره ۰۹۱۲۸۶۳۷۳۰۹، پیام در واتساپ یا تلگرام و یا پر کردن فرم تماس با ما، تور مورد نظر خود را رزرو کنید. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.',
  },
  {
    question: 'آیا امکان پرداخت اقساطی تور وجود دارد؟',
    answer: 'بله، برای بسیاری از تورهای ما امکان پرداخت اقساطی فراهم است. برای اطلاعات بیشتر و شرایط پرداخت اقساطی با کارشناسان ما تماس بگیرید.',
  },
  {
    question: 'مدارک مورد نیاز برای سفر چیست؟',
    answer: 'مدارک مورد نیاز بسته به مقصد متفاوت است. به طور کلی شامل گذرنامه معتبر، ویزا (در صورت نیاز)، بیمه مسافرتی و تصویر شناسنامه می‌شود. کارشناسان ما لیست کامل مدارک را در اختیار شما قرار خواهند داد.',
  },
  {
    question: 'آیا بیمه مسافرتی در قیمت تور لحاظ شده است؟',
    answer: 'بله، تمامی تورهای ما شامل بیمه مسافرتی بین‌المللی هستند که پوشش درمانی، بیماری و حوادث احتمالی در سفر را دارد.',
  },
  {
    question: 'در صورت کنسلی تور، سیاست بازگشت وجه چگونه است؟',
    answer: 'سیاست کنسلی بسته به نوع تور، زمان کنسلی و شرایط هتل و ایرلاین متفاوت است. قبل از رزرو، شرایط و قوانین کنسلی به طور کامل برای شما توضیح داده خواهد شد.',
  },
  {
    question: 'آیا در طول سفر، پشتیبانی دارید؟',
    answer: 'بله، تیم پشتیبانی ۲۴/۷ ما در تمام طول سفر شما در دسترس است و آماده رفع هرگونه مشکل یا پاسخگویی به سوالات شما می‌باشد.',
  },
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans">
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-[1000px] left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="px-6 pb-16 pt-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/20">
                <span className="text-xl">📞</span>
                تماس با ما
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                ما اینجاییم تا <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">کمکتان کنیم</span>
              </h1>
              <p className="mx-auto max-w-2xl text-base text-slate-400 leading-relaxed sm:text-lg">
                با آتاش تراول در تماس باشید. تیم ما آماده است تا به تمامی سوالات شما پاسخ دهد و بهترین راهنمایی‌ها 
                را برای سفر رویایی شما ارائه کند.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="px-6 py-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CONTACT_INFO.map((info) => (
                <a
                  key={info.title}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/40"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/10 transition-transform duration-300 group-hover:scale-110">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-slate-400">{info.title}</h3>
                  <p className="text-sm text-white font-medium leading-relaxed">{info.value}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Contact Form */}
            <div className="rounded-[2rem] border border-white/5 bg-slate-900/20 p-8 backdrop-blur-sm">
              <div className="mb-8 space-y-3">
                <h2 className="text-3xl font-black text-white">فرم تماس</h2>
                <p className="text-slate-400 leading-relaxed">
                  پیام خود را برای ما ارسال کنید و ما در اسرع وقت با شما تماس خواهیم گرفت
                </p>
              </div>

              {submitted && (
                <div className="mb-6 rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-400">
                  ✓ پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">
                      نام و نام خانوادگی *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                      placeholder="نام خود را وارد کنید"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-300">
                      شماره تماس *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">
                    ایمیل
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-300">
                    موضوع *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors"
                  >
                    <option value="">انتخاب کنید</option>
                    <option value="tour">رزرو تور</option>
                    <option value="hotel">رزرو هتل</option>
                    <option value="visa">اخذ ویزا</option>
                    <option value="flight">رزرو بلیط</option>
                    <option value="other">سایر موارد</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300">
                    پیام شما *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-colors resize-none"
                    placeholder="پیام خود را اینجا بنویسید..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-4 text-sm font-semibold text-slate-950 transition-all hover:opacity-95 hover:scale-[1.01] shadow-lg shadow-cyan-500/20"
                >
                  ارسال پیام
                </button>
              </form>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Working Hours */}
              <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 text-xl">
                    🕐
                  </div>
                  <h3 className="text-xl font-bold text-white">ساعات کاری</h3>
                </div>
                <div className="space-y-3">
                  {WORKING_HOURS.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm text-slate-400">{item.day}</span>
                      <span className="text-sm font-medium text-white">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 text-xl">
                    🌐
                  </div>
                  <h3 className="text-xl font-bold text-white">شبکه‌های اجتماعی</h3>
                </div>
                <div className="space-y-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/40 px-4 py-3 transition-all hover:border-cyan-500/30 hover:bg-slate-900/60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{social.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-white">{social.name}</p>
                          <p className="text-xs text-slate-400">{social.username}</p>
                        </div>
                      </div>
                      <span className="text-cyan-400 transition-transform group-hover:translate-x-[-4px]">←</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-sm">
                <div className="mb-3 flex items-center gap-2 text-red-400">
                  <span className="text-xl">🚨</span>
                  <h3 className="text-sm font-bold">پشتیبانی اضطراری ۲۴/۷</h3>
                </div>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                  در مواقع اضطراری در طول سفر، با شماره زیر تماس بگیرید:
                </p>
                <p className="text-lg font-black text-white" dir="ltr">+۹۸ ۹۱۲ ۸۶۳ ۷۳۰۹</p>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps Placeholder */}
        <section className="px-6 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 space-y-3 text-center">
              <h2 className="text-3xl font-black text-white">محل دفتر ما</h2>
              <p className="text-slate-400">
                برای مشاوره حضوری به آدرس زیر مراجعه کنید
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/20 p-3 shadow-2xl">
              <div className="relative h-[400px] overflow-hidden rounded-[1.5rem] bg-slate-950">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-3xl">
                      📍
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white mb-2">نقشه گوگل</p>
                      <p className="text-sm text-slate-400 max-w-md">
                        تهران، خیابان ولیعصر، نرسیده به میدان ونک، پلاک ۱۲۳۴
                      </p>
                      <a
                        href="https://maps.google.com/?q=Tehran,Valiasr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                      >
                        مشاهده در گوگل مپ ←
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5 bg-slate-950/40">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 space-y-3 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">سوالات متداول</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">پاسخ سوالات شما</h2>
              <p className="text-slate-400">
                پاسخ به رایج‌ترین سوالاتی که از ما پرسیده می‌شود
              </p>
            </div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-2xl border border-white/5 bg-slate-900/20 backdrop-blur-sm overflow-hidden transition-all hover:border-cyan-500/20"
                >
                  <summary className="cursor-pointer px-6 py-5 font-medium text-white list-none flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-sm">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                    <span className="text-cyan-400 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-sm text-slate-400 leading-relaxed pr-11">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
