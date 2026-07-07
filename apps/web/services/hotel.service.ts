import apiClient from '@/lib/api-client';

export const hotelService = {
  getAll: async (params?: any) => {
    const response = await apiClient.get('/hotels', { params });
    return response.data;
  },

  getOne: async (id: string) => {
    const response = await apiClient.get(`/hotels/${id}`);
    return response.data;
  },
};
