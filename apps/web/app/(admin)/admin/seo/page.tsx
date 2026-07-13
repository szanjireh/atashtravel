'use client';

import Link from 'next/link';
import { Cog6ToothIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AdminSEOPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Cog6ToothIcon className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-900">تنظیمات SEO</h1>
            </div>
            <p className="text-gray-600">بهینه‌سازی سایت برای موتورهای جستجو</p>
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>بازگشت به داشبورد</span>
          </Link>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Cog6ToothIcon className="w-20 h-20 text-indigo-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            بخش تنظیمات SEO
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            این بخش به زودی راه‌اندازی می‌شود. شما می‌توانید تنظیمات سئو، متا تگ‌ها و بهینه‌سازی محتوا را مدیریت کنید.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>متا تگ‌ها</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Schema Markup</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>Sitemap و Robots</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>تحلیل کلمات کلیدی</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
