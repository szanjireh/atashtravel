'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/services/auth.service';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'خطا در ورود');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">ورود به حساب کاربری</CardTitle>
          <CardDescription className="text-center">
            ایمیل و رمز عبور خود را وارد کنید
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                ایمیل
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                رمز عبور
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="text-sm text-right">
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                فراموشی رمز عبور
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'در حال ورود...' : 'ورود'}
            </Button>
            <div className="text-sm text-center text-gray-600">
              حساب کاربری ندارید؟{' '}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                ثبت‌نام کنید
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
