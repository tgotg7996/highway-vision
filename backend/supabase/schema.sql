-- =====================================================
-- Digital Eye Smart Highway AI - Database Schema
-- =====================================================
-- 数字慧眼·智慧高速AI监测系统 - 数据库表结构
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. Algorithms Table (AI算法表)
-- =====================================================
CREATE TABLE IF NOT EXISTS algorithms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  accuracy DECIMAL(5,2) CHECK (accuracy >= 0 AND accuracy <= 100),
  status VARCHAR(20) CHECK (status IN ('online', 'offline')) DEFAULT 'offline',
  icon VARCHAR(50),
  color VARCHAR(20),
  type VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. Camera Feeds Table (摄像头设备表)
-- =====================================================
CREATE TABLE IF NOT EXISTS camera_feeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  location VARCHAR(200) NOT NULL,
  ip VARCHAR(50),
  latency VARCHAR(20),
  status VARCHAR(20) CHECK (status IN ('online', 'offline', 'warning')) DEFAULT 'offline',
  thumbnail TEXT,
  uptime VARCHAR(50),
  last_online TIMESTAMPTZ,
  stream_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. Event Logs Table (事件告警日志表)
-- =====================================================
CREATE TABLE IF NOT EXISTS event_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  time TIMESTAMPTZ DEFAULT NOW(),
  location VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  risk_level VARCHAR(20) CHECK (risk_level IN ('high', 'medium', 'low')) DEFAULT 'low',
  status VARCHAR(20) CHECK (status IN ('handled', 'pending', 'observing')) DEFAULT 'pending',
  camera_id UUID REFERENCES camera_feeds(id) ON DELETE SET NULL,
  algorithm_id UUID REFERENCES algorithms(id) ON DELETE SET NULL,
  description TEXT,
  snapshot_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. User Profiles Table (用户扩展信息表)
-- =====================================================
-- Note: Supabase Auth handles core authentication
-- This table extends user information
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(50) CHECK (role IN ('admin', 'operator', 'viewer')) DEFAULT 'viewer',
  status VARCHAR(20) CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  permissions TEXT[], -- Array of permission strings
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. System Settings Table (系统设置表)
-- =====================================================
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category VARCHAR(50),
  description TEXT,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. Notifications Table (通知记录表)
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  event_id UUID REFERENCES event_logs(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. Reports Table (报告元数据表)
-- =====================================================
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  type VARCHAR(50),
  date_range_start TIMESTAMPTZ,
  date_range_end TIMESTAMPTZ,
  generated_by UUID REFERENCES auth.users(id),
  file_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Indexes for Performance
-- =====================================================
CREATE INDEX idx_event_logs_time ON event_logs(time DESC);
CREATE INDEX idx_event_logs_status ON event_logs(status);
CREATE INDEX idx_event_logs_risk_level ON event_logs(risk_level);
CREATE INDEX idx_camera_feeds_status ON camera_feeds(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- =====================================================
-- Updated At Trigger Function
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_algorithms_updated_at BEFORE UPDATE ON algorithms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_camera_feeds_updated_at BEFORE UPDATE ON camera_feeds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_logs_updated_at BEFORE UPDATE ON event_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE algorithms ENABLE ROW LEVEL SECURITY;
ALTER TABLE camera_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Algorithms: Read access for all authenticated users, write for admins
CREATE POLICY "Algorithms are viewable by authenticated users"
  ON algorithms FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Algorithms are editable by admins"
  ON algorithms FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Camera Feeds: Read access for all authenticated users, write for admins and operators
CREATE POLICY "Camera feeds are viewable by authenticated users"
  ON camera_feeds FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Camera feeds are editable by admins and operators"
  ON camera_feeds FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'operator')
    )
  );

-- Event Logs: Read access for all authenticated users, write for system
CREATE POLICY "Event logs are viewable by authenticated users"
  ON event_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Event logs are editable by admins and operators"
  ON event_logs FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('admin', 'operator')
    )
  );

-- User Profiles: Users can view all, but only edit their own (admins can edit all)
CREATE POLICY "User profiles are viewable by authenticated users"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can manage all profiles"
  ON user_profiles FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- System Settings: Only admins can modify
CREATE POLICY "Settings are viewable by authenticated users"
  ON system_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Settings are editable by admins only"
  ON system_settings FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Notifications: Users can only see their own
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Reports: All authenticated users can view, admins can create
CREATE POLICY "Reports are viewable by authenticated users"
  ON reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Reports are creatable by admins"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
