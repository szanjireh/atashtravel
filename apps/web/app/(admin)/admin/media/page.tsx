'use client';

import Link from 'next/link';
import { PhotoIcon, ArrowUpTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AdminMediaPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <PhotoIcon className="w-8 h-8 text-pink-600" />
              <h1 className="text-3xl font-bold text-gray-900">مدیریت رسانه</h1>
            </div>
            <p className="text-gray-600">آپلود و مدیریت تصاویر و فایل‌ها</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>بازگشت به داشبورد</span>
            </Link>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold"
            >
              <ArrowUpTrayIcon className="w-5 h-5" />
              آپلود فایل
            </button>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <PhotoIcon className="w-20 h-20 text-pink-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            بخش مدیریت رسانه
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            این بخش به زودی راه‌اندازی می‌شود. شما می‌توانید تصاویر، ویدیوها و سایر فایل‌های سایت را آپلود و مدیریت کنید.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>آپلود چندتایی</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>ویرایش تصاویر</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>مدیریت گالری</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <span>بهینه‌سازی حجم</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
