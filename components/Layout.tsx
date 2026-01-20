import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Video, 
  BarChart3, 
  Settings, 
  Users, 
  Eye,
  ChevronRight,
  Search,
  Bell,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { NotificationPanel, generateMockNotifications, Notification } from './common/NotificationPanel';
import { UserMenu } from './common/UserMenu';

interface LayoutProps {
  children: React.ReactNode;
}

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string; icon: any; label: string; active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-6 py-3 transition-all duration-200 border-l-4 cursor-pointer ${
      active
        ? 'border-primary bg-gradient-to-r from-primary/10 to-transparent text-white'
        : 'border-transparent text-[#9abcb4] hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon size={20} className={active ? 'text-primary' : ''} />
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // UI State
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  // Data State
  const [notifications, setNotifications] = useState<Notification[]>(generateMockNotifications());
  
  // Notification handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="flex h-screen w-full bg-background-dark overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border-color bg-surface-darker flex flex-col shrink-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-border-color">
          <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary mr-3 border border-primary/20">
            <Eye size={20} />
          </div>
          <h1 className="font-bold text-lg tracking-tight text-white">数字眼·智慧高速</h1>
        </div>

        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1">
          <div className="px-6 text-[10px] font-bold text-[#5c7a72] uppercase tracking-wider mb-2">平台管理</div>
          
          <SidebarItem to="/" icon={LayoutDashboard} label="总控台" active={location.pathname === '/'} />
          <SidebarItem to="/algorithms" icon={BrainCircuit} label="AI大脑" active={location.pathname === '/algorithms' || location.pathname === '/builder'} />
          <SidebarItem to="/monitor" icon={Video} label="视频监控" active={location.pathname === '/monitor'} />
          <SidebarItem to="/reports" icon={BarChart3} label="报表中心" active={location.pathname === '/reports'} />

          <div className="px-6 text-[10px] font-bold text-[#5c7a72] uppercase tracking-wider mb-2 mt-6">系统配置</div>
          <SidebarItem to="#" icon={Settings} label="全局设置" active={false} />
          <SidebarItem to="#" icon={Users} label="用户权限" active={false} />
        </div>

        <div className="p-4 border-t border-border-color">
          <div 
            className="relative flex items-center gap-3 px-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all duration-200"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-border-color" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeKTDZTkcOjnD_f6A-tTTBjrbCECmc4QiNWo962dXPL4dv0sIt3agWAgL59W0pE3qGit61HamQQaPdafCeAjx3pSbeYmHaDLSGb6xeOi_-C4i6aRLHGiKhgmjyPb7mfXYRR6lWSDSJack3Fs0oDuYNcmQO_a0lxcjpLW0Ds-DDQtStCLqzRKpIe7rP34coH5NiRfUVuu8XxgKgYNqCUlF9F9HlgRnfnkAZTY9gCH6LpIp00lgJU64U1I3zi83exXuGzWrGnh7bBhPa")' }}
            ></div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-white truncate">管理员用户</span>
              <span className="text-xs text-[#5c7a72] truncate">admin@highway.ai</span>
            </div>
            <UserMenu 
              isOpen={userMenuOpen}
              onClose={() => setUserMenuOpen(false)}
              userName="管理员"
              userEmail="admin@highway.ai"
              position="top"
            />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header - Conditional based on view */}
        {location.pathname !== '/' && (
            <header className="h-16 border-b border-border-color flex items-center justify-between px-8 bg-surface-darker/50 backdrop-blur-md z-10">
            <div className="flex items-center gap-2 text-sm">
                <span className="text-[#9abcb4]">
                    {location.pathname === '/algorithms' ? 'AI大脑' : 
                     location.pathname === '/builder' ? 'AI大脑' :
                     location.pathname === '/monitor' ? '设备接入' : '数据分析'}
                </span>
                <ChevronRight size={14} className="text-[#5c7a72]" />
                <span className="text-white font-medium">
                    {location.pathname === '/algorithms' ? '算法库管理' : 
                     location.pathname === '/builder' ? '新建算法' :
                     location.pathname === '/monitor' ? '实时监控' : '报表中心'}
                </span>
            </div>
            <div className="flex items-center gap-4">
                <div className="relative group hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c7a72] group-focus-within:text-primary transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="全局搜索..." 
                    className="bg-[#162e29] border border-border-color rounded-full pl-10 pr-4 py-1.5 text-sm text-white focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-[#5c7a72] w-64 transition-all outline-none"
                />
                </div>
                <div className="h-8 w-px bg-border-color mx-2"></div>
                <button 
                  className="relative p-2 text-[#9abcb4] hover:text-white transition-colors duration-200 cursor-pointer" 
                  aria-label="Notifications"
                  onClick={() => setNotificationOpen(!notificationOpen)}
                >
                    <Bell size={20} />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full border border-surface-darker"></span>
                    )}
                </button>
                <button 
                  className="p-2 text-[#9abcb4] hover:text-white transition-colors duration-200 cursor-pointer" 
                  aria-label="Help"
                  onClick={() => alert('帮助文档功能开发中')}
                >
                    <HelpCircle size={20} />
                </button>
            </div>
            </header>
        )}
        
        <main className="flex-1 overflow-hidden relative">
            {children}
        </main>
      </div>
      
      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
      />
    </div>
  );
};