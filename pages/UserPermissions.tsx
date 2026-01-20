import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Shield, 
  Mail,
  Calendar,
  Search,
  Edit,
  Trash2,
  Key,
  CheckCircle2,
  XCircle
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
}

const UserPermissions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users: User[] = [
    { id: 'USR-001', name: '张伟', email: 'zhang.wei@highway.ai', role: 'admin', status: 'active', lastLogin: '2024-03-21 15:30', permissions: ['all'] },
    { id: 'USR-002', name: '李娜', email: 'li.na@highway.ai', role: 'operator', status: 'active', lastLogin: '2024-03-21 14:25', permissions: ['view', 'edit'] },
    { id: 'USR-003', name: '王强', email: 'wang.qiang@highway.ai', role: 'viewer', status: 'active', lastLogin: '2024-03-21 12:10', permissions: ['view'] },
    { id: 'USR-004', name: '刘芳', email: 'liu.fang@highway.ai', role: 'operator', status: 'inactive', lastLogin: '2024-03-18 09:45', permissions: ['view', 'edit'] },
    { id: 'USR-005', name: '陈明', email: 'chen.ming@highway.ai', role: 'admin', status: 'active', lastLogin: '2024-03-21 11:20', permissions: ['all'] },
  ];

  const roles = [
    { name: 'admin', label: '管理员', color: 'bg-primary/10 text-primary border-primary/20', count: 2 },
    { name: 'operator', label: '操作员', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', count: 2 },
    { name: 'viewer', label: '查看者', color: 'bg-grey-600/10 text-grey-400 border-grey-600/20', count: 1 },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' ||
      user.name.includes(searchQuery) ||
      user.email.includes(searchQuery) ||
      user.id.includes(searchQuery);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleStyle = (role: string) => {
    return roles.find(r => r.name === role)?.color || 'bg-grey-600/10 text-grey-400 border-grey-600/20';
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-grey-1900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
          用户权限
          <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider font-mono">
            {users.length} Users
          </span>
        </h1>
        <p className="text-secondary text-sm">管理系统用户及其访问权限</p>
      </div>

      {/* Role Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {roles.map((role) => (
          <div key={role.name} className="bg-grey-1800 border border-border-color rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted text-xs uppercase tracking-wider font-bold">{role.label}</span>
              <Shield className="text-grey-400" size={20} />
            </div>
            <p className="text-3xl font-mono text-white font-bold mb-2">{role.count}</p>
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${role.color}`}>
              {role.name}
            </span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-grey-1800 border border-border-color rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索用户名称、邮箱或ID..."
            className="w-full bg-grey-1700 border border-border-color rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-grey-1700 border border-border-color rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
        >
          <option value="all">全部角色</option>
          <option value="admin">管理员</option>
          <option value="operator">操作员</option>
          <option value="viewer">查看者</option>
        </select>

        <button className="bg-primary hover:bg-primary-hover text-grey-1900 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-lg cursor-pointer">
          <UserPlus size={18} />
          添加用户
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-grey-1800 border border-border-color rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-1700 border-b border-border-color">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">用户信息</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">角色</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">权限</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">状态</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">最后登录</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-grey-1700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="size-10 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 font-bold"
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{user.name}</p>
                        <p className="text-muted text-xs flex items-center gap-1">
                          <Mail size={12} />
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getRoleStyle(user.role)}`}>
                      <Shield size={12} />
                      {roles.find(r => r.name === user.role)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {user.permissions.map((perm, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-grey-1700 text-secondary text-xs"
                        >
                          <Key size={10} />
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                      user.status === 'active' 
                        ? 'bg-primary/10 text-primary border-primary/20' 
                        : 'bg-grey-600/10 text-grey-400 border-grey-600/20'
                    }`}>
                      {user.status === 'active' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {user.status === 'active' ? '活跃' : '停用'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-secondary text-sm">
                      <Calendar size={14} />
                      <span className="font-mono text-xs">{user.lastLogin}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-grey-1600 rounded-lg transition-colors text-grey-400 hover:text-primary cursor-pointer">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-grey-1600 rounded-lg transition-colors text-grey-400 hover:text-red-400 cursor-pointer">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPermissions;
