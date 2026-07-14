'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api-client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  published: boolean;
  featured: boolean;
  tags: string[];
}

export default function BlogFormPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    category: 'سفر',
    image: '',
    published: false,
    featured: false,
    tags: [],
  });

  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('basic');
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const payload = {
        ...formData,
      };

      await apiClient.post('/blog', payload);
      alert('مقاله با موفقیت ایجاد شد');
      router.push('/admin/blog');
    } catch (err: any) {
      alert(err.response?.data?.message || 'خطا در ذخیره مقاله');
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

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 rtl" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">نوشتن مقاله جدید</h1>
          <button
            onClick={() => router.push('/admin/blog')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            بازگشت
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { key: 'basic', label: 'اطلاعات پایه' },
              { key: 'content', label: 'محتوا' },
              { key: 'seo', label: 'SEO و تنظیمات' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setCurrentTab(tab.key)}
                className={`px-6 py-4 font-medium whitespace-nowrap ${
                  currentTab === tab.key
                    ? 'border-b-2 border-orange-600 text-orange-600'
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
                      عنوان مقاله *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                        generateSlug(e.target.value);
                      }}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="عنوان مقاله"
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
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="slug-maqale"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      دسته‌بندی
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="سفر">سفر</option>
                      <option value="هتل">هتل</option>
                      <option value="ویزا">ویزا</option>
                      <option value="نکات">نکات سفر</option>
                      <option value="خبر">خبر</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تصویر شاخص
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="URL تصویر"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    خلاصه مقاله *
                  </label>
                  <textarea
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                    placeholder="خلاصه کوتاهی از مقاله"
                  />
                </div>

                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">منتشر شده</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">برجسته</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Content Tab */}
            {currentTab === 'content' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    محتوای مقاله *
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={12}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                    placeholder="محتوای مقاله را بنویسید..."
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    از Markdown برای قالب‌بندی استفاده کنید
                  </p>
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {currentTab === 'seo' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    برچسب‌ها (Tags)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="برچسب را بنویسید و Enter بزنید"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                    >
                      اضافه
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="text-orange-600 hover:text-orange-800"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex justify-start gap-4 mt-8 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {loading ? 'در حال ذخیره...' : 'ایجاد مقاله'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/blog')}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                انصراف
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
