'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Users, Clock, Award, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">آ</span>
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">آتاش تراول</span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-8">
            <Link href="#destinations" className="text-sm sm:text-base text-neutral-600 hover:text-primary transition-colors">
              مقصدها
            </Link>
            <Link href="#tours" className="text-sm sm:text-base text-neutral-600 hover:text-primary transition-colors">
              تورها
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                ورود
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[600px] sm:h-[700px] overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 -left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center text-white space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            تجربه سفری بی‌نظیر
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl text-white/90">
            آتاش تراول شما را به بهترین مقصدهای جهان می‌برد. تورهای منحصربفرد، هتل‌های لوکس و خدمات شامل
          </p>
          
          {/* Search/CTA */}
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <Link href="/tours" className="flex-1">
              <Button size="lg" variant="secondary" className="w-full text-base font-semibold">
                کاوش تورها
                <ArrowLeft className="w-5 h-5 mr-2" />
              </Button>
            </Link>
            <Link href="/register" className="flex-1">
              <Button size="lg" variant="outline" className="w-full text-base font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20">
                شروع سفر
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-neutral-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Users, label: '۲۵۰+', text: 'مسافر راضی' },
              { icon: MapPin, label: '۸۰+', text: 'مقصد جهانی' },
              { icon: Award, label: '۱۵+', text: 'سال تجربه' },
              { icon: ShieldCheck, label: '۱۰۰%', text: 'ضمان اطمینان' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="text-center space-y-3">
                  <div className="flex justify-center">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-secondary" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">{item.label}</div>
                  <div className="text-xs sm:text-sm text-neutral-600">{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              مقصدهای شاخص
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              بهترین و محبوب‌ترین مقصدهای گردشگری را کشف کنید
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'استانبول',
                image: '🌉',
                description: 'شهر دو قاره با تاریخ ۲۰۰۰ ساله',
                tours: '۲۸ تور',
              },
              {
                name: 'دبی',
                image: '🏙️',
                description: 'خرید، تجملات و ساحل‌های زیبا',
                tours: '۳۵ تور',
              },
              {
                name: 'پاریس',
                image: '🗼',
                description: 'شهر عشق و هنر و فرهنگ',
                tours: '۲۲ تور',
              },
              {
                name: 'کیش',
                image: '🏝️',
                description: 'جزیره زیبا با آب‌های فیروزه‌ای',
                tours: '۱۸ تور',
              },
              {
                name: 'رم',
                image: '🏛️',
                description: 'میراث باستانی و معماری رومی',
                tours: '۲۵ تور',
              },
              {
                name: 'بنکوک',
                image: '🏮',
                description: 'معابد باشکوه و بازارهای سنتی',
                tours: '۲۱ تور',
              },
            ].map((dest, i) => (
              <div key={i} className="group cursor-pointer card-hover rounded-2xl overflow-hidden bg-white border border-neutral-200">
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center text-6xl">
                  {dest.image}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-primary">{dest.name}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{dest.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <span className="text-sm font-semibold text-secondary">{dest.tours}</span>
                    <ArrowLeft className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-12 text-center">
            چرا آتاش تراول؟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Award,
                title: 'بهترین قیمت‌ها',
                description: 'ما مستقیم با هتل‌ها و تورآپریتورها کار می‌کنیم تا بهترین قیمت را ارائه دهیم',
              },
              {
                icon: ShieldCheck,
                title: 'پشتیبانی ۲۴/۷',
                description: 'تیم متخصصین ما همیشه آماده است تا به شما کمک کند',
              },
              {
                icon: Zap,
                title: 'رزرو آسان',
                description: 'فرایند رزرو ساده و سریع در چند کلیک',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-8 bg-white rounded-2xl border border-neutral-200">
                  <Icon className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center text-white space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            آماده برای سفر بعدی خود هستید؟
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            امروز با آتاش تراول ثبت‌نام کنید و ۲۰% تخفیف برای سفر اول خود دریافت کنید
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-base font-semibold">
                ثبت‌نام رایگان
              </Button>
            </Link>
            <Link href="#">
              <Button size="lg" variant="outline" className="text-base font-semibold bg-white/10 border-white/30 text-white hover:bg-white/20">
                تماس با ما
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">آتاش تراول</h3>
              <p className="text-neutral-400 text-sm">پلتفرم سفر و گردشگری شما</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">خدمات</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li><Link href="/tours" className="hover:text-white transition-colors">تورها</Link></li>
                <li><Link href="/hotels" className="hover:text-white transition-colors">هتل‌ها</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">درباره ما</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">درباره آتاش تراول</a></li>
                <li><a href="#" className="hover:text-white transition-colors">شرایط استفاده</a></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">تماس</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li>تلفن: ۱۲۳۴-۵۶۷</li>
                <li><a href="#" className="hover:text-white transition-colors">ایمیل</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-800 pt-8 text-center text-sm text-neutral-400">
            <p>© ۱۴۰۲ آتاش تراول. تمام حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
