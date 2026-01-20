import React, { useState } from 'react';
import { X, Bell, AlertTriangle, Info, CheckCircle, ExternalLink } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'alert' | 'system' | 'info' | 'success';
  title: string;
  message: string;
  time: string;
  read: boolean;
  link?: string;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="text-red-500" size={20} />;
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'system':
        return <Bell className="text-blue-500" size={20} />;
      default:
        return <Info className="text-primary" size={20} />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-20 right-4 w-96 max-h-[600px] bg-surface-dark border border-border-color rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border-color flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-primary" />
            <h3 className="text-white font-semibold">通知中心</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
            aria-label="关闭"
          >
            <X size={18} className="text-white/70" />
          </button>
        </div>

        {/* Actions */}
        {unreadCount > 0 && (
          <div className="px-4 py-2 border-b border-border-color">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-primary hover:text-primary-hover transition-colors cursor-pointer"
            >
              全部标为已读
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-white/50">
              <Bell size={48} className="mx-auto mb-2 opacity-30" />
              <p>暂无通知</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-primary/5' : ''
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-medium ${!notification.read ? 'text-white' : 'text-white/70'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-white/50 mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/40">{notification.time}</span>
                        {notification.link && (
                          <button className="flex items-center gap-1 text-xs text-primary hover:text-primary-hover transition-colors">
                            查看详情 <ExternalLink size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border-color bg-surface-darker">
          <button className="w-full text-sm text-primary hover:text-primary-hover transition-colors cursor-pointer">
            查看全部通知
          </button>
        </div>
      </div>
    </>
  );
};

// 生成模拟通知数据
export const generateMockNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'alert',
    title: '高危事件告警',
    message: '东区服务站检测到行人闯入主路，请立即处理',
    time: '2分钟前',
    read: false,
    link: '/monitor',
  },
  {
    id: '2',
    type: 'system',
    title: '系统更新',
    message: '算法库已更新至 v2.3.5，新增火灾检测模型',
    time: '15分钟前',
    read: false,
  },
  {
    id: '3',
    type: 'success',
    title: '部署成功',
    message: '车辆违停检测算法已成功部署到西区监控点',
    time: '1小时前',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: '数据报表生成',
    message: '本周安全事件分析报告已生成，可前往报表中心查看',
    time: '3小时前',
    read: true,
    link: '/reports',
  },
];
