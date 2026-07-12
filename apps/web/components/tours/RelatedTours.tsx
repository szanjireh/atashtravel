import Link from 'next/link';
import { TourData } from '@/types/tour';

interface RelatedToursProps {
  tours: TourData[];
}

export default function RelatedTours({ tours }: RelatedToursProps) {
  if (tours.length === 0) return null;

  return (
    <section className="py-16 px-6 sm:px-8 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            تورهای مشابه
          </h2>
          <p className="text-slate-400 text-lg">
            سایر تورهایی که ممکن است برای شما جالب باشد
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="group block p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Image Placeholder */}
              <div className="relative h-48 mb-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-12 h-12 text-cyan-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {tour.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2">
                  {tour.shortDescription}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {tour.duration}
                </div>
                <div className="text-cyan-400 font-bold">
                  {tour.price}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center justify-center gap-2 text-cyan-400 group-hover:gap-3 transition-all">
                <span className="text-sm font-medium">مشاهده جزئیات</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
