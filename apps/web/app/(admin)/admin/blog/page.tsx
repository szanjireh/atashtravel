'use client';

import Link from 'next/link';
import { NewspaperIcon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AdminBlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <NewspaperIcon className="w-8 h-8 text-orange-600" />
              <h1 className="text-3xl font-bold text-gray-900">مدیریت مقالات</h1>
            </div>
            <p className="text-gray-600">نوشتن و مدیریت مقالات وبلاگ</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>بازگشت به داشبورد</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
            >
              <PlusIcon className="w-5 h-5" />
              نوشتن مقاله جدید
            </Link>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <NewspaperIcon className="w-20 h-20 text-orange-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            بخش مدیریت مقالات
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            این بخش به زودی راه‌اندازی می‌شود. شما می‌توانید مقالات وبلاگ، راهنمای سفر و محتوای آموزشی را مدیریت کنید.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>نوشتن مقاله</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>دسته‌بندی محتوا</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>ویرایشگر پیشرفته</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
              <span>بهینه‌سازی SEO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
