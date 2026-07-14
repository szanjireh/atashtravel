import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'اخذ ویزا | آتاش تراول',
  description: 'خدمات اخذ ویزا توریستی، تجاری و تحصیلی برای کشورهای مختلف با راهنمایی کامل مدارک و بالاترین نرخ قبولی',
  keywords: 'اخذ ویزا, ویزای توریستی, ویزای تحصیلی, ویزای تجاری, ویزای ترکیه, ویزای دبی, ویزای اروپا, مدارک ویزا',
  openGraph: {
    title: 'اخذ ویزا | آتاش تراول',
    description: 'خدمات اخذ ویزا توریستی، تجاری و تحصیلی برای کشورهای مختلف با راهنمایی کامل مدارک و بالاترین نرخ قبولی',
    type: 'website',
    locale: 'fa_IR',
  },
};

const VISA_SERVICES = [
  {
    title: 'ویزای توریستی',
    description: 'اخذ ویزای گردشگری برای سفرهای تفریحی و گردشگری به کشورهای مختلف',
    icon: '✈️',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'ویزای تجاری',
    description: 'ویزای سفرهای کاری، شرکت در نمایشگاه‌ها و جلسات تجاری',
    icon: '💼',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'ویزای تحصیلی',
    description: 'اخذ ویزا برای تحصیل در دانشگاه‌های خارج از کشور',
    icon: '🎓',
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'ویزای ترانزیت',
    description: 'ویزای عبور از کشورهای میانی در مسیر سفر',
    icon: '🛂',
    color: 'from-orange-500 to-red-500',
  },
];

const COUNTRIES = [
  {
    name: 'ترکیه',
    flag: '🇹🇷',
    visaType: 'ویزای الکترونیکی',
    duration: '۱ تا ۳ روز کاری',
    validity: '۱۸۰ روز',
    stay: '۹۰ روز',
    price: '۵۰$',
    difficulty: 'آسان',
    difficultyColor: 'green',
  },
  {
    name: 'امارات (دبی)',
    flag: '🇦🇪',
    visaType: 'ویزای توریستی',
    duration: '۳ تا ۵ روز کاری',
    validity: '۶۰ روز',
    stay: '۳۰ روز',
    price: '۸۰$',
    difficulty: 'آسان',
    difficultyColor: 'green',
  },
  {
    name: 'ارمنستان',
    flag: '🇦🇲',
    visaType: 'ویزا در فرودگاه',
    duration: 'فوری',
    validity: '۱۲۰ روز',
    stay: '۶۰ روز',
    price: '۱۰$',
    difficulty: 'خیلی آسان',
    difficultyColor: 'green',
  },
  {
    name: 'گرجستان',
    flag: '🇬🇪',
    visaType: 'بدون ویزا',
    duration: '-',
    validity: '۱ سال',
    stay: '۳۶۵ روز',
    price: 'رایگان',
    difficulty: 'خیلی آسان',
    difficultyColor: 'green',
  },
  {
    name: 'عراق',
    flag: '🇮🇶',
    visaType: 'ویزای الکترونیکی',
    duration: '۲ تا ۴ روز کاری',
    validity: '۹۰ روز',
    stay: '۳۰ روز',
    price: '۷۵$',
    difficulty: 'آسان',
    difficultyColor: 'green',
  },
  {
    name: 'مالزی',
    flag: '🇲🇾',
    visaType: 'ویزای توریستی',
    duration: '۵ تا ۷ روز کاری',
    validity: '۹۰ روز',
    stay: '۳۰ روز',
    price: '۱۰۰$',
    difficulty: 'متوسط',
    difficultyColor: 'yellow',
  },
  {
    name: 'تایلند',
    flag: '🇹🇭',
    visaType: 'ویزای توریستی',
    duration: '۷ تا ۱۰ روز کاری',
    validity: '۹۰ روز',
    stay: '۶۰ روز',
    price: '۱۲۰$',
    difficulty: 'متوسط',
    difficultyColor: 'yellow',
  },
  {
    name: 'روسیه',
    flag: '🇷🇺',
    visaType: 'ویزای توریستی',
    duration: '۱۰ تا ۱۵ روز کاری',
    validity: '۳۰ روز',
    stay: '۳۰ روز',
    price: '۱۵۰$',
    difficulty: 'متوسط',
    difficultyColor: 'yellow',
  },
  {
    name: 'چین',
    flag: '🇨🇳',
    visaType: 'ویزای توریستی',
    duration: '۱۵ تا ۲۰ روز کاری',
    validity: '۹۰ روز',
    stay: '۳۰ روز',
    price: '۲۰۰$',
    difficulty: 'سخت',
    difficultyColor: 'red',
  },
];

