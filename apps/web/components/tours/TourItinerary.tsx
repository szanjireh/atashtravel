import { ItineraryDay } from '@/types/tour';

interface TourItineraryProps {
  itinerary: ItineraryDay[];
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
  return (
    <section className="py-16 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            برنامه سفر
          </h2>
          <p className="text-slate-400 text-lg">
            برنامه روزانه تور به تفکیک
          </p>
        </div>

        <div className="space-y-6">
          {itinerary.map((day, index) => (
            <div
              key={day.day}
              className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/20 transition-all"
            >
              {/* Day Number */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <span className="text-slate-950 font-bold text-lg">
                  {day.day}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-4 mr-10">
                {day.title}
              </h3>

              {/* Activities */}
              <div className="space-y-3 mb-4">
                {day.activities.map((activity, actIndex) => (
                  <div key={actIndex} className="flex items-start gap-3">
                    <div className="mt-1.5">
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                    <p className="text-slate-300">{activity}</p>
                  </div>
                ))}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
                {day.meals && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>وعده‌های غذایی: {day.meals}</span>
                  </div>
                )}
                {day.accommodation && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>اقامت: {day.accommodation}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
