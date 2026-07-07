import apiClient from '@/lib/api-client';

export const tourService = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/tours', { params });
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await apiClient.get(`/tours/${id}`);
    return response.data;
  },

  getFeatured: async (limit = 6) => {
    const response = await apiClient.get('/tours/featured', {
      params: { limit },
    });
    return response.data;
  },

  getPopular: async (limit = 10) => {
    const response = await apiClient.get('/tours/popular', {
      params: { limit },
    });
    return response.data;
  },
};
