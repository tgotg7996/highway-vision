-- =====================================================
-- Seed Data for Digital Eye Smart Highway AI
-- =====================================================
-- 初始测试数据
-- =====================================================

-- Insert sample algorithms
INSERT INTO algorithms (name, description, accuracy, status, icon, color, type) VALUES
  ('火焰检测', '实时监测高速路段火灾隐患', 94.5, 'online', 'Flame', '#ef4444', 'safety'),
  ('车辆识别', '智能识别车牌和车型信息', 96.8, 'online', 'Car', '#3b82f6', 'traffic'),
  ('行人检测', '监测服务区人员活动异常', 89.2, 'online', 'UserX', '#f59e0b', 'safety'),
  ('路障识别', '自动识别路面障碍物', 91.7, 'offline', 'TrafficCone', '#8b5cf6', 'safety'),
  ('垃圾检测', '检测路面垃圾和杂物', 87.3, 'online', 'Trash2', '#10b981', 'environment'),
  ('安全帽识别', '监测施工人员安全帽佩戴', 93.1, 'online', 'HardHat', '#f97316', 'safety'),
  ('烟雾检测', '识别异常烟雾和雾霾', 88.6, 'offline', 'CloudFog', '#6366f1', 'environment');

-- Insert sample camera feeds
INSERT INTO camera_feeds (name, location, ip, latency, status, uptime, last_online, stream_url) VALUES
  ('服务区入口1', 'K128+500 服务区入口', '192.168.1.101', '12ms', 'online', '99.8%', NOW(), 'rtsp://192.168.1.101/stream1'),
  ('服务区出口1', 'K128+800 服务区出口', '192.168.1.102', '15ms', 'online', '99.5%', NOW(), 'rtsp://192.168.1.102/stream1'),
  ('停车场A区', 'K128+600 停车场A区', '192.168.1.103', '18ms', 'online', '98.9%', NOW(), 'rtsp://192.168.1.103/stream1'),
  ('停车场B区', 'K128+650 停车场B区', '192.168.1.104', '22ms', 'warning', '97.2%', NOW() - INTERVAL '5 minutes', 'rtsp://192.168.1.104/stream1'),
  ('加油站区域', 'K128+700 加油站', '192.168.1.105', '16ms', 'online', '99.1%', NOW(), 'rtsp://192.168.1.105/stream1'),
  ('餐饮区', 'K128+720 餐饮区', '192.168.1.106', '14ms', 'online', '99.6%', NOW(), 'rtsp://192.168.1.106/stream1'),
  ('卫生间区域', 'K128+740 卫生间', '192.168.1.107', '25ms', 'offline', '95.4%', NOW() - INTERVAL '2 hours', 'rtsp://192.168.1.107/stream1'),
  ('应急车道', 'K129+000 应急车道', '192.168.1.108', '13ms', 'online', '99.7%', NOW(), 'rtsp://192.168.1.108/stream1');

-- Insert sample event logs (recent events)
INSERT INTO event_logs (time, location, type, risk_level, status, camera_id, algorithm_id, description) VALUES
  (NOW() - INTERVAL '5 minutes', 'K128+500 服务区入口', '车辆违停', 'medium', 'pending', 
    (SELECT id FROM camera_feeds WHERE name = '服务区入口1' LIMIT 1),
    (SELECT id FROM algorithms WHERE name = '车辆识别' LIMIT 1),
    '检测到车辆在入口长时间停留'),
  
  (NOW() - INTERVAL '15 minutes', 'K128+700 加油站', '烟雾异常', 'high', 'handled',
    (SELECT id FROM camera_feeds WHERE name = '加油站区域' LIMIT 1),
    (SELECT id FROM algorithms WHERE name = '烟雾检测' LIMIT 1),
    '加油站区域检测到异常烟雾，已处理'),
  
  (NOW() - INTERVAL '1 hour', 'K128+600 停车场A区', '垃圾遗留', 'low', 'observing',
    (SELECT id FROM camera_feeds WHERE name = '停车场A区' LIMIT 1),
    (SELECT id FROM algorithms WHERE name = '垃圾检测' LIMIT 1),
    '停车场发现垃圾堆积'),
  
  (NOW() - INTERVAL '2 hours', 'K128+720 餐饮区', '人员聚集', 'medium', 'handled',
    (SELECT id FROM camera_feeds WHERE name = '餐饮区' LIMIT 1),
    (SELECT id FROM algorithms WHERE name = '行人检测' LIMIT 1),
    '餐饮区人员密度过高'),
  
  (NOW() - INTERVAL '3 hours', 'K129+000 应急车道', '路障检测', 'high', 'handled',
    (SELECT id FROM camera_feeds WHERE name = '应急车道' LIMIT 1),
    (SELECT id FROM algorithms WHERE name = '路障识别' LIMIT 1),
    '应急车道发现障碍物，已清除');

-- Insert default system settings
INSERT INTO system_settings (key, value, category, description) VALUES
  ('alert_threshold_high', '{"value": 80, "unit": "score"}', 'alerts', '高风险告警阈值'),
  ('alert_threshold_medium', '{"value": 50, "unit": "score"}', 'alerts', '中风险告警阈值'),
  ('video_retention_days', '{"value": 30, "unit": "days"}', 'storage', '视频保留天数'),
  ('auto_alert_enabled', '{"value": true}', 'system', '自动告警开关'),
  ('notification_channels', '{"value": ["email", "sms", "system"]}', 'notifications', '通知渠道'),
  ('max_camera_latency', '{"value": 50, "unit": "ms"}', 'monitoring', '最大可接受延迟'),
  ('report_auto_generate', '{"value": true, "schedule": "daily"}', 'reports', '自动生成报告');

-- Note: User profiles will be created automatically when users sign up
-- For testing, you can create a test admin user after enabling Supabase Auth
