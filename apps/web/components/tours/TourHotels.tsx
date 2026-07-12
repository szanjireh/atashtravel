import { Hotel } from '@/types/tour';

interface TourHotelsProps {
  hotels: Hotel[];
}

export default function TourHotels({ hotels }: TourHotelsProps) {
  return (
    <section className="py-16 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            هتل‌های پیشنهادی
          </h2>
          <p className="text-slate-400 text-lg">
            هتل‌هایی که در این تور اقامت خواهید داشت
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/20 transition-all"
            >
              {/* Hotel Name & Stars */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">{hotel.stars} ستاره</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-4 text-slate-400">
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{hotel.location}</span>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="text-sm text-slate-400 font-medium mb-2">امکانات:</div>
                <div className="flex flex-wrap gap-2">
                  {hotel.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm border border-cyan-500/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
