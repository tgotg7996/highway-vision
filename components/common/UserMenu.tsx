import React from 'react';
import { User, Settings, LogOut, HelpCircle } from 'lucide-react';

export interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  position?: 'top' | 'bottom';
}

export const UserMenu: React.FC<UserMenuProps> = ({
  isOpen,
  onClose,
  userName,
  userEmail,
  userAvatar,
  position = 'bottom', // 默认向下
}) => {
  const menuItems = [
    { icon: User, label: '个人信息', onClick: () => alert('个人信息功能开发中') },
    { icon: Settings, label: '账号设置', onClick: () => alert('账号设置功能开发中') },
    { icon: HelpCircle, label: '帮助中心', onClick: () => alert('帮助中心功能开发中') },
  ];

  // 根据位置决定弹出方向和边距
  const positionClasses = position === 'top' 
    ? 'bottom-full left-0 mb-3' // 向上时，底部留3个单位间距，左对齐
    : 'top-full left-0 mt-3';   // 向下时，顶部留3个单位间距，左对齐

  return (
    <>
      {/* Backdrop - only show when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[400]"
          onClick={onClose}
        />
      )}
      
      {/* Menu Dropdown with Animation */}
      <div className={`absolute ${positionClasses} w-64 bg-surface-dark border border-border-color rounded-xl shadow-2xl z-[401] overflow-hidden transition-all duration-200 ease-out origin-bottom ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* User Info */}
        <div className="p-4 border-b border-border-color">
          <div className="flex items-center gap-3">
            {userAvatar ? (
              <img 
                src={userAvatar} 
                alt={userName}
                className="w-12 h-12 rounded-full border border-primary/20"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-600 to-green-600 flex items-center justify-center text-white font-bold border border-primary/20">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold text-sm truncate">{userName}</h4>
              <p className="text-white/50 text-xs truncate">{userEmail}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer text-left"
            >
              <item.icon size={18} className="text-white/70" />
              <span className="text-sm text-white/80">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="border-t border-border-color">
          <button
            onClick={() => {
              if (confirm('确定要退出登录吗？')) {
                alert('退出登录功能开发中');
              }
              onClose();
            }}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-500/10 transition-colors cursor-pointer text-red-500"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">退出登录</span>
          </button>
        </div>
      </div>
    </>
  );
};
