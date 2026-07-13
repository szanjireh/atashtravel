'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';

interface TourFormData {
  title: string;
  slug: string;
  destination: string;
  countryId: string;
  cityId?: string;
  duration: string;
  durationDays: number;
  durationNights: number;
  price: string;
  priceDetail: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  heroImage: string;
  galleryImages: string[];
  departureInfo: string;
  hotelInfo: string;
  transportation: string;
  whyChoose: string[];
  bestTime: string;
  attractions: { name: string; description: string }[];
  tips: string[];
  requiredDocuments: string[];
  faqs: { question: string; answer: string }[];
  servicesIncluded: string[];
  servicesExcluded: string[];
  hotels: { name: string; stars: number; location: string; features: string[] }[];
  itinerary: { day: number; title: string; activities: string[]; meals?: string }[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  seoOgImage: string;
  featured: boolean;
  status: string;
}

export default function TourFormPage({ params }: { params?: { id: string } }) {
  const router = useRouter();
  const isEdit = !!params?.id;
  
  const [formData, setFormData] = useState<TourFormData>({
    title: '',
    slug: '',
    destination: '',
    countryId: '',
    cityId: '',
    duration: '',
    durationDays: 0,
    durationNights: 0,
    price: '',
    priceDetail: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: '',
    heroImage: '',
    galleryImages: [],
    departureInfo: '',
    hotelInfo: '',
    transportation: '',
    whyChoose: [],
    bestTime: '',
    attractions: [],
    tips: [],
    requiredDocuments: [],
    faqs: [],
    servicesIncluded: [],
    servicesExcluded: [],
    hotels: [],
    itinerary: [],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
    seoOgImage: '',
    featured: false,
    status: 'draft',
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState('basic');

  useEffect(() => {
    loadCountries();
    if (isEdit) {
      loadTour();
    }
  }, []);

  const loadCountries = async () => {
    try {
      // Load countries - you'll need to implement this endpoint
      // For now using a simple list
      setCountries([
        { id: '1', name: 'ترکیه' },
        { id: '2', name: 'ارمنستان' },
        { id: '3', name: 'گرجستان' },
      ]);
    } catch (err) {
      console.error('Error loading countries:', err);
    }
  };

  const loadTour = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/tours/${params!.id}`);
      const tour = response.data;
      
      setFormData({
        title: tour.title || '',
        slug: tour.slug || '',
        destination: tour.destination || '',
        countryId: tour.countryId || '',
        cityId: tour.cityId || '',
        duration: tour.duration || '',
        durationDays: tour.durationDays || 0,
        durationNights: tour.durationNights || 0,
        price: tour.price || '',
        priceDetail: tour.priceDetail || '',
        shortDescription: tour.shortDescription || '',
        fullDescription: tour.fullDescription || '',
        coverImage: tour.coverImage || '',
        heroImage: tour.heroImage || '',
        galleryImages: tour.galleryImages || [],
        departureInfo: tour.departureInfo || '',
        hotelInfo: tour.hotelInfo || '',
        transportation: tour.transportation || '',
        whyChoose: tour.whyChoose || [],
        bestTime: tour.bestTime || '',
        attractions: tour.attractions || [],
        tips: tour.tips || [],
        requiredDocuments: tour.requiredDocuments || [],
        faqs: tour.faqs || [],
        servicesIncluded: tour.services?.filter((s: any) => s.included).map((s: any) => s.serviceName) || [],
        servicesExcluded: tour.excluded?.map((s: any) => s.serviceName) || [],
        hotels: tour.hotels || [],
        itinerary: tour.itineraries?.map((i: any) => ({
          day: i.dayNumber,
          title: i.title,
          activities: i.activities?.split('\n') || [],
          meals: i.meals,
        })) || [],
        seoTitle: tour.seoTitle || '',
        seoDescription: tour.seoDescription || '',
        seoKeywords: tour.seoKeywords || [],
        seoOgImage: tour.seoOgImage || '',
        featured: tour.featured || false,
        status: tour.status || 'draft',
      });
    } catch (err: any) {
      alert('خطا در بارگذاری اطلاعات تور');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async (file: File, field: string) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post('/upload/tour-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = response.data.url;
      
      if (field === 'gallery') {
        setFormData(prev => ({
          ...prev,
          galleryImages: [...prev.galleryImages, imageUrl],
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          [field]: imageUrl,
        }));
      }
    } catch (err: any) {
      alert(err.message || 'خطا در آپلود تصویر');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const payload = {
        ...formData,
        durationDays: parseInt(formData.durationDays.toString()),
        durationNights: parseInt(formData.durationNights.toString()),
      };

      if (isEdit) {
        await apiClient.patch(`/tours/${params!.id}`, payload);
        alert('تور با موفقیت بروزرسانی شد');
      } else {
        await apiClient.post('/tours', payload);
        alert('تور با موفقیت ایجاد شد');
      }

      router.push('/admin/tours');
    } catch (err: any) {
      alert(err.response?.data?.message || 'خطا در ذخیره تور');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-آ-ی]+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const addArrayItem = (field: keyof TourFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as any[]), value],
    }));
  };

  const removeArrayItem = (field: keyof TourFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as any[]).filter((_, i) => i !== index),
    }));
  };

  if (loading && isEdit) {
    return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {isEdit ? 'ویرایش تور' : 'افزودن تور جدید'}
          </h1>
          <button
            onClick={() => router.push('/admin/tours')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            بازگشت
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { key: 'basic', label: 'اطلاعات پایه' },
              { key: 'images', label: 'تصاویر' },
              { key: 'description', label: 'توضیحات' },
              { key: 'itinerary', label: 'برنامه سفر' },
              { key: 'services', label: 'خدمات' },
              { key: 'seo', label: 'سئو' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setCurrentTab(tab.key)}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  currentTab === tab.key
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Basic Info Tab */}
            {currentTab === 'basic' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      عنوان تور *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        if (!isEdit) generateSlug(e.target.value);
                      }}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      شناسه URL (Slug) *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مقصد *
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: وان"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      کشور *
                    </label>
                    <select
                      value={formData.countryId}
                      onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">انتخاب کنید</option>
                      {countries.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مدت زمان (متنی)
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: ۳ شب و ۴ روز"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تعداد روز *
                      </label>
                      <input
                        type="number"
                        value={formData.durationDays}
                        onChange={(e) => setFormData({ ...formData, durationDays: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        min="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تعداد شب *
                      </label>
                      <input
                        type="number"
                        value={formData.durationNights}
                        onChange={(e) => setFormData({ ...formData, durationNights: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      قیمت
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: ۴۵۰$"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      جزئیات قیمت
                    </label>
                    <input
                      type="text"
                      value={formData.priceDetail}
                      onChange={(e) => setFormData({ ...formData, priceDetail: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="مثال: قیمت به ازای هر نفر در اتاق دو تخته"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات کوتاه
                  </label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="توضیح کوتاه برای کارت تور..."
                  />
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded text-blue-600"
                    />
                    <span className="mr-2">تور ویژه</span>
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="draft">پیش‌نویس</option>
                    <option value="active">فعال</option>
                    <option value="inactive">غیرفعال</option>
                  </select>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {currentTab === 'images' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تصویر کاور
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'coverImage')}
                    className="w-full"
                    disabled={uploading}
                  />
                  {formData.coverImage && (
                    <img src={formData.coverImage} alt="Cover" className="mt-2 h-32 object-cover rounded" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تصویر هیرو
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleUploadImage(e.target.files[0], 'heroImage')}
                    className="w-full"
                    disabled={uploading}
                  />
                  {formData.heroImage && (
                    <img src={formData.heroImage} alt="Hero" className="mt-2 h-32 object-cover rounded" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    گالری تصاویر
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      files.forEach(file => handleUploadImage(file, 'gallery'));
                    }}
                    className="w-full"
                    disabled={uploading}
                  />
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {formData.galleryImages.map((img, i) => (
                      <div key={i} className="relative">
                        <img src={img} alt={`Gallery ${i}`} className="h-24 w-full object-cover rounded" />
                        <button
                          type="button"
                          onClick={() => removeArrayItem('galleryImages', i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Description Tab */}
            {currentTab === 'description' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات کامل
                  </label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اطلاعات حرکت
                  </label>
                  <textarea
                    value={formData.departureInfo}
                    onChange={(e) => setFormData({ ...formData, departureInfo: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اطلاعات هتل
                  </label>
                  <textarea
                    value={formData.hotelInfo}
                    onChange={(e) => setFormData({ ...formData, hotelInfo: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نوع حمل و نقل
                  </label>
                  <input
                    type="text"
                    value={formData.transportation}
                    onChange={(e) => setFormData({ ...formData, transportation: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    بهترین زمان سفر
                  </label>
                  <textarea
                    value={formData.bestTime}
                    onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {currentTab === 'seo' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان SEO
                  </label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={formData.title}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیحات SEO
                  </label>
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder={formData.shortDescription}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    کلمات کلیدی (با کاما جدا کنید)
                  </label>
                  <input
                    type="text"
                    value={formData.seoKeywords.join(', ')}
                    onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value.split(',').map(k => k.trim()) })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-end space-x-4 space-x-reverse mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.push('/admin/tours')}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                انصراف
              </button>
              <button
                type="submit"
                disabled={loading || uploading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'در حال ذخیره...' : (isEdit ? 'بروزرسانی تور' : 'ایجاد تور')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
