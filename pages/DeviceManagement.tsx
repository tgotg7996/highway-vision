import React, { useState } from 'react';
import { 
  Video, 
  Wifi, 
  WifiOff, 
  MapPin, 
  Calendar,
  Search,
  Plus,
  Settings,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'online' | 'offline' | 'warning';
  ip: string;
  lastOnline: string;
  uptime: string;
}

const DeviceManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const devices: Device[] = [
    { id: 'CAM-001', name: '东区入口摄像头', type: '高清摄像头', location: '东区服务站入口', status: 'online', ip: '192.168.1.101', lastOnline: '2024-03-21 15:42:00', uptime: '45天12小时' },
    { id: 'CAM-002', name: '西区出口摄像头', type: '高清摄像头', location: '西区出口匝道', status: 'online', ip: '192.168.1.102', lastOnline: '2024-03-21 15:41:55', uptime: '30天8小时' },
    { id: 'CAM-003', name: '加油站监控', type: '高清摄像头', location: '加油站入口', status: 'warning', ip: '192.168.1.103', lastOnline: '2024-03-21 15:40:12', uptime: '2天3小时' },
    { id: 'CAM-004', name: '停车场全景', type: '全景摄像头', location: '北区停车场', status: 'online', ip: '192.168.1.104', lastOnline: '2024-03-21 15:42:05', uptime: '60天1小时' },
    { id: 'CAM-005', name: '便利店内部', type: '室内摄像头', location: '南区便利店', status: 'offline', ip: '192.168.1.105', lastOnline: '2024-03-20 08:15:32', uptime: '-' },
    { id: 'CAM-006', name: '主楼大厅', type: '高清摄像头', location: '主楼大厅', status: 'online', ip: '192.168.1.106', lastOnline: '2024-03-21 15:41:48', uptime: '90天6小时' },
  ];

  const filteredDevices = devices.filter(device => {
    const matchesSearch = searchQuery === '' ||
      device.name.includes(searchQuery) ||
      device.location.includes(searchQuery) ||
      device.id.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusStats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    warning: devices.filter(d => d.status === 'warning').length,
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'online': return 'bg-primary/10 text-primary border-primary/20';
      case 'offline': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'warning': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default: return 'bg-grey-1600 text-grey-400 border-grey-1400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle2 size={16} />;
      case 'offline': return <XCircle size={16} />;
      case 'warning': return <AlertCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-grey-1900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
          设备管理
          <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider font-mono">
            {statusStats.total} Devices
          </span>
        </h1>
        <p className="text-secondary text-sm">监控和管理所有接入设备的状态与配置</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-grey-1800 border border-border-color rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted text-xs uppercase tracking-wider font-bold">总设备数</span>
            <Video className="text-grey-400" size={20} />
          </div>
          <p className="text-3xl font-mono text-white font-bold">{statusStats.total}</p>
        </div>

        <div className="bg-grey-1800 border border-primary/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted text-xs uppercase tracking-wider font-bold">在线设备</span>
            <Wifi className="text-primary" size={20} />
          </div>
          <p className="text-3xl font-mono text-primary font-bold">{statusStats.online}</p>
        </div>

        <div className="bg-grey-1800 border border-orange-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted text-xs uppercase tracking-wider font-bold">异常设备</span>
            <AlertCircle className="text-orange-400" size={20} />
          </div>
          <p className="text-3xl font-mono text-orange-400 font-bold">{statusStats.warning}</p>
        </div>

        <div className="bg-grey-1800 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted text-xs uppercase tracking-wider font-bold">离线设备</span>
            <WifiOff className="text-red-400" size={20} />
          </div>
          <p className="text-3xl font-mono text-red-400 font-bold">{statusStats.offline}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-grey-1800 border border-border-color rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索设备名称、位置或ID..."
            className="w-full bg-grey-1700 border border-border-color rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-grey-1700 border border-border-color rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
        >
          <option value="all">全部状态</option>
          <option value="online">在线</option>
          <option value="offline">离线</option>
          <option value="warning">异常</option>
        </select>

        <button className="bg-primary hover:bg-primary-hover text-grey-1900 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-lg cursor-pointer">
          <Plus size={18} />
          添加设备
        </button>

        <button className="bg-grey-1700 hover:bg-grey-1600 border border-border-color text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all cursor-pointer">
          <RefreshCw size={18} />
          刷新
        </button>
      </div>

      {/* Device Table */}
      <div className="bg-grey-1800 border border-border-color rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-grey-1700 border-b border-border-color">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">设备信息</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">位置</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">IP地址</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">状态</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">运行时长</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-muted uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-grey-1700/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20">
                        <Video size={20} />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{device.name}</p>
                        <p className="text-muted text-xs font-mono">{device.id} · {device.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-secondary text-sm">
                      <MapPin size={14} />
                      {device.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-data font-mono text-sm">{device.ip}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(device.status)}`}>
                      {getStatusIcon(device.status)}
                      {device.status === 'online' ? '在线' : device.status === 'offline' ? '离线' : '异常'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-secondary text-sm">
                      <Calendar size={14} />
                      <span className="font-mono">{device.uptime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-grey-1600 rounded-lg transition-colors text-grey-400 hover:text-white cursor-pointer">
                      <Settings size={18} />
                    </button>
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

export default DeviceManagement;
