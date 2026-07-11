'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search } from 'lucide-react';

const NAV_LINKS = [
  { label: 'خانه', href: '#home' },
  { label: 'تورها', href: '#tours' },
  { label: 'خدمات', href: '#services' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '#contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 text-xl font-bold text-white tracking-tight group flex-shrink-0">
          <div className="relative h-11 w-11 overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-[1px] ring-1 ring-white/10 shadow-xl transition-transform duration-300 group-hover:scale-105">
            <div className="relative h-full w-full bg-slate-950 rounded-2xl overflow-hidden">
              <Image src="/images/logo2.png" alt="آتاش تراول" fill className="object-cover" priority />
            </div>
          </div>
          <span className="bg-gradient-to-l from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            آتاش تراول
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-cyan-400 relative py-1 after:absolute after:bottom-0 after:right-0 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <Link
            href="/search"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-200 transition-all hover:bg-slate-800 hover:border-cyan-500/30 hover:text-cyan-400"
            aria-label="جستجو"
          >
            <Search className="h-5 w-5" />
          </Link>

          {/* Sign Up Button - Desktop */}
          <Link
            href="/register"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-sm font-semibold text-slate-950 transition-all duration-200 hover:opacity-95 hover:scale-[1.02] active:scale-95 shadow-lg shadow-cyan-500/20"
          >
            ثبت‌نام
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-200 transition-all hover:bg-slate-800 md:hidden"
            aria-label={isMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={isMenuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full border-b border-white/5 bg-[#030712]/95 backdrop-blur-lg px-6 py-5 sm:px-8 md:hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3 text-slate-300 transition-all hover:bg-cyan-500/10 hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}

            {/* Sign Up Button - Mobile */}
            <Link
              href="/register"
              onClick={() => setIsMenuOpen(false)}
              className="mt-3 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-sm font-semibold text-slate-950 transition-all duration-200 hover:opacity-95"
            >
              ثبت‌نام
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
