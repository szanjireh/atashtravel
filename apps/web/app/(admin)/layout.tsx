'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HomeIcon,
  MapIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  NewspaperIcon,
  PhotoIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    loading,
    isAuthenticated,
    logout, // باید در useAuth وجود داشته باشد
  } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }

    // جلوگیری از ورود کاربران غیرادمین
    if (user?.roles && !user.roles.includes('admin')) {
      router.replace('/403');
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (user?.roles && !user.roles.includes('admin')) {
    return null;
  }

  const navItems = [
    {
      href: '/admin',
      label: 'داشبورد',
      icon: HomeIcon,
    },
    {
      href: '/admin/tours',
      label: 'تورها',
      icon: MapIcon,
    },
    {
      href: '/admin/hotels',
      label: 'هتل‌ها',
      icon: BuildingOfficeIcon,
    },
    {
      href: '/admin/visa',
      label: 'ویزا',
      icon: DocumentTextIcon,
    },
    {
      href: '/admin/blog',
      label: 'مقالات',
      icon: NewspaperIcon,
    },
    {
      href: '/admin/media',
      label: 'رسانه',
      icon: PhotoIcon,
    },
    {
      href: '/admin/seo',
      label: 'SEO',
      icon: Cog6ToothIcon,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }

    return pathname?.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="mb-4 flex items-center justify-between">
            <Link
              href="/admin"
              className="flex items-center space-x-2 space-x-reverse"
            >
              <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
                پنل مدیریت آتاش تراول
              </h1>
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName ?? ''}`
                  : user?.email}
              </span>

              <Link
                href="/dashboard"
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm transition hover:bg-gray-200"
              >
                پنل کاربری
              </Link>

              <Link
                href="/"
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm transition hover:bg-gray-200"
              >
                مشاهده سایت
              </Link>

              <button
                onClick={logout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
              >
                خروج
              </button>
            </div>
          </div>

          <nav className="flex items-center gap-2 overflow-x-auto pb-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 transition ${
                    active
                      ? 'bg-blue-600 font-medium text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-12 border-t bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-600">
          <p>
            پنل مدیریت آتاش تراول © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}