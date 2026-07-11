'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import Header from '@/components/header';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'نام و نام خانوادگی الزامی است';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'ایمیل معتبر نیست';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'شماره تلفن الزامی است';
    }

    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 8) {
      newErrors.password = 'رمز عبور باید حداقل 8 کاراکتر باشد';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'تأیید رمز عبور الزامی است';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبورها مطابقت ندارند';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#030712]" dir="rtl">
      {/* Background Orbs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 to-sky-500/0 opacity-60 blur-[140px] animate-pulse" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent opacity-40 blur-[120px]" />

      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-88px)] px-4 py-12">
          <div className="w-full max-w-md">
            {/* Card */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/30 backdrop-blur-xl shadow-2xl p-8 sm:p-10 space-y-6">
              {/* Header */}
              <div className="space-y-3 text-center">
                <h1 className="text-3xl font-black text-white">ثبت‌نام</h1>
                <p className="text-sm text-slate-400">
                  اکنون عضو آتاش تراول شوید و بهترین تورها را رزرو کنید
                </p>
              </div>

              {success && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-center space-y-2">
                  <p className="text-sm font-semibold text-green-400">✓ ثبت‌نام موفق بود</p>
                  <p className="text-xs text-green-300">
                    برای تایید حساب، به ایمیل خود مراجعه کنید
                  </p>
                </div>
              )}

              {/* Form */}
              {!success && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-white/10 focus:ring-cyan-500/30 focus:border-cyan-500/50'
                      }`}
                      placeholder="محمد رضا خانی"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                      ایمیل
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
                        errors.email
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-white/10 focus:ring-cyan-500/30 focus:border-cyan-500/50'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                      شماره تلفن
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? 'border-red-500/50 focus:ring-red-500/30'
                          : 'border-white/10 focus:ring-cyan-500/30 focus:border-cyan-500/50'
                      }`}
                      placeholder="۰۹۱۲۱۲۳۴۵۶۷"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                      رمز عبور
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
                          errors.password
                            ? 'border-red-500/50 focus:ring-red-500/30'
                            : 'border-white/10 focus:ring-cyan-500/30 focus:border-cyan-500/50'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                      تأیید رمز عبور
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full bg-slate-950/60 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
                          errors.confirmPassword
                            ? 'border-red-500/50 focus:ring-red-500/30'
                            : 'border-white/10 focus:ring-cyan-500/30 focus:border-cyan-500/50'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-95 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                        در حال ثبت‌نام...
                      </>
                    ) : (
                      <>
                        ثبت‌نام اکنون
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Login Link */}
              <div className="text-center pt-4 border-t border-white/10">
                <p className="text-sm text-slate-400">
                  قبلاً ثبت‌نام کرده‌اید؟{' '}
                  <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                    وارد شوید
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-center text-xs text-slate-500 mt-6">
              با ثبت‌نام، شما شرایط و ضوابط ما را قبول می‌کنید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
        </form>
      </Card>
    </div>
  );
}
