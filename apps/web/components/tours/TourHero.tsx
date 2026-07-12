import Image from 'next/image';
import { Clock, DollarSign } from 'lucide-react';

interface TourHeroProps {
  title: string;
  shortDescription: string;
  heroImage: string;
  duration: string;
  price: string;
  destination: string;
}

export default function TourHero({
  title,
  shortDescription,
  heroImage,
  duration,
  price,
  destination,
}: TourHeroProps) {
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/60 via-[#030712]/40 to-[#030712]" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Destination Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {destination}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            {shortDescription}
          </p>

          {/* Info Cards */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Clock className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-xs text-slate-400">مدت زمان</div>
                <div className="text-white font-semibold">{duration}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <DollarSign className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-xs text-slate-400">شروع قیمت از</div>
                <div className="text-white font-semibold">{price}</div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/30"
          >
            رزرو تور
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px]" />
    </section>
  );
}
