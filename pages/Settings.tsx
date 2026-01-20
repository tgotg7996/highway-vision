import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Monitor,
  Save,
  Shield,
  Globe,
  Clock,
  Mail
} from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      weeklyReport: false,
      criticalOnly: false,
    },
    display: {
      language: 'zh-CN',
      timezone: 'Asia/Shanghai',
      theme: 'dark',
      compactMode: false,
    },
    system: {
      autoRefresh: true,
      refreshInterval: 30,
      enableLogs: true,
      debugMode: false,
    }
  });

  const handleSave = () => {
    console.log('保存设置:', settings);
    // TODO: 实际保存到后端
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-grey-1900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
          全局设置
          <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider font-mono">
            Settings
          </span>
        </h1>
        <p className="text-secondary text-sm">配置系统参数和个人偏好设置</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Notifications Settings */}
        <div className="bg-grey-1800 border border-border-color rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="text-white font-heading font-semibold text-lg">通知设置</h3>
              <p className="text-muted text-sm">管理系统通知和提醒方式</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-grey-1700 rounded-lg">
              <div>
                <p className="text-white font-medium mb-1">邮件提醒</p>
                <p className="text-muted text-sm">接收重要事件的邮件通知</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.emailAlerts}
                  onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, emailAlerts: e.target.checked}})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-grey-1600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-grey-1700 rounded-lg">
              <div>
                <p className="text-white font-medium mb-1">推送通知</p>
                <p className="text-muted text-sm">在浏览器中显示桌面通知</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.pushNotifications}
                  onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, pushNotifications: e.target.checked}})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-grey-1600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-grey-1700 rounded-lg">
              <div>
                <p className="text-white font-medium mb-1">每周报告</p>
                <p className="text-muted text-sm">每周一接收汇总报告</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.notifications.weeklyReport}
                  onChange={(e) => setSettings({...settings, notifications: {...settings.notifications, weeklyReport: e.target.checked}})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-grey-1600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-grey-1800 border border-border-color rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20">
              <Monitor size={20} />
            </div>
            <div>
              <h3 className="text-white font-heading font-semibold text-lg">显示设置</h3>
              <p className="text-muted text-sm">调整界面显示和语言偏好</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-secondary text-sm font-medium mb-2 flex items-center gap-2">
                <Globe size={16} />
                语言
              </label>
              <select 
                value={settings.display.language}
                onChange={(e) => setSettings({...settings, display: {...settings.display, language: e.target.value}})}
                className="w-full bg-grey-1700 border border-border-color rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
              >
                <option value="zh-CN" className="bg-grey-1700 text-white">简体中文</option>
                <option value="en-US" className="bg-grey-1700 text-white">English</option>
              </select>
            </div>

            <div>
              <label className="text-secondary text-sm font-medium mb-2 flex items-center gap-2">
                <Clock size={16} />
                时区
              </label>
              <select 
                value={settings.display.timezone}
                onChange={(e) => setSettings({...settings, display: {...settings.display, timezone: e.target.value}})}
                className="w-full bg-grey-1700 border border-border-color rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
              >
                <option value="Asia/Shanghai" className="bg-grey-1700 text-white">北京时间 (UTC+8)</option>
                <option value="UTC" className="bg-grey-1700 text-white">协调世界时 (UTC)</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-grey-1800 border border-border-color rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20">
              <SettingsIcon size={20} />
            </div>
            <div>
              <h3 className="text-white font-heading font-semibold text-lg">系统设置</h3>
              <p className="text-muted text-sm">系统运行参数配置</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-grey-1700 rounded-lg">
              <div>
                <p className="text-white font-medium mb-1">自动刷新</p>
                <p className="text-muted text-sm">自动更新数据显示</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.system.autoRefresh}
                  onChange={(e) => setSettings({...settings, system: {...settings.system, autoRefresh: e.target.checked}})}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-grey-1600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-grey-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            {settings.system.autoRefresh && (
              <div className="p-4 bg-grey-1700 rounded-lg">
                <label className="text-white font-medium mb-3 block">刷新间隔</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="10" 
                    max="120" 
                    step="10"
                    value={settings.system.refreshInterval}
                    onChange={(e) => setSettings({...settings, system: {...settings.system, refreshInterval: parseInt(e.target.value)}})}
                    className="flex-1 h-2 bg-grey-1600 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="text-data font-mono text-sm w-16 text-right">{settings.system.refreshInterval}秒</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-4">
          <button className="bg-grey-1700 hover:bg-grey-1600 border border-border-color text-white px-6 py-2.5 rounded-lg font-medium transition-all cursor-pointer">
            重置
          </button>
          <button 
            onClick={handleSave}
            className="bg-primary hover:bg-primary-hover text-grey-1900 px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg cursor-pointer"
          >
            <Save size={18} />
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
