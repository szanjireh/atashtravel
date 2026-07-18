'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';
import SearchBox from '@/components/search-box';

const HERO_STATS = [
  { value: '+۵۰۰۰', label: 'مسافر راضی', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { value: '+۱۰', label: 'سال تجربه', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
  { value: '+۳۰', label: 'مقصد فعال', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
];

const FEATURED_TOURS = [
  {
    slug: 'van-tour',
    title: 'تور وان',
    description: 'خرید، تفریح و طبیعت بکر در نزدیکی مرز ایران و ترکیه',
    location: 'وان، ترکیه',
    duration: '۳ شب و ۴ روز',
    price: '17900000$',
    originalPrice: '22000000',
    discount: '۱۸٪',
    rating: '۴.۸',
    reviews: '۱۲۳',
    image: '/images/tours/van-tour.jpg',
  },
  {
    slug: 'trabzon-tour',
    title: 'تور ترابزون',
    description: 'دریاچه اوزون گل و دریای سیاه، صومعه تاریخ÷ی و تفریحات دریایی',
    location: 'ترابزون، ترکیه',
    duration: '3 شب و 4 روز',
    price: '47000000',
    originalPrice: '52000000',
    discount: '۱۷٪',
    rating: '۴.۹',
    reviews: '۲۰۸',
    image: '/images/tours/trabzon-tour.jpg',
  },
  {
    slug: 'antalya-tour',
    title: 'تور آنتالیا',
    description: 'ساحل آبی مدیترانه، هتل‌های لوکس و تفریحات دریایی',
    location: 'آنتالیا، ترکیه',
    duration: '۶ شب و ۷ روز',
    price: '۷۵۰$',
    originalPrice: '۹۰۰$',
    discount: '۱۷٪',
    rating: '۴.۹',
    reviews: '۲۰۸',
    image: '/images/tours/antalya-tour.jpg',
  },
  {
    slug: 'istanbul-tour',
    title: 'تور استانبول',
    description: 'شهر دو قاره، تاریخ و مدرنیته در یک مقصد رویایی',
    location: 'استانبول، ترکیه',
    duration: '3 شب و 4 روز',
    price: '58000000',
    rating: '۴.۷',
    reviews: '۱۸۵',
    image: '/images/tours/istanbul-tour.jpg',
  },
];

const VALUES = [
  {
    title: 'مجوز رسمی گردشگری',
    desc: 'دارای مجوز کامل از سازمان میراث فرهنگی و عضو انجمن آژانس‌های مسافرتی',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    title: 'بهترین قیمت تضمینی',
    desc: 'ضمانت پایین‌ترین نرخ بازار با شفافیت کامل و بدون هزینه‌های پنهان',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'پشتیبانی ۲۴ ساعته',
    desc: 'تیم حرفه‌ای ما در تمام مراحل سفر در کنار شما هستند',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    title: 'تضمین کیفیت خدمات',
    desc: 'تورهای منتخب با بالاترین کیفیت هتل، پرواز و برنامه گردشگری',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
];

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                تجربه سفری فراموش نشدنی
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  سفر به{' '}
                  <span className="gradient-text">رویاهایت</span>
                  {' '}را با ما شروع کن
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  آتاش تراول با بیش از ۱۰ سال تجربه، بهترین تورهای خارجی را با برنامه‌ریزی دقیق، قیمت مناسب و پشتیبانی ۲۴ ساعته برای شما فراهم می‌کند
                </p>
              </div>

              {/* Search Box */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <SearchBox />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                      </svg>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/hero.jpg"
                    alt="سفر به مقاصد رویایی"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Floating Card */}
                  <div className="absolute bottom-6 right-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                        <span className="text-2xl">🏖️</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">پیشنهاد ویژه</h3>
                        <p className="text-sm text-gray-600">تور آنتالیا ۶ شب با تخفیف ویژه</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-orange-600 font-bold">۷۵۰$</span>
                          <span className="text-gray-400 text-sm line-through">۹۰۰$</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-2">
              <span>⭐</span>
              محبوب‌ترین تورها
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              تورهای پیشنهادی ما
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              برترین مقصدهای گردشگری را کشف کنید و سفر رویایی خود را با بهترین قیمت رزرو کنید
            </p>
          </div>

          {/* Tours Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_TOURS.map((tour) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="card group"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Discount Badge */}
                  {tour.discount && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-orange-500 text-white text-sm font-bold shadow-lg">
                      {tour.discount} تخفیف
                    </div>
                  )}
                  
                  {/* Favorite Button */}
                  <button className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{tour.location}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tour.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {tour.description}
                  </p>

                  {/* Rating & Reviews */}
                  {tour.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-gray-900">{tour.rating}</span>
                      </div>
                      <span className="text-gray-500 text-sm">({tour.reviews} نظر)</span>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{tour.duration}</span>
                    </div>
                    <div className="text-left">
                      {tour.originalPrice && (
                        <div className="text-gray-400 text-sm line-through">{tour.originalPrice}</div>
                      )}
                      <div className="text-xl font-bold text-blue-600">{tour.price}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="mt-12 text-center">
            <Link href="/tours" className="btn btn-outline btn-lg">
              مشاهده همه تورها
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-2">
              <span>✨</span>
              مزایای آتاش تراول
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              چرا آتاش تراول؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              با اطمینان و آرامش کامل سفر کنید
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              آماده برای شروع سفر بعدی خود هستید؟
            </h2>
            <p className="text-xl text-blue-100">
              همین حالا با مشاورین ما تماس بگیرید و بهترین تور را برای خود پیدا کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/989128637309"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                مشاوره رایگان در واتساپ
              </a>
              <Link
                href="/tours"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-700 text-white font-bold text-lg hover:bg-blue-800 transition-colors border-2 border-white/20"
              >
                مشاهده تورها
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">آتاش تراول</h3>
              <p className="text-sm leading-relaxed">
                بهترین تورهای خارجی با خدمات کامل و قیمت مناسب
              </p>
              <div className="flex gap-3">
                <a href="https://instagram.com/atashtravel" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://t.me/atashtravel" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.015-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.155.232.171.326.016.093.036.306.02.472z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">دسترسی سریع</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tours" className="hover:text-white transition-colors">تورها</Link></li>
                <li><Link href="/hotels" className="hover:text-white transition-colors">هتل‌ها</Link></li>
                <li><Link href="/visa" className="hover:text-white transition-colors">ویزا</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">درباره ما</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white mb-4">خدمات</h4>
              <ul className="space-y-2 text-sm">
                <li>رزرو هتل</li>
                <li>رزرو بلیط</li>
                <li>تور گروهی</li>
                <li>بیمه مسافرتی</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">تماس با ما</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span dir="ltr">+98 912 863 7309</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@atashtravel.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>© {new Date().getFullYear()} آتاش تراول — تمامی حقوق محفوظ است</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
