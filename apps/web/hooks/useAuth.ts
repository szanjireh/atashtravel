'use client';

import { useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  isVerified: boolean;
  status: string;
  preferredLanguage: string;
  preferredCurrency: string;

  // Added for RBAC
  roles: string[];
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();

  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isAuthenticated: false,
  });

  const loadUser = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        setAuthState({
          user: null,
          loading: false,
          error: null,
          isAuthenticated: false,
        });

        return;
      }

      const data = await authService.getMe();

      setAuthState({
        user: data.user,
        loading: false,
        error: null,
        isAuthenticated: true,
      });
    } catch (error: any) {
      console.error('Failed to load user:', error);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      setAuthState({
        user: null,
        loading: false,
        error: error.message || 'خطا در بارگذاری اطلاعات کاربر',
        isAuthenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      setAuthState({
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
      });

      router.replace('/login');
    }
  }, [router]);

  const refreshUser = useCallback(async () => {
    await loadUser();
  }, [loadUser]);

  const hasRole = useCallback(
    (role: string) => {
      return authState.user?.roles?.includes(role) ?? false;
    },
    [authState.user]
  );

  const hasPermission = useCallback(
    (permission: string) => {
      return authState.user?.permissions?.includes(permission) ?? false;
    },
    [authState.user]
  );

  const isAdmin = hasRole('admin');

  return {
    ...authState,
    logout,
    refreshUser,
    hasRole,
    hasPermission,
    isAdmin,
  };
}