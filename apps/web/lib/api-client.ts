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

// Hotel API functions
export const hotelApi = {
  async getAll(params?: { page?: number; limit?: number; search?: string; status?: string }) {
    const response = await apiClient.get('/hotels', { params });
    return response.data;
  },

  async getOne(slugOrId: string) {
    const response = await apiClient.get(`/hotels/${slugOrId}`);
    return response.data;
  },

  async create(data: any) {
    const response = await apiClient.post('/hotels', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await apiClient.patch(`/hotels/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/hotels/${id}`);
    return response.data;
  },

  async updateStatus(id: string, status: string) {
    const response = await apiClient.patch(`/hotels/${id}/status`, { status });
    return response.data;
  },
};

// Visa API functions
export const visaApi = {
  async getAll(params?: { page?: number; limit?: number; search?: string; status?: string }) {
    const response = await apiClient.get('/visa', { params });
    return response.data;
  },

  async getOne(slugOrId: string) {
    const response = await apiClient.get(`/visa/${slugOrId}`);
    return response.data;
  },

  async getFeatured(limit = 6) {
    const response = await apiClient.get('/visa/featured', { params: { limit } });
    return response.data;
  },

  async create(data: any) {
    const response = await apiClient.post('/visa', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await apiClient.patch(`/visa/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/visa/${id}`);
    return response.data;
  },

  async updateStatus(id: string, status: string) {
    const response = await apiClient.patch(`/visa/${id}/status`, { status });
    return response.data;
  },
};

// Blog API functions
export const blogApi = {
  async getAll(params?: { page?: number; limit?: number; search?: string; status?: string; published?: boolean }) {
    const response = await apiClient.get('/blog', { params });
    return response.data;
  },

  async getOne(slugOrId: string) {
    const response = await apiClient.get(`/blog/${slugOrId}`);
    return response.data;
  },

  async getFeatured(limit = 6) {
    const response = await apiClient.get('/blog/featured', { params: { limit } });
    return response.data;
  },

  async create(data: any) {
    const response = await apiClient.post('/blog', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await apiClient.patch(`/blog/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/blog/${id}`);
    return response.data;
  },

  async togglePublish(id: string, published: boolean) {
    const response = await apiClient.patch(`/blog/${id}/publish`, { published });
    return response.data;
  },

  async toggleFeatured(id: string, featured: boolean) {
    const response = await apiClient.patch(`/blog/${id}/featured`, { featured });
    return response.data;
  },
};

// Media API functions
export const mediaApi = {
  async getAll(params?: { page?: number; limit?: number; type?: string; folder?: string }) {
    const response = await apiClient.get('/media', { params });
    return response.data;
  },

  async getOne(id: string) {
    const response = await apiClient.get(`/media/${id}`);
    return response.data;
  },

  async upload(file: File, folder?: string, alt?: string, caption?: string) {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);
    if (alt) formData.append('alt', alt);
    if (caption) formData.append('caption', caption);
    
    const response = await apiClient.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/media/${id}`);
    return response.data;
  },
};

// SEO API functions
export const seoApi = {
  async getAll(params?: { page?: number; limit?: number; search?: string }) {
    const response = await apiClient.get('/seo', { params });
    return response.data;
  },

  async getOne(id: string) {
    const response = await apiClient.get(`/seo/${id}`);
    return response.data;
  },

  async getByPage(page: string) {
    const response = await apiClient.get(`/seo/page/${page}`);
    return response.data;
  },

  async create(data: any) {
    const response = await apiClient.post('/seo', data);
    return response.data;
  },

  async update(id: string, data: any) {
    const response = await apiClient.patch(`/seo/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    const response = await apiClient.delete(`/seo/${id}`);
    return response.data;
  },
};

export default apiClient;
