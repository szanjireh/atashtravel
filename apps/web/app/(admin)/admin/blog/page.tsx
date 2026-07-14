'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { TrashIcon, PencilIcon, PlusIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  published: boolean;
  featured: boolean;
  image?: string;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/blog?limit=100');
      setArticles(response.data.data || []);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری مقالات');
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('آیا از حذف این مقاله اطمینان دارید؟')) return;
    
    try {
      await apiClient.delete(`/blog/${id}`);
      setArticles(articles.filter(a => a.id !== id));
    } catch (err: any) {
      alert(err.message || 'خطا در حذف مقاله');
    }
  };

  const togglePublished = async (id: string, published: boolean) => {
    try {
      await apiClient.patch(`/blog/${id}`, { published: !published });
      setArticles(articles.map(a => a.id === id ? { ...a, published: !published } : a));
    } catch (err: any) {
      alert(err.message || 'خطا در بروزرسانی مقاله');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      await apiClient.patch(`/blog/${id}`, { featured: !featured });
      setArticles(articles.map(a => a.id === id ? { ...a, featured: !featured } : a));
    } catch (err: any) {
      alert(err.message || 'خطا در بروزرسانی مقاله');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
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
            onClick={loadArticles}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
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
            <h1 className="text-3xl font-bold text-gray-900">مدیریت مقالات</h1>
            <p className="text-gray-600 mt-2">مشاهده و مدیریت تمام مقالات وبلاگ</p>
          </div>
          <Link
            href="/admin/blog/new"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            نوشتن مقاله جدید
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">تمام مقالات</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{articles.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">مقالات منتشر شده</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {articles.filter(a => a.published).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">پیش‌نویس</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {articles.filter(a => !a.published).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">مقالات ویژه</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {articles.filter(a => a.featured).length}
            </p>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {articles.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg">هنوز مقاله‌ای نوشته نشده است</p>
              <Link
                href="/admin/blog/new"
                className="mt-4 inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              >
                نوشتن اولین مقاله
              </Link>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    تصویر
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    عنوان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    دسته‌بندی
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
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {article.image ? (
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="h-12 w-20 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-20 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">بدون تصویر</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500">{article.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {article.category || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => togglePublished(article.id, article.published)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          article.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {article.published ? 'منتشر' : 'پیش‌نویس'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(article.id, article.featured)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          article.featured
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {article.featured ? '⭐ ویژه' : 'عادی'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/blog/edit/${article.id}`}
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          title="ویرایش"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deleteArticle(article.id)}
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
