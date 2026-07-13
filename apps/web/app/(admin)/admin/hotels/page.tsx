'use client';

import Link from 'next/link';
import { BuildingOfficeIcon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AdminHotelsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <BuildingOfficeIcon className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl font-bold text-gray-900">مدیریت هتل‌ها</h1>
            </div>
            <p className="text-gray-600">مشاهده و مدیریت اطلاعات هتل‌ها</p>
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
              href="/admin/hotels/new"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              <PlusIcon className="w-5 h-5" />
              افزودن هتل جدید
            </Link>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <BuildingOfficeIcon className="w-20 h-20 text-purple-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            بخش مدیریت هتل‌ها
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            این بخش به زودی راه‌اندازی می‌شود. شما می‌توانید اطلاعات هتل‌ها، امکانات، تصاویر و رزرواسیون‌ها را مدیریت کنید.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>مدیریت اطلاعات هتل</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>آپلود تصاویر و گالری</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>مدیریت امکانات و خدمات</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <span>سیستم رزرواسیون</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
