'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  siteUrl: string;
  socialMediaUrls: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    telegram?: string;
  };
  analyticsId?: string;
  googleSearchConsoleId?: string;
  robots: string;
  sitemapUrl: string;
}

export default function AdminSEOPage() {
  const [settings, setSettings] = useState<SEOSettings>({
    siteTitle: 'آتاش تراول',
    siteDescription: 'سفرهای خواموشانه، تورهای سفر، رزرواسیون هتل و خدمات ویزا',
    siteKeywords: 'تور، سفر، ویزا، هتل',
    siteUrl: 'https://atashtravel.com',
    socialMediaUrls: {},
    robots: 'index, follow',
    sitemapUrl: 'https://atashtravel.com/sitemap.xml',
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [currentTab, setCurrentTab] = useState('basic');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await apiClient.get('/seo/settings');
      setSettings(response.data.data);
    } catch (err) {
      console.error('Error loading SEO settings:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await apiClient.post('/seo/settings', settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      alert(err.response?.data?.message || 'خطا در ذخیره تنظیمات');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">تنظیمات SEO</h1>
            <p className="text-gray-600 mt-2">بهینه‌سازی سایت برای موتورهای جستجو</p>
          </div>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            ✓ تنظیمات با موفقیت ذخیره شدند
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="flex border-b overflow-x-auto">
            <button
              type="button"
              onClick={() => setCurrentTab('basic')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                currentTab === 'basic'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              اطلاعات پایه
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab('social')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                currentTab === 'social'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              شبکه‌های اجتماعی
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab('advanced')}
              className={`px-4 py-3 font-medium whitespace-nowrap ${
                currentTab === 'advanced'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              تنظیمات پیشرفته
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Tab */}
            {currentTab === 'basic' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان سایت *
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.siteTitle}
                    onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="عنوان سایت"
                  />
                  <p className="text-xs text-gray-500 mt-1">نمایش داده می‌شود در برگه مرورگر</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    توضیح سایت *
                  </label>
                  <textarea
                    required
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="توضیحی کوتاه درباره سایت"
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    حداکثر 160 کاراکتر (برای نمایش در نتایج جستجو)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    کلمات کلیدی
                  </label>
                  <input
                    type="text"
                    value={settings.siteKeywords}
                    onChange={(e) => setSettings({ ...settings, siteKeywords: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="کلمات کلیدی را با کاما جدا کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    آدرس سایت *
                  </label>
                  <input
                    type="url"
                    required
                    value={settings.siteUrl}
                    onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            )}

            {/* Social Tab */}
            {currentTab === 'social' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    فیس‌بوک
                  </label>
                  <input
                    type="url"
                    value={settings.socialMediaUrls?.facebook || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialMediaUrls: { ...settings.socialMediaUrls, facebook: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    اینستاگرام
                  </label>
                  <input
                    type="url"
                    value={settings.socialMediaUrls?.instagram || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialMediaUrls: { ...settings.socialMediaUrls, instagram: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تویتر
                  </label>
                  <input
                    type="url"
                    value={settings.socialMediaUrls?.twitter || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialMediaUrls: { ...settings.socialMediaUrls, twitter: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://twitter.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تلگرام
                  </label>
                  <input
                    type="url"
                    value={settings.socialMediaUrls?.telegram || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      socialMediaUrls: { ...settings.socialMediaUrls, telegram: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://t.me/..."
                  />
                </div>
              </div>
            )}

            {/* Advanced Tab */}
            {currentTab === 'advanced' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Robots Meta Tag
                  </label>
                  <input
                    type="text"
                    value={settings.robots}
                    onChange={(e) => setSettings({ ...settings, robots: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="index, follow"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    مثال: index, follow یا noindex, nofollow
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sitemap URL
                  </label>
                  <input
                    type="url"
                    value={settings.sitemapUrl}
                    onChange={(e) => setSettings({ ...settings, sitemapUrl: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settings.analyticsId || ''}
                    onChange={(e) => setSettings({ ...settings, analyticsId: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="UA-..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Search Console ID
                  </label>
                  <input
                    type="text"
                    value={settings.googleSearchConsoleId || ''}
                    onChange={(e) => setSettings({ ...settings, googleSearchConsoleId: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Meta tag content"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {loading ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <span>تحلیل کلمات کلیدی</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
