interface TourTipsProps {
  tips: string[];
  requiredDocuments: string[];
}

export default function TourTips({ tips, requiredDocuments }: TourTipsProps) {
  return (
    <section className="py-16 px-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Travel Tips */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-sky-500/5 border border-cyan-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">نکات سفر</h3>
            </div>

            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-300">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-yellow-500/20">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">مدارک لازم</h3>
            </div>

            <div className="space-y-3">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-slate-300">{doc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <p className="text-sm text-yellow-300">
                <strong>توجه:</strong> لطفا تمام مدارک را قبل از سفر آماده کنید و حداقل ۲ هفته قبل از تاریخ حرکت به ما تحویل دهید.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