const REQUIRED_DOCUMENTS = [
  {
    title: 'گذرنامه معتبر',
    description: 'گذرنامه با حداقل ۶ ماه اعتبار از تاریخ سفر',
    icon: '📕',
  },
  {
    title: 'عکس پرسنلی',
    description: '۲ عدد عکس ۳×۴ با پس‌زمینه سفید',
    icon: '📸',
  },
  {
    title: 'گواهی اشتغال یا تحصیل',
    description: 'معرفی‌نامه از محل کار یا تحصیل',
    icon: '📄',
  },
  {
    title: 'مدارک مالی',
    description: 'گردش حساب بانکی ۳ ماه اخیر',
    icon: '💰',
  },
  {
    title: 'رزرو هتل و پرواز',
    description: 'رزرو موقت هتل و بلیط رفت و برگشت',
    icon: '🏨',
  },
  {
    title: 'بیمه مسافرتی',
    description: 'بیمه سفر معتبر برای کل مدت سفر',
    icon: '🛡️',
  },
];

const PROCESSING_STEPS = [
  {
    step: '۱',
    title: 'مشاوره رایگان',
    description: 'دریافت مشاوره کامل درباره نوع ویزا و مدارک مورد نیاز',
  },
  {
    step: '۲',
    title: 'آماده‌سازی مدارک',
    description: 'کمک به جمع‌آوری و تکمیل مدارک با بالاترین استاندارد',
  },
  {
    step: '۳',
    title: 'ثبت درخواست',
    description: 'ثبت آنلاین درخواست ویزا در سامانه‌های رسمی',
  },
  {
    step: '۴',
    title: 'پیگیری مداوم',
    description: 'بررسی و پیگیری وضعیت درخواست تا صدور ویزا',
  },
  {
    step: '۵',
    title: 'دریافت ویزا',
    description: 'تحویل ویزا و راهنمایی‌های نهایی قبل از سفر',
  },
];

const FAQ_ITEMS = [
  {
    question: 'چه مدت زمان برای اخذ ویزا نیاز است؟',
    answer: 'زمان اخذ ویزا بسته به کشور مقصد متفاوت است. برخی ویزاها مانند ترکیه و امارات ظرف ۳ تا ۵ روز کاری صادر می‌شوند، اما برای کشورهای اروپایی ممکن است ۲ تا ۴ هفته زمان ببرد.',
  },
  {
    question: 'آیا گرفتن ویزا تضمینی است؟',
    answer: 'تصمیم نهایی درباره صدور ویزا بر عهده سفارت است و هیچ آژانسی نمی‌تواند صدور ویزا را تضمین کند. اما ما با راهنمایی دقیق و آماده‌سازی حرفه‌ای مدارک، احتمال قبولی را به حداکثر می‌رسانیم.',
  },
  {
    question: 'در صورت رد ویزا، هزینه برگشت داده می‌شود؟',
    answer: 'هزینه‌های کنسولی (هزینه سفارت) در صورت رد ویزا قابل برگشت نیست، اما هزینه خدمات آژانس بسته به شرایط قابل بازگشت یا استفاده برای درخواست مجدد است.',
  },
  {
    question: 'آیا نیاز به مصاحبه حضوری در سفارت دارم؟',
    answer: 'برای بسیاری از کشورها مانند ترکیه، امارات و کشورهای آسیایی نیاز به مصاحبه نیست و ویزا به صورت آنلاین یا از طریق آژانس اخذ می‌شود. اما برای کشورهای اروپایی و آمریکا معمولاً مصاحبه الزامی است.',
  },
  {
    question: 'آیا امکان تمدید ویزا در خارج وجود دارد؟',
    answer: 'بسته به نوع ویزا و کشور مقصد، برخی ویزاها قابل تمدید هستند. برای اطلاعات دقیق‌تر باید با کارشناسان ما مشورت کنید.',
  },
];

