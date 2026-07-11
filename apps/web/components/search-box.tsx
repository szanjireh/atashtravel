'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Mock search suggestions - Replace with API call if needed
  const allSuggestions = [
    'تور وان - ترکیه',
    'تور آنتالیا - ترکیه',
    'تور ارمنستان',
    'بلیط هواپیما',
    'رزرو هتل',
    'بیمه مسافرتی',
    'ویزا و مدارک',
  ];

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  }, [query, router]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    setIsOpen(false);
    setQuery('');
  }, [router]);

  // Update suggestions based on input
  useEffect(() => {
    if (query.trim()) {
      const filtered = allSuggestions.filter(s =>
        s.includes(query) || query.split(' ').some(word => s.includes(word))
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={searchRef} className="relative">
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-200 transition-all duration-200 hover:bg-slate-800 hover:border-cyan-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
        aria-label="جستجو"
        aria-expanded={isOpen}
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Search Panel */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 w-96 max-w-[calc(100vw-1rem)] rounded-2xl border border-white/10 bg-[#030712]/95 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="p-4 space-y-3">
            {/* Search Input */}
            <div className="relative flex items-center gap-2">
              <Search className="h-4 w-4 text-slate-400 absolute right-3 pointer-events-none" />
              <input
                type="text"
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
