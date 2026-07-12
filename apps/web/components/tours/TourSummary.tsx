import { TourData } from '@/types/tour';
import { Info, MapPin, Hotel, Bus } from 'lucide-react';

interface TourSummaryProps {
  tour: TourData;
}

export default function TourSummary({ tour }: TourSummaryProps) {
  return (
    <section className="py-16 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Main Description */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            درباره تور {tour.destination}
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {tour.fullDescription}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <MapPin className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">اطلاعات حرکت</h3>
                <p className="text-slate-400">{tour.departureInfo}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Hotel className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">اطلاعات هتل</h3>
                <p className="text-slate-400">{tour.hotelInfo}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-sm md:col-span-2">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Bus className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">حمل و نقل</h3>
                <p className="text-slate-400">{tour.transportation}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose This Tour */}
        <div className="mt-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            چرا این تور را انتخاب کنیم؟
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {tour.whyChoose.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 transition-colors"
              >
                <div className="mt-0.5">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-slate-300">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Time */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-sky-500/10 border border-cyan-500/20">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/20">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">بهترین زمان سفر</h3>
              <p className="text-slate-300">{tour.bestTime}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
