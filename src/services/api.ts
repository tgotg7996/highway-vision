// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// =========================================
// API Client
// =========================================

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Try to load token from localStorage
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string | null)  {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  }

  // Generic CRUD methods
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

const apiClient = new ApiClient(API_BASE_URL);

// =========================================
// API Services
// =========================================

export const api = {
  // Set authentication token
  setToken: (token: string | null) => apiClient.setToken(token),

  // Algorithms API
  algorithms: {
    getAll: () => apiClient.get('/algorithms'),
    getById: (id: string) => apiClient.get(`/algorithms/${id}`),
    create: (data: any) => apiClient.post('/algorithms', data),
    update: (id: string, data: any) => apiClient.put(`/algorithms/${id}`, data),
    delete: (id: string) => apiClient.delete(`/algorithms/${id}`),
    toggle: (id: string) => apiClient.patch(`/algorithms/${id}/toggle`),
  },

  // Cameras API
  cameras: {
    getAll: (status?: string) => 
      apiClient.get(`/cameras${status ? `?status=${status}` : ''}`),
    getById: (id: string) => apiClient.get(`/cameras/${id}`),
    create: (data: any) => apiClient.post('/cameras', data),
    update: (id: string, data: any) => apiClient.put(`/cameras/${id}`, data),
    delete: (id: string) => apiClient.delete(`/cameras/${id}`),
    getStatus: (id: string) => apiClient.get(`/cameras/${id}/status`),
  },

  // Events API
  events: {
    getAll: (params?: {
      status?: string;
      risk_level?: string;
      page?: number;
      limit?: number;
      start_date?: string;
      end_date?: string;
    }) => {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, String(value));
          }
        });
      }
      return apiClient.get(`/events?${queryParams.toString()}`);
    },
    getStats: (start_date?: string, end_date?: string) => {
      const params = new URLSearchParams();
      if (start_date) params.append('start_date', start_date);
      if (end_date) params.append('end_date', end_date);
      return apiClient.get(`/events/stats?${params.toString()}`);
    },
    create: (data: any) => apiClient.post('/events', data),
    update: (id: string, data: any) => apiClient.put(`/events/${id}`, data),
    export: (params?: {
      status?: string;
      risk_level?: string;
      start_date?: string;
      end_date?: string;
    }) => {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams.append(key, String(value));
          }
        });
      }
      // For file download
      window.open(`${API_BASE_URL}/events/export?${queryParams.toString()}`, '_blank');
    },
  },

  // Users API
  users: {
    getAll: () => apiClient.get('/users'),
    getMe: () => apiClient.get('/users/me'),
    update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
    updatePermissions: (id: string, permissions: string[]) =>
      apiClient.patch(`/users/${id}/permissions`, { permissions }),
    delete: (id: string) => apiClient.delete(`/users/${id}`),
  },

  // Settings API
  settings: {
    getAll: () => apiClient.get('/settings'),
    update: (key: string, data: any) => apiClient.put(`/settings/${key}`, data),
    bulkUpdate: (settings: Record<string, any>) =>
      apiClient.put('/settings', settings),
  },

  // Notifications API
  notifications: {
    getAll: (is_read?: boolean, limit?: number) => {
      const params = new URLSearchParams();
      if (is_read !== undefined) params.append('is_read', String(is_read));
      if (limit) params.append('limit', String(limit));
      return apiClient.get(`/notifications?${params.toString()}`);
    },
    markAsRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
    markAllAsRead: () => apiClient.patch('/notifications/read-all'),
    delete: (id: string) => apiClient.delete(`/notifications/${id}`),
  },
};

export default api;
