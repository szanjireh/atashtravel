'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { TrashIcon, PencilIcon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Hotel {
  id: string;
  name: string;
  slug: string;
  city?: string;
  starRating?: number;
  status: string;
  email?: string;
  createdAt: string;
}

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/hotels?limit=100');
      setHotels(response.data.data || []);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری هتل‌ها');
    } finally {
      setLoading(false);
    }
  };

  const deleteHotel = async (id: string) => {
    if (!confirm('آیا از حذف این هتل اطمینان دارید؟')) return;
    
    try {
      await apiClient.delete(`/hotels/${id}`);
      setHotels(hotels.filter(h => h.id !== id));
    } catch (err: any) {
      alert(err.message || 'خطا در حذف هتل');
    }
  };

  const toggleStatus = async (id: string, status: string) => {
    const newStatus = status === 'active' ? 'draft' : 'active';
    try {
      await apiClient.patch(`/hotels/${id}`, { status: newStatus });
      setHotels(hotels.map(h => h.id === id ? { ...h, status: newStatus } : h));
    } catch (err: any) {
      alert(err.message || 'خطا در بروزرسانی هتل');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
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
            onClick={loadHotels}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
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
            <h1 className="text-3xl font-bold text-gray-900">مدیریت هتل‌ها</h1>
            <p className="text-gray-600 mt-2">مشاهده و مدیریت تمام هتل‌های سایت</p>
          </div>
          <Link
            href="/admin/hotels/new"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            افزودن هتل جدید
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">تمام هتل‌ها</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{hotels.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">هتل‌های فعال</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {hotels.filter(h => h.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">پیش‌نویس</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {hotels.filter(h => h.status === 'draft').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">هتل‌های 5 ستاره</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {hotels.filter(h => h.starRating === 5).length}
            </p>
          </div>
        </div>

        {/* Hotels Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {hotels.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg">هنوز هتلی ثبت نشده است</p>
              <Link
                href="/admin/hotels/new"
                className="mt-4 inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                افزودن اولین هتل
              </Link>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    نام هتل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    شهر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    ستاره‌ها
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    ایمیل
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    وضعیت
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hotels.map(hotel => (
                  <tr key={hotel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                      <div className="text-sm text-gray-500">{hotel.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {hotel.city || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {'⭐'.repeat(hotel.starRating || 0)} {hotel.starRating || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {hotel.email || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(hotel.id, hotel.status)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          hotel.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {hotel.status === 'active' ? 'فعال' : 'پیش‌نویس'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/hotels/edit/${hotel.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="ویرایش"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteHotel(hotel.id)}
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                          title="حذف"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
              <span>سیستم رزرواسیون</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
