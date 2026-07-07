import apiClient from '@/lib/api-client';

export const bookingService = {
  create: async (data: any) => {
    const response = await apiClient.post('/bookings', data);
    return response.data;
  },

  getAll: async (params?: any) => {
    const response = await apiClient.get('/bookings', { params });
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  cancel: async (id: string) => {
    const response = await apiClient.delete(`/bookings/${id}`);
    return response.data;
  },
};
