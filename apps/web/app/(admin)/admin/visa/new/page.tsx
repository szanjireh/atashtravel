'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface VisaRequirement {
  title: string;
  description: string;
}

interface VisaFormData {
  countryId: string;
  name: string;
  processingDays: number;
  price: string;
  currency: string;
  requirements: VisaRequirement[];
}

export default function VisaFormPage({ params }: { params?: { id: string } }) {
  const router = useRouter();
  const isEdit = !!params?.id;
  
  const [formData, setFormData] = useState<VisaFormData>({
    countryId: '',
    name: '',
    processingDays: 7,
    price: '',
    currency: 'USD',
    requirements: [],
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [countries, setCountries] = useState<any[]>([]);
  const [newRequirement, setNewRequirement] = useState({ title: '', description: '' });

  useEffect(() => {
    loadCountries();
    if (isEdit) {
      loadVisa();
    }
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

  const loadVisa = async () => {
    try {
      setInitialLoading(true);
      const response = await apiClient.get(`/visa/${params?.id}`);
      setFormData(response.data.data);
    } catch (err) {
      console.error('Error loading visa:', err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const payload = {
        ...formData,
        processingDays: parseInt(formData.processingDays.toString()),
        price: parseFloat(formData.price),
      };

      if (isEdit) {
        await apiClient.patch(`/visa/${params?.id}`, payload);
        alert('سرویس ویزا با موفقیت بروزرسانی شد');
      } else {
        await apiClient.post('/visa', payload);
        alert('سرویس ویزا با موفقیت ایجاد شد');
      }
      router.push('/admin/visa');
    } catch (err: any) {
      alert(err.response?.data?.message || 'خطا در ذخیره سرویس ویزا');
    } finally {
      setLoading(false);
    }
  };

  const addRequirement = () => {
    if (newRequirement.title.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, newRequirement],
      }));
      setNewRequirement({ title: '', description: '' });
    }
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 rtl" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {isEdit ? 'ویرایش سرویس ویزا' : 'افزودن سرویس ویزا'}
          </h1>
          <button
            onClick={() => router.push('/admin/visa')}
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
                      کشور *
                    </label>
                    <select
                      required
                      value={formData.countryId}
                      onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
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
                      نام نوع ویزا *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="مثال: ویزای توریستی، ویزای کاری"
                    />
                  </div>
                </div>
              </div>

              {/* Processing and Pricing */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">
                  مدت زمان و قیمت
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مدت زمان پردازش (روز) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.processingDays}
                      onChange={(e) => setFormData({ ...formData, processingDays: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      قیمت *
                    </label>
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ارز
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="IRR">IRR</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b">
                  مدارک مورد نیاز
                </h2>

                <div className="space-y-3">
                  {formData.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-start"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{req.title}</p>
                        {req.description && (
                          <p className="text-sm text-gray-600 mt-1">{req.description}</p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="mr-4 text-red-600 hover:text-red-700"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mt-4 pt-4 border-t">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      عنوان مدرک
                    </label>
                    <input
                      type="text"
                      value={newRequirement.title}
                      onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="مثال: پاسپورت، تصویر"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      توضیحات
                    </label>
                    <textarea
                      value={newRequirement.description}
                      onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                      rows={2}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="جزئیات اضافی"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={addRequirement}
                    className="w-full px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-medium"
                  >
                    اضافه کردن مدرک
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-start gap-4 pt-6 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'در حال ذخیره...' : isEdit ? 'بروزرسانی سرویس' : 'ایجاد سرویس'}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/admin/visa')}
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
