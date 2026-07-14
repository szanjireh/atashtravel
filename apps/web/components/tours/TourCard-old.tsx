import Link from 'next/link';
import Image from 'next/image';
import { TourData } from '@/types/tour';

interface TourCardProps {
  tour: TourData;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Overlay Badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-sm text-xs font-bold text-cyan-400 border border-cyan-500/30">
          {tour.country}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 space-y-4">
        {/* Destination Badge */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{tour.destination}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
          {tour.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 flex-1">
          {tour.shortDescription}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.duration}</span>
          </div>
          <div className="text-left">
            <div className="text-xs text-slate-400">شروع قیمت از</div>
            <div className="text-lg font-bold text-cyan-400">{tour.price}</div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-sky-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-sm transition-all duration-200 group-hover:from-cyan-500 group-hover:to-sky-500 group-hover:text-slate-950 group-hover:border-transparent">
          مشاهده جزئیات تور
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </Link>
  );
}
