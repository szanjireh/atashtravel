'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import apiClient from '@/lib/api-client';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('لینک تایید نامعتبر است');
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await apiClient.post('/auth/verify-email', { token });
      setStatus('success');
      setMessage(response.data.message || 'ایمیل شما با موفقیت تایید شد');
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push('/login?verified=true');
      }, 3000);
    } catch (error: any) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'خطا در تایید ایمیل');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">تایید ایمیل</CardTitle>
          <CardDescription className="text-center">
            {status === 'verifying' && 'در حال تایید ایمیل شما...'}
            {status === 'success' && 'ایمیل شما با موفقیت تایید شد'}
            {status === 'error' && 'خطا در تایید ایمیل'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            {status === 'verifying' && (
              <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
            )}
            {status === 'success' && (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <p className="text-center text-gray-700">{message}</p>
                <p className="text-sm text-gray-500 text-center">
                  به صفحه ورود منتقل می‌شوید...
                </p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-red-100 p-4 rounded-full">
                  <XCircle className="h-16 w-16 text-red-600" />
                </div>
                <p className="text-center text-red-700">{message}</p>
              </div>
            )}
          </div>

          {status === 'error' && (
            <div className="flex flex-col gap-2">
              <Link href="/login">
                <Button variant="default" className="w-full">
                  بازگشت به صفحه ورود
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" className="w-full">
                  ثبت‌نام مجدد
                </Button>
              </Link>
            </div>
          )}

          {status === 'success' && (
            <Link href="/login?verified=true">
              <Button variant="default" className="w-full">
                ورود به حساب کاربری
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
