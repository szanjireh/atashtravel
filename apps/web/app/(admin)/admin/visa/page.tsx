'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { TrashIcon, PencilIcon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface VisaService {
  id: string;
  name: string;
  country?: string;
  processingDays?: number;
  price?: string;
  status: string;
  createdAt: string;
}

export default function AdminVisaPage() {
  const [visas, setVisas] = useState<VisaService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVisas();
  }, []);

  const loadVisas = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/visa?limit=100');
      setVisas(response.data.data || []);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری خدمات ویزا');
    } finally {
      setLoading(false);
    }
  };

  const deleteVisa = async (id: string) => {
    if (!confirm('آیا از حذف این سرویس ویزا اطمینان دارید؟')) return;
    
    try {
      await apiClient.delete(`/visa/${id}`);
      setVisas(visas.filter(v => v.id !== id));
    } catch (err: any) {
      alert(err.message || 'خطا در حذف سرویس');
    }
  };

  const toggleStatus = async (id: string, status: string) => {
    const newStatus = status === 'active' ? 'draft' : 'active';
    try {
      await apiClient.patch(`/visa/${id}`, { status: newStatus });
      setVisas(visas.map(v => v.id === id ? { ...v, status: newStatus } : v));
    } catch (err: any) {
      alert(err.message || 'خطا در بروزرسانی سرویس');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
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
            onClick={loadVisas}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
            <h1 className="text-3xl font-bold text-gray-900">مدیریت ویزا</h1>
            <p className="text-gray-600 mt-2">مشاهده و مدیریت تمام خدمات ویزا</p>
          </div>
          <Link
            href="/admin/visa/new"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            افزودن سرویس ویزا
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">تمام سرویس‌ها</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{visas.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">سرویس‌های فعال</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {visas.filter(v => v.status === 'active').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">پیش‌نویس</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {visas.filter(v => v.status === 'draft').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">میانگین مدت پردازش</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {visas.length > 0 ? Math.round(visas.reduce((acc, v) => acc + (v.processingDays || 0), 0) / visas.length) : 0} روز
            </p>
          </div>
        </div>

        {/* Visa Services Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {visas.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg">هنوز سرویس ویزایی ثبت نشده است</p>
              <Link
                href="/admin/visa/new"
                className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                افزودن اولین سرویس
              </Link>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    نام سرویس
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    کشور
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    مدت پردازش
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    قیمت
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
                {visas.map(visa => (
                  <tr key={visa.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{visa.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visa.country || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visa.processingDays ? `${visa.processingDays} روز` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {visa.price || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(visa.id, visa.status)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          visa.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {visa.status === 'active' ? 'فعال' : 'پیش‌نویس'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/visa/edit/${visa.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="ویرایش"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteVisa(visa.id)}
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
