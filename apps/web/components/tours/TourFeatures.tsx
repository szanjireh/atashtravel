import { Attraction } from '@/types/tour';

interface TourFeaturesProps {
  attractions: Attraction[];
}

export default function TourFeatures({ attractions }: TourFeaturesProps) {
  return (
    <section className="py-16 px-6 sm:px-8 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            جاذبه‌های گردشگری
          </h2>
          <p className="text-slate-400 text-lg">
            مکان‌های دیدنی که در این تور بازدید خواهید کرد
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/20 group-hover:from-cyan-500/30 group-hover:to-sky-500/30 transition-colors">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">
                {attraction.name}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {attraction.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
