'use client';

import Link from 'next/link';
import { 
  MapIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  NewspaperIcon, 
  PhotoIcon, 
  Cog6ToothIcon,
  ChartBarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface DashboardCard {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
  color: string;
  stats?: string;
}

export default function AdminDashboardPage() {
  const dashboardSections: DashboardCard[] = [
    {
      title: 'مدیریت تورها',
      description: 'مشاهده، ویرایش و افزودن تورهای سفر داخلی و خارجی',
      icon: MapIcon,
      link: '/admin/tours',
      color: 'blue',
      stats: 'مدیریت تمام تورها'
    },
    {
      title: 'مدیریت هتل‌ها',
      description: 'مدیریت اطلاعات هتل‌ها، امکانات و رزرواسیون',
      icon: BuildingOfficeIcon,
      link: '/admin/hotels',
      color: 'purple',
      stats: 'هتل‌های داخلی و خارجی'
    },
    {
      title: 'مدیریت ویزا',
      description: 'مدیریت خدمات ویزا، مدارک و فرآیندهای درخواست',
      icon: DocumentTextIcon,
      link: '/admin/visa',
      color: 'green',
      stats: 'انواع ویزای مسافرتی'
    },
    {
      title: 'مدیریت مقالات',
      description: 'نوشتن و مدیریت مقالات وبلاگ و راهنمای سفر',
      icon: NewspaperIcon,
      link: '/admin/blog',
      color: 'orange',
      stats: 'مقالات و راهنماها'
    },
    {
      title: 'مدیریت رسانه',
      description: 'آپلود و مدیریت تصاویر، ویدیوها و فایل‌های سایت',
      icon: PhotoIcon,
      link: '/admin/media',
      color: 'pink',
      stats: 'تصاویر و ویدیوها'
    },
    {
      title: 'تنظیمات SEO',
      description: 'مدیریت تنظیمات سئو، متا تگ‌ها و بهینه‌سازی سایت',
      icon: Cog6ToothIcon,
      link: '/admin/seo',
      color: 'indigo',
      stats: 'بهینه‌سازی موتور جستجو'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        hover: 'hover:bg-blue-100',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        hover: 'hover:bg-purple-100',
        button: 'bg-purple-600 hover:bg-purple-700'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'text-green-600',
        hover: 'hover:bg-green-100',
        button: 'bg-green-600 hover:bg-green-700'
      },
      orange: {
        bg: 'bg-orange-50',
        icon: 'text-orange-600',
        hover: 'hover:bg-orange-100',
        button: 'bg-orange-600 hover:bg-orange-700'
      },
      pink: {
        bg: 'bg-pink-50',
        icon: 'text-pink-600',
        hover: 'hover:bg-pink-100',
        button: 'bg-pink-600 hover:bg-pink-700'
      },
      indigo: {
        bg: 'bg-indigo-50',
        icon: 'text-indigo-600',
        hover: 'hover:bg-indigo-100',
        button: 'bg-indigo-600 hover:bg-indigo-700'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                داشبورد مدیریت
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                خوش آمدید به پنل مدیریت آتاش تراول - مدیریت کامل وبسایت
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <span className="text-sm font-medium">مشاهده سایت</span>
              <ArrowLeftIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">بازدید امروز</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <ChartBarIcon className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">رزرو امروز</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <DocumentTextIcon className="w-10 h-10 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">تورهای فعال</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <MapIcon className="w-10 h-10 text-purple-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">هتل‌های ثبت شده</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <BuildingOfficeIcon className="w-10 h-10 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">بخش‌های مدیریت</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardSections.map((section) => {
              const colors = getColorClasses(section.color);
              const Icon = section.icon;
              
              return (
                <div
                  key={section.link}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg ${colors.hover}`}
                >
                  <div className="p-6">
                    {/* Icon */}
                    <div className={`w-14 h-14 ${colors.bg} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${colors.icon}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {section.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {section.description}
                    </p>

                    {/* Stats Badge */}
                    {section.stats && (
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {section.stats}
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Link
                      href={section.link}
                      className={`inline-flex items-center justify-center w-full px-4 py-2.5 ${colors.button} text-white rounded-lg transition font-medium text-sm`}
                    >
                      ورود به بخش
                      <ArrowLeftIcon className="w-4 h-4 mr-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">دسترسی سریع</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/admin/tours/new"
              className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center"
            >
              <MapIcon className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">افزودن تور</span>
            </Link>
            <Link
              href="/admin/hotels/new"
              className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center"
            >
              <BuildingOfficeIcon className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">افزودن هتل</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="flex flex-col items-center justify-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition text-center"
            >
              <NewspaperIcon className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">نوشتن مقاله</span>
            </Link>
            <Link
              href="/admin/media"
              className="flex flex-col items-center justify-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition text-center"
            >
              <PhotoIcon className="w-8 h-8 text-pink-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">آپلود فایل</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
