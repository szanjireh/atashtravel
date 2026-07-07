'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { tourService } from '@/services/tour.service';

export default function ToursPage() {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    loadTours();
  }, [page]);

  const loadTours = async () => {
    try {
      setLoading(true);
      const response = await tourService.getAll({ page, limit: 12 });
      setTours(response.data);
      setMeta(response.meta);
    } catch (error) {
      console.error('خطا در بارگذاری تورها:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              آتش تراول
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/tours" className="text-gray-700 hover:text-blue-600">
                تورها
              </Link>
              <Link href="/hotels" className="text-gray-700 hover:text-blue-600">
                هتل‌ها
              </Link>
              <Link href="/login">
                <Button>ورود / ثبت‌نام</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">تورهای گردشگری</h1>

        {tours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">هیچ توری یافت نشد</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tours.map((tour) => (
                <Link key={tour.id} href={`/tours/${tour.slug || tour.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    {tour.images?.[0] && (
                      <div className="aspect-video bg-gray-200 rounded-t-xl overflow-hidden">
                        <img
                          src={tour.images[0].url}
                          alt={tour.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{tour.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {tour.destination?.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">مدت زمان</div>
                          <div className="font-semibold">
                            {tour.duration} {tour.durationType === 'days' ? 'روز' : 'ساعت'}
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm text-gray-600">قیمت از</div>
                          <div className="font-bold text-blue-600">
                            {tour.priceAdult?.toLocaleString()} تومان
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  قبلی
                </Button>
                <div className="flex items-center px-4">
                  صفحه {page} از {meta.totalPages}
                </div>
                <Button
                  variant="outline"
                  disabled={page === meta.totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  بعدی
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
