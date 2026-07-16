'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Calendar, 
  Heart, 
  Settings, 
  LogOut, 
  MapPin, 
  CreditCard,
  Bell,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            آتاش تراول
          </Link>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="h-5 w-5 ml-2" />
            خروج
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            خوش آمدید، {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-600">
            به پنل کاربری خود در آتاش تراول خوش آمدید
          </p>
        </div>

        {/* Verification Status */}
        {!user.isVerified && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <XCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900">ایمیل شما تایید نشده است</h3>
              <p className="text-sm text-yellow-800 mt-1">
                لطفاً ایمیل خود را بررسی کرده و لینک تایید را کلیک کنید.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>پروفایل من</CardTitle>
                  <CardDescription>اطلاعات شخصی</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">نام:</span>
                  <span className="font-medium">{user.firstName} {user.lastName}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">ایمیل:</span>
                  <span className="font-medium text-xs">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">تلفن:</span>
                    <span className="font-medium">{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">وضعیت:</span>
                  <span className="flex items-center gap-1">
                    {user.isVerified ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">تایید شده</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 text-yellow-600" />
                        <span className="text-yellow-600 font-medium">در انتظار تایید</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
              <Link href="/dashboard/profile">
                <Button variant="outline" className="w-full mt-4">
                  مشاهده و ویرایش
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* My Bookings Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>رزرو‌های من</CardTitle>
                  <CardDescription>تورها و خدمات رزرو شده</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                مشاهده و مدیریت رزرو‌های فعال و گذشته
              </p>
              <Link href="/dashboard/bookings">
                <Button variant="outline" className="w-full">
                  مشاهده رزرو‌ها
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* My Tours Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>تورهای من</CardTitle>
                  <CardDescription>سفرهای انجام شده و آینده</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                تمام تورهای ثبت شده شما
              </p>
              <Link href="/dashboard/tours">
                <Button variant="outline" className="w-full">
                  مشاهده تورها
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Wishlist Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <CardTitle>علاقه‌مندی‌ها</CardTitle>
                  <CardDescription>تورهای مورد علاقه</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                لیست تورهای مورد علاقه شما
              </p>
              <Link href="/dashboard/wishlist">
                <Button variant="outline" className="w-full">
                  مشاهده لیست
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Wallet Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <CardTitle>کیف پول</CardTitle>
                  <CardDescription>موجودی و تراکنش‌ها</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                مدیریت موجودی و پرداخت‌ها
              </p>
              <Link href="/dashboard/wallet">
                <Button variant="outline" className="w-full">
                  مشاهده کیف پول
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-full">
                  <Settings className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <CardTitle>تنظیمات</CardTitle>
                  <CardDescription>تنظیمات حساب کاربری</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                امنیت، رمز عبور و تنظیمات
              </p>
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full">
                  تنظیمات
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600 mt-1">رزرو فعال</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">0</p>
                <p className="text-sm text-gray-600 mt-1">سفر انجام شده</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">0</p>
                <p className="text-sm text-gray-600 mt-1">تور مورد علاقه</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
