'use client';

import { useState } from 'react';
import { FAQ } from '@/types/tour';
import { ChevronDown } from 'lucide-react';

interface TourFAQProps {
  faqs: FAQ[];
}

export default function TourFAQ({ faqs }: TourFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 px-6 sm:px-8 bg-gradient-to-b from-transparent to-white/[0.02]">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            سوالات متداول
          </h2>
          <p className="text-slate-400 text-lg">
            پاسخ به سوالات پرتکرار درباره این تور
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-right hover:bg-white/[0.03] transition-colors"
              >
                <h3 className="text-lg font-semibold text-white flex-1">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-slate-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
