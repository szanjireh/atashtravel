interface TourServicesProps {
  included: string[];
  excluded: string[];
}

export default function TourServices({ included, excluded }: TourServicesProps) {
  return (
    <section className="py-16 px-6 sm:px-8 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            خدمات تور
          </h2>
          <p className="text-slate-400 text-lg">
            آنچه در قیمت تور شامل است و شامل نمی‌شود
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Included */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/20">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">شامل می‌شود</h3>
            </div>

            <div className="space-y-3">
              {included.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Excluded */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/5 border border-red-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-500/20">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">شامل نمی‌شود</h3>
            </div>

            <div className="space-y-3">
              {excluded.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
