'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DESTINATIONS = [
  { name: 'ترکیه', icon: '🇹🇷' },
  { name: 'دبی', icon: '🇦🇪' },
  { name: 'ارمنستان', icon: '🇦🇲' },
  { name: 'گرجستان', icon: '🇬🇪' },
];

const TOUR_TYPES = [
  'تور گروهی',
  'تور اختصاصی',
  'تور لوکس',
  'تور خانوادگی',
];

export default function SearchBox() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [tourType, setTourType] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (destination) params.append('destination', destination);
    if (tourType) params.append('type', tourType);
    if (date) params.append('date', date);
    
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            مقصد
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">انتخاب مقصد</option>
            {DESTINATIONS.map((dest) => (
              <option key={dest.name} value={dest.name}>
                {dest.icon} {dest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tour Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            نوع تور
          </label>
          <select
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="">انتخاب نوع تور</option>
            {TOUR_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            تاریخ
          </label>
          <input
            type="text"
            placeholder="انتخاب تاریخ"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full btn btn-primary btn-lg flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        جستجوی تور
      </button>
    </form>
  );
}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                placeholder="جستجو کنید..."
                className="w-full bg-slate-900/60 border border-white/10 rounded-xl py-2.5 pr-10 pl-3 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-900"
                autoFocus
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute left-3 p-1 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="پاک کردن"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </div>

            {/* Suggestions */}
            {(suggestions.length > 0 || !query) && (
              <div className="space-y-1">
                <div className="px-2 py-1.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {query ? 'نتایج پیشنهادی' : 'جستجوهای محبوب'}
                  </p>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-1">
                  {(query ? suggestions : allSuggestions.slice(0, 5)).map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-all duration-150 hover:bg-cyan-500/10 hover:text-cyan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 text-right"
                    >
                      <span className="text-slate-500">{suggestion}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            {query && (
              <button
                onClick={handleSearch}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-95 active:scale-95"
              >
                جستجو برای "{query}"
              </button>
            )}

            {/* Empty State */}
            {!query && suggestions.length === 0 && (
              <div className="text-center py-6">
                <p className="text-sm text-slate-400">شروع کنید تا نتایج را ببینید</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
