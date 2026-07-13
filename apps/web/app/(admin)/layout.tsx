'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon,
  MapIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  NewspaperIcon, 
  PhotoIcon, 
  Cog6ToothIcon 
} from '@heroicons/react/24/outline';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'داشبورد', icon: HomeIcon },
    { href: '/admin/tours', label: 'تورها', icon: MapIcon },
    { href: '/admin/hotels', label: 'هتل‌ها', icon: BuildingOfficeIcon },
    { href: '/admin/visa', label: 'ویزا', icon: DocumentTextIcon },
    { href: '/admin/blog', label: 'مقالات', icon: NewspaperIcon },
    { href: '/admin/media', label: 'رسانه', icon: PhotoIcon },
    { href: '/admin/seo', label: 'SEO', icon: Cog6ToothIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/admin" className="flex items-center space-x-2 space-x-reverse">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                پنل مدیریت آتاش تراول
              </h1>
            </Link>
            <Link 
              href="/" 
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              مشاهده سایت
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center gap-2 overflow-x-auto pb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    active
                      ? 'bg-blue-600 text-white font-medium'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Admin Content */}
      <main>{children}</main>

      {/* Admin Footer */}
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>پنل مدیریت آتاش تراول © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
