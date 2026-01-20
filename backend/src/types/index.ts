export interface Algorithm {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  status: 'online' | 'offline';
  icon: string;
  color: string;
  type: string;
  created_at?: string;
  updated_at?: string;
}

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  ip?: string;
  latency?: string;
  status: 'online' | 'offline' | 'warning';
  thumbnail?: string;
  uptime?: string;
  last_online?: string;
  stream_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface EventLog {
  id: string;
  time: string;
  location: string;
  type: string;
  risk_level: 'high' | 'medium' | 'low';
  status: 'handled' | 'pending' | 'observing';
  camera_id?: string;
  algorithm_id?: string;
  description?: string;
  snapshot_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  status: 'active' | 'inactive';
  permissions?: string[];
  last_login?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: any; // JSONB
  category?: string;
  description?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type?: string;
  is_read: boolean;
  event_id?: string;
  created_at?: string;
}

export interface Report {
  id: string;
  title: string;
  type?: string;
  date_range_start?: string;
  date_range_end?: string;
  generated_by?: string;
  file_url?: string;
  metadata?: any; // JSONB
  created_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
