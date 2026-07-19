'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

interface Tour {
  id: string;
  title: string;
  slug: string;
  destination?: string;
  price?: string;
  status: string;
  featured: boolean;
  coverImage?: string;
  createdAt: string;
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/tours?limit=100');
      setTours(response.data.data?.data || []);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری تورها');
    } finally {
      setLoading(false);
    }
  };

  const deleteTour = async (id: string) => {
    if (!confirm('آیا از حذف این تور اطمینان دارید؟')) return;
    
    try {
      await apiClient.delete(`/tours/${id}`);
      setTours(tours.filter(t => t.id !== id));
    } catch (err: any) {
      alert(err.message || 'خطا در حذف تور');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      await apiClient.patch(`/tours/${id}`, { featured: !featured });
      setTours(tours.map(t => t.id === id ? { ...t, featured: !featured } : t));
    } catch (err: any) {
      alert(err.message || 'خطا در بروزرسانی تور');
    }
  };

  const toggleStatus = async (id: string, status: string) => {
    const newStatus = status === 'active' ? 'draft' : 'active';
    try {
      await apiClient.patch(`/tours/${id}`, { status: newStatus });
      setTours(tours.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (err: any) {
      alert(err.message || 'خطا در بروزرسانی تور');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl font-bold">خطا</p>
          <p className="mt-2">{error}</p>
          <button 
            onClick={loadTours}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">مدیریت تورها</h1>
            <p className="text-gray-600 mt-2">مشاهده و مدیریت تمام تورهای سایت</p>
          </div>
          <Link
            href="/admin/tours/new"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            افزودن تور جدید
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">تمام تورها</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{tours.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">تورهای فعال</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {tours.filter(t => t.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">پیش‌نویس</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {tours.filter(t => t.status === 'draft').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">تورهای ویژه</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {tours.filter(t => t.featured).length}
            </p>
          </div>
        </div>

        {/* Tours Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  تصویر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  عنوان تور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  مقصد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  قیمت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  وضعیت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  ویژه
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tours.map(tour => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {tour.coverImage ? (
                      <img 
                        src={tour.coverImage} 
                        alt={tour.title}
                        className="h-12 w-20 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-400 text-xs">بدون تصویر</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{tour.title}</div>
                    <div className="text-sm text-gray-500">{tour.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.destination || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tour.price || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(tour.id, tour.status)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tour.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {tour.status === 'active' ? 'فعال' : 'پیش‌نویس'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFeatured(tour.id, tour.featured)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        tour.featured
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tour.featured ? 'ویژه' : 'عادی'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 space-x-reverse">
                    <Link
                      href={`/tours/${tour.slug}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-900 ml-3"
                    >
                      مشاهده
                    </Link>
                    <Link
                      href={`/admin/tours/edit/${tour.id}`}
                      className="text-indigo-600 hover:text-indigo-900 ml-3"
                    >
                      ویرایش
                    </Link>
                    <button
                      onClick={() => deleteTour(tour.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tours.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">هنوز توری اضافه نشده است</p>
              <Link
                href="/admin/tours/new"
                className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                افزودن تور جدید
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