export default function VisaPage() {
  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans">
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-[1400px] left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="px-6 pb-16 pt-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/20">
                <span className="text-xl">🛂</span>
                خدمات اخذ ویزا
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                اخذ <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">ویزای سفر</span> با اطمینان کامل
              </h1>
              <p className="mx-auto max-w-3xl text-base text-slate-400 leading-relaxed sm:text-lg">
                آتاش تراول با تیم مجرب و متخصص، خدمات اخذ ویزای توریستی، تجاری و تحصیلی برای بیش از ۵۰ کشور 
                را با راهنمایی کامل مدارک و بالاترین نرخ قبولی ارائه می‌دهد.
              </p>
            </div>
          </div>
        </section>

        {/* Visa Services */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">انواع خدمات ویزا</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">ویزا برای هر نیازی</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {VISA_SERVICES.map((service) => (
                <div key={service.title} className="group rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/40">
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r ${service.color} text-3xl`}>
                    {service.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Countries List */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 bg-slate-950/40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">مقاصد محبوب</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">لیست کشورها</h2>
              <p className="text-slate-400 leading-relaxed">
                اطلاعات کامل ویزای کشورهای مختلف شامل نوع ویزا، مدت زمان و هزینه
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {COUNTRIES.map((country) => (
                <div key={country.name} className="rounded-2xl border border-white/5 bg-slate-900/20 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/40">
                  <div className="bg-slate-950/60 p-5 border-b border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{country.flag}</span>
                        <h3 className="text-xl font-bold text-white">{country.name}</h3>
                      </div>
                      <span className={`rounded-lg px-3 py-1 text-xs font-bold ${
                        country.difficultyColor === 'green' ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20' :
                        country.difficultyColor === 'yellow' ? 'bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/20' :
                        'bg-red-500/10 text-red-400 ring-1 ring-red-500/20'
                      }`}>
                        {country.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-cyan-400 font-medium">{country.visaType}</p>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">مدت زمان:</span>
                      <span className="font-medium text-white">{country.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">اعتبار ویزا:</span>
                      <span className="font-medium text-white">{country.validity}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">مدت اقامت:</span>
                      <span className="font-medium text-white">{country.stay}</span>
                    </div>
                    <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                      <span className="text-sm text-slate-400">هزینه از:</span>
                      <span className="text-xl font-black text-cyan-400">{country.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Required Documents */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">مدارک مورد نیاز</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">چه مدارکی نیاز دارید؟</h2>
              <p className="mx-auto max-w-2xl text-slate-400 leading-relaxed">
                مدارک عمومی مورد نیاز برای اخذ ویزا (ممکن است بسته به کشور مقصد متفاوت باشد)
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {REQUIRED_DOCUMENTS.map((doc) => (
                <div key={doc.title} className="flex gap-4 rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm">
                  <div className="flex-shrink-0 text-4xl">{doc.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">{doc.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Processing Steps */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 bg-slate-950/40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">مراحل اخذ ویزا</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">روند کار چگونه است؟</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {PROCESSING_STEPS.map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm text-center space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-2xl font-black text-slate-950">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                  {index < PROCESSING_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -left-3 h-0.5 w-6 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 space-y-3 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">سوالات متداول</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">پرسش و پاسخ</h2>
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

        {/* CTA Section */}
        <section className="px-6 pb-24 pt-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-cyan-500/10 to-sky-500/5 p-8 sm:p-12 text-center shadow-2xl backdrop-blur-md">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
              
              <div className="relative z-10 space-y-6">
                <div className="text-4xl">🎯</div>
                <h2 className="text-3xl font-black text-white sm:text-4xl">آماده شروع فرآیند اخذ ویزا؟</h2>
                <p className="mx-auto max-w-xl text-slate-400 leading-relaxed">
                  کارشناسان ویزای ما آماده‌اند تا در هر مرحله از فرآیند کنار شما باشند. 
                  برای دریافت مشاوره رایگان و بررسی شرایط ویزا همین حالا با ما تماس بگیرید.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-4 text-sm font-semibold text-slate-950 transition-all hover:opacity-95 hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
                  >
                    مشاوره رایگان ویزا
                  </Link>
                  <a
                    href="https://wa.me/989128637309"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/[0.02] hover:scale-[1.02]"
                  >
                    <span>💬</span>
                    پشتیبانی واتساپ
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
