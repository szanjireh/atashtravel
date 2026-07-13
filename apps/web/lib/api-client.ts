import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });

        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.tokens.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Tour API functions
export const tourApi = {
  // Get all tours
  async getAll(params?: { page?: number; limit?: number; search?: string; status?: string }) {
    const response = await apiClient.get('/tours', { params });
    return response.data;
  },

  // Get single tour by slug or ID
  async getOne(slugOrId: string) {
    const response = await apiClient.get(`/tours/${slugOrId}`);
    return response.data;
  },

  // Get featured tours
  async getFeatured(limit = 6) {
    const response = await apiClient.get('/tours/featured', { params: { limit } });
    return response.data;
  },

  // Create tour (admin)
  async create(data: any) {
    const response = await apiClient.post('/tours', data);
    return response.data;
  },

  // Update tour (admin)
  async update(id: string, data: any) {
    const response = await apiClient.patch(`/tours/${id}`, data);
    return response.data;
  },

  // Delete tour (admin)
  async delete(id: string) {
    const response = await apiClient.delete(`/tours/${id}`);
    return response.data;
  },
};

// Upload API functions
export const uploadApi = {
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post('/upload/tour-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async uploadImages(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    const response = await apiClient.post('/upload/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default apiClient;
