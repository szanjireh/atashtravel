'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { apiClient } from '@/lib/api-client';
import { TrashIcon, ArrowLeftIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/media?limit=100');
      setMedia(response.data.data || []);
    } catch (err: any) {
      setError(err.message || 'خطا در بارگذاری فایل‌ها');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    try {
      setUploading(true);
      const formData = new FormData();
      
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const response = await apiClient.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMedia([...response.data.data, ...media]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      alert(err.message || 'خطا در آپلود فایل');
    } finally {
      setUploading(false);
    }
  };

  const deleteMedia = async (id: string) => {
    if (!confirm('آیا از حذف این فایل اطمینان دارید؟')) return;
    
    try {
      await apiClient.delete(`/media/${id}`);
      setMedia(media.filter(m => m.id !== id));
    } catch (err: any) {
      alert(err.message || 'خطا در حذف فایل');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
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
            onClick={loadMedia}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
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
            <h1 className="text-3xl font-bold text-gray-900">مدیریت رسانه</h1>
            <p className="text-gray-600 mt-2">آپلود و مدیریت تصاویر و فایل‌های سایت</p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            {uploading ? 'در حال آپلود...' : 'آپلود فایل'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">تمام فایل‌ها</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{media.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">تصاویر</p>
            <p className="text-3xl font-bold text-pink-600 mt-2">
              {media.filter(m => m.type.startsWith('image')).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm">حجم کل</p>
            <p className="text-3xl font-bold text-pink-600 mt-2">
              {formatFileSize(media.reduce((acc, m) => acc + m.size, 0))}
            </p>
          </div>
        </div>

        {/* Media Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {media.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">هنوز فایلی آپلود نشده است</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-block px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
              >
                آپلود فایل اول
              </button>
            </div>
          ) : (
            <div>
              <div className="px-6 py-4 border-b">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
                  <div className="col-span-1">تصویر</div>
                  <div className="col-span-4">نام فایل</div>
                  <div className="col-span-2">نوع</div>
                  <div className="col-span-2">حجم</div>
                  <div className="col-span-2">تاریخ</div>
                  <div className="col-span-1">عملیات</div>
                </div>
              </div>
              <div className="divide-y">
                {media.map(file => (
                  <div key={file.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        {file.type.startsWith('image') && (
                          <img 
                            src={file.url} 
                            alt={file.name}
                            className="h-10 w-10 object-cover rounded"
                          />
                        )}
                        {!file.type.startsWith('image') && (
                          <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                            {file.type.split('/')[1]?.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="col-span-4">
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate"
                        >
                          {file.name}
                        </a>
                      </div>
                      <div className="col-span-2 text-sm text-gray-600">
                        {file.type}
                      </div>
                      <div className="col-span-2 text-sm text-gray-600">
                        {formatFileSize(file.size)}
                      </div>
                      <div className="col-span-2 text-sm text-gray-600">
                        {new Date(file.uploadedAt).toLocaleDateString('fa-IR')}
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => deleteMedia(file.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded transition"
                          title="حذف"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
