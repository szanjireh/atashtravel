'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface HotelFormData {
  name: string;
  slug: string;
  countryId: string;
  cityId?: string;
  address: string;
  starRating: number;
  description: string;
  checkInTime: string;
  checkOutTime: string;
  phone: string;
  email: string;
  website: string;
  status: string;
}

export default function HotelFormPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<HotelFormData>({
    name: '',
    slug: '',
    countryId: '',
    cityId: '',
    address: '',
    starRating: 3,
    description: '',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    phone: '',
    email: '',
    website: '',
    status: 'active',
  });

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setCountries([
        { id: '1', name: 'ترکیه' },
        { id: '2', name: 'ارمنستان' },
        { id: '3', name: 'گرجستان' },
      ]);
    } catch (err) {
      console.error('Error loading countries:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const payload = {
        ...formData,
        starRating: parseInt(formData.starRating.toString()),
      };

      await apiClient.post('/hotels', payload);
      alert('هتل با موفقیت ایجاد شد');
      router.push('/admin/hotels');
    } catch (err: any) {
      alert(err.response?.data?.message || 'خطا در ذخیره هتل');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-آ-ی]+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 rtl" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">افزودن هتل جدید</h1>
          <button
            onClick={() => router.push('/admin/hotels')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            بازگشت
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">
                  اطلاعات پایه
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نام هتل *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        generateSlug(e.target.value);
                      }}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="نام هتل را وارد کنید"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="slug-hote"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      کشور *
                    </label>
                    <select
                      required
                      value={formData.countryId}
                      onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">انتخاب کنید</option>
                      {countries.map(country => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رتبه ستاره‌ای
                    </label>
                    <select
                      value={formData.starRating}
                      onChange={(e) => setFormData({ ...formData, starRating: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      {[1, 2, 3, 4, 5].map(star => (
                        <option key={star} value={star}>{star} ستاره</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    آدرس
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="آدرس هتل"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="توضیحات بیشتر درباره هتل"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">
                  اطلاعات تماس
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      شماره تلفن
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="شماره تلفن"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ایمیل
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="ایمیل"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      وب‌سایت
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Check-in/out Times */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">
                  ساعات ورود و خروج
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ساعت ورود
                    </label>
                    <input
                      type="time"
                      value={formData.checkInTime}
                      onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ساعت خروج
                    </label>
                    <input
                      type="time"
                      value={formData.checkOutTime}
                      onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">
                  وضعیت
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وضعیت هتل
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="active">فعال</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-start gap-4 pt-6 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                >
                  {loading ? 'در حال ذخیره...' : 'ایجاد هتل'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/admin/hotels')}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  انصراف
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
