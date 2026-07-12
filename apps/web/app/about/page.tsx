import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'درباره ما | آتاش تراول',
  description: 'آتاش تراول با بیش از یک دهه تجربه در صنعت گردشگری، ارائه دهنده بهترین تورهای خارجی با کیفیت بالا و خدمات ویژه VIP',
  keywords: 'درباره آتاش تراول, آژانس مسافرتی, تور خارجی, خدمات گردشگری, سفر به خارج',
  openGraph: {
    title: 'درباره ما | آتاش تراول',
    description: 'آتاش تراول با بیش از یک دهه تجربه در صنعت گردشگری، ارائه دهنده بهترین تورهای خارجی با کیفیت بالا و خدمات ویژه VIP',
    type: 'website',
    locale: 'fa_IR',
  },
};

const COMPANY_VALUES = [
  {
    title: 'اعتماد و شفافیت',
    description: 'ما به شفافیت کامل در قیمت‌گذاری، خدمات و تمامی جزئیات سفر متعهد هستیم. هیچ هزینه پنهانی وجود ندارد.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    title: 'کیفیت برتر',
    description: 'انتخاب دقیق بهترین هتل‌ها، پروازها و خدمات با استانداردهای جهانی برای تضمین تجربه‌ای لوکس و راحت.',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    title: 'تخصص و تجربه',
    description: 'بیش از یک دهه تجربه در برگزاری تورهای خارجی و خدمات رسانی به هزاران مسافر راضی در سراسر جهان.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    title: 'پشتیبانی ۲۴/۷',
    description: 'تیم پشتیبانی حرفه‌ای ما در تمامی مراحل سفر کنار شماست و آماده پاسخگویی به تمامی سوالات و نیازهای شما.',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
];

const SERVICES_LIST = [
  'رزرو بلیط هواپیما داخلی و بین‌المللی',
  'رزرو هتل‌های ۳ تا ۵ ستاره با بهترین قیمت',
  'تورهای گروهی و اختصاصی (VIP)',
  'اخذ ویزا و راهنمایی کامل مدارک',
  'بیمه مسافرتی جامع بین‌المللی',
  'ترنسفر فرودگاهی و شاتل اختصاصی',
  'تورهای یک روزه و گردشگری شهری',
  'برنامه‌ریزی سفر اختصاصی و سفارشی',
];

const STATS = [
  { value: '+۵۰۰۰', label: 'مسافر راضی', icon: '👥' },
  { value: '+۱۰', label: 'سال تجربه', icon: '🏆' },
  { value: '+۳۰', label: 'مقصد فعال', icon: '🌍' },
  { value: '۹۸٪', label: 'رضایت مشتریان', icon: '⭐' },
];

const WHY_CHOOSE = [
  {
    title: 'مجوز رسمی',
    description: 'دارای مجوز رسمی گردشگری از سازمان میراث فرهنگی و عضو انجمن آژانس‌های مسافرتی هواپیمایی ایران (IATA)',
    emoji: '📜',
  },
  {
    title: 'قیمت رقابتی',
    description: 'با ارتباط مستقیم با هتل‌ها و ایرلاین‌ها، بهترین قیمت را بدون واسطه برای شما تضمین می‌کنیم',
    emoji: '💰',
  },
  {
    title: 'تیم متخصص',
    description: 'کارشناسان مجرب و با تجربه سفر به مقاصد مختلف، آماده مشاوره و برنامه‌ریزی سفر شما',
    emoji: '👨‍💼',
  },
  {
    title: 'پشتیبانی همیشگی',
    description: 'تیم پشتیبانی در تمامی مراحل سفر از رزرو تا بازگشت همراه شما خواهد بود',
    emoji: '🤝',
  },
];

export default function AboutPage() {
  return (
    <main dir="rtl" className="relative min-h-screen overflow-hidden bg-[#030712] text-slate-100 font-sans">
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-[800px] left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />

      <div className="relative z-10">
        <Header />

        {/* Hero Section */}
        <section className="px-6 pb-16 pt-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/20">
                <span className="text-xl">🏢</span>
                درباره آتاش تراول
              </div>
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
                همراه شما در سفری <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">بی‌نظیر</span>
              </h1>
              <p className="mx-auto max-w-3xl text-base text-slate-400 leading-relaxed sm:text-lg">
                آتاش تراول با بیش از یک دهه تجربه در صنعت گردشگری، به عنوان یکی از معتبرترین آژانس‌های مسافرتی ایران، 
                ارائه‌دهنده خدمات سفر با کیفیت، ایمن و اقتصادی به مقاصد مختلف جهان است.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-12 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="group rounded-2xl border border-white/5 bg-slate-900/20 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/40">
                  <div className="mb-3 text-4xl">{stat.icon}</div>
                  <p className="text-3xl font-black bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2">
            <div className="space-y-6 rounded-[2rem] border border-white/5 bg-slate-900/20 p-8 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400">
                🎯 ماموریت ما
              </div>
              <h2 className="text-3xl font-black text-white">خلق تجربه‌ای ماندگار</h2>
              <p className="text-slate-400 leading-relaxed">
                ماموریت ما در آتاش تراول، ایجاد تجربه‌های سفر بی‌نظیر و خاطره‌انگیز برای مسافران ایرانی است. 
                ما می‌خواهیم با ارائه خدمات حرفه‌ای، شفاف و مطمئن، سفر به خارج از کشور را برای همه آسان، 
                لذت‌بخش و دسترس‌پذیر کنیم.
              </p>
              <p className="text-slate-400 leading-relaxed">
                تمرکز ما بر رضایت کامل مشتریان، حفظ استانداردهای عالی خدمات‌رسانی و ایجاد اعتماد پایدار 
                از طریق شفافیت، صداقت و تخصص است.
              </p>
            </div>

            <div className="space-y-6 rounded-[2rem] border border-white/5 bg-slate-900/20 p-8 backdrop-blur-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-400">
                🔭 چشم‌انداز ما
              </div>
              <h2 className="text-3xl font-black text-white">پیشرو در صنعت گردشگری</h2>
              <p className="text-slate-400 leading-relaxed">
                چشم‌انداز آتاش تراول، تبدیل شدن به برترین و معتبرترین برند سفر در ایران و منطقه است. 
                ما می‌خواهیم با بهره‌گیری از فناوری‌های نوین، گسترش شبکه همکاری‌های بین‌المللی و 
                ارتقای مداوم کیفیت خدمات، الگوی موفقیت در صنعت گردشگری باشیم.
              </p>
              <p className="text-slate-400 leading-relaxed">
                هدف ما، ایجاد پلتفرمی است که در آن هر ایرانی بتواند با اطمینان کامل، سفری رویایی 
                و متناسب با سلیقه و بودجه خود را تجربه کند.
              </p>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="px-6 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3 text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">ارزش‌های سازمانی</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">اصول و باورهای ما</h2>
              <p className="mx-auto max-w-2xl text-slate-400 leading-relaxed">
                ارزش‌هایی که هویت سازمانی ما را شکل می‌دهند و مسیر حرکت ما را تعیین می‌کنند
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {COMPANY_VALUES.map((value) => (
                <div key={value.title} className="group rounded-[2rem] border border-white/5 bg-slate-900/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/20 hover:bg-slate-900/30">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/10 transition-transform duration-300 group-hover:scale-110">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-7 w-7">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-white">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="px-6 py-16 sm:px-8 lg:px-10 border-t border-white/5 bg-slate-950/40">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">مزایای انتخاب ما</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">چرا آتاش تراول را انتخاب کنیم؟</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {WHY_CHOOSE.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/5 bg-slate-900/20 p-6 backdrop-blur-sm">
                  <div className="mb-4 text-4xl">{item.emoji}</div>
                  <h3 className="mb-3 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="px-6 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 space-y-3">
              <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">خدمات ما</span>
              <h2 className="text-3xl font-black text-white sm:text-4xl">ارائه خدمات جامع گردشگری</h2>
              <p className="max-w-2xl text-slate-400 leading-relaxed">
                از رزرو بلیط و هتل تا برنامه‌ریزی کامل سفر، تمامی نیازهای شما را پوشش می‌دهیم
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES_LIST.map((service, index) => (
                <div key={index} className="flex items-center gap-3 rounded-xl border border-white/5 bg-slate-950/40 px-5 py-4 text-sm font-medium text-slate-300 transition-all hover:border-cyan-500/20 hover:bg-slate-900/60">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs">
                    {index + 1}
                  </div>
                  <span>{service}</span>
                </div>
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
                <h2 className="text-3xl font-black text-white sm:text-4xl">آماده شروع سفر بعدی هستید؟</h2>
                <p className="mx-auto max-w-xl text-slate-400 leading-relaxed">
                  همین حالا با کارشناسان ما تماس بگیرید و مشاوره رایگان دریافت کنید. تیم ما آماده است تا 
                  بهترین برنامه سفر را متناسب با نیاز و بودجه شما طراحی کند.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-4 text-sm font-semibold text-slate-950 transition-all hover:opacity-95 hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
                  >
                    تماس با ما
                  </Link>
                  <Link
                    href="/tours"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-4 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/40 hover:bg-cyan-500/[0.02] hover:scale-[1.02]"
                  >
                    مشاهده تورها
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
