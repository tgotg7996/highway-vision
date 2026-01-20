import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity,
  Calendar,
  Download,
  Filter,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';

const DataAnalysis: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');

  const stats = [
    { title: '总事件数', value: '2,458', change: '+12.5%', trend: 'up' },
    { title: '平均响应时间', value: '3.2分钟', change: '-8.3%', trend: 'down' },
    { title: '处理完成率', value: '94.2%', change: '+2.1%', trend: 'up' },
    { title: '高风险事件', value: '127', change: '+5.4%', trend: 'up' },
  ];

  const eventTypes = [
    { name: '违章停车', count: 842, percentage: 34.3, color: 'bg-blue-500' },
    { name: '行人闯入', count: 615, percentage: 25.0, color: 'bg-red-500' },
    { name: '交通拥堵', count: 492, percentage: 20.0, color: 'bg-yellow-500' },
    { name: '路面抛撒物', count: 369, percentage: 15.0, color: 'bg-purple-500' },
    { name: '其他', count: 140, percentage: 5.7, color: 'bg-grey-500' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-grey-1900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2 flex items-center gap-3">
          数据分析
          <span className="px-2 py-0.5 rounded text-xs bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider font-mono">
            Analytics
          </span>
        </h1>
        <p className="text-secondary text-sm">事件统计和趋势分析，助力决策优化</p>
      </div>

      {/* Toolbar */}
      <div className="bg-grey-1800 border border-border-color rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-secondary text-sm">时间范围:</span>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-grey-1700 border border-border-color rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
          >
            <option value="24hours">最近24小时</option>
            <option value="7days">最近7天</option>
            <option value="30days">最近30天</option>
            <option value="custom">自定义</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button className="bg-grey-1700 hover:bg-grey-1600 border border-border-color text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all cursor-pointer">
            <Filter size={18} />
            筛选
          </button>
          <button className="bg-primary hover:bg-primary-hover text-grey-1900 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all shadow-lg cursor-pointer">
            <Download size={18} />
            导出报告
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-grey-1800 border border-border-color rounded-xl p-6">
            <div className="flex items-start justify-between mb-3">
              <span className="text-muted text-xs uppercase tracking-wider font-bold">{stat.title}</span>
              <Activity className="text-grey-400" size={20} />
            </div>
            <p className="text-3xl font-mono text-white font-bold mb-2">{stat.value}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-primary' : 'text-red-400'}`}>
                {stat.change}
              </span>
              <span className="text-muted text-xs">vs 上周</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Trend Chart */}
        <div className="bg-grey-1800 border border-border-color rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-heading font-semibold flex items-center gap-2">
              <LineChartIcon size={20} className="text-primary" />
              事件趋势
            </h3>
            <button className="text-secondary hover:text-white text-xs transition-colors cursor-pointer">查看详情</button>
          </div>
          
          {/* Simplified trend visualization */}
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 85, 45, 95, 75, 90, 80].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-primary/20 rounded-t relative" style={{ height: `${height}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/50 rounded-t"></div>
                </div>
                <span className="text-muted text-xs">Day {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Event Distribution */}
        <div className="bg-grey-1800 border border-border-color rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-heading font-semibold flex items-center gap-2">
              <PieChartIcon size={20} className="text-primary" />
              事件类型分布
            </h3>
            <button className="text-secondary hover:text-white text-xs transition-colors cursor-pointer">查看详情</button>
          </div>
          
          <div className="space-y-4">
            {eventTypes.map((type, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-secondary text-sm">{type.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white font-mono text-sm">{type.count}</span>
                    <span className="text-muted text-xs">{type.percentage}%</span>
                  </div>
                </div>
                <div className="h-2 bg-grey-1700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${type.color} transition-all duration-500`}
                    style={{ width: `${type.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Hours */}
        <div className="bg-grey-1800 border border-border-color rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-heading font-semibold flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" />
              高峰时段分析
            </h3>
            <button className="text-secondary hover:text-white text-xs transition-colors cursor-pointer">查看详情</button>
          </div>
          
          <div className="h-48 flex items-end justify-between gap-1">
            {[30, 25, 35, 60, 85, 95, 90, 80, 75, 65, 70, 80, 75, 70, 65, 55, 60, 70, 80, 85, 75, 60, 45, 35].map((height, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t hover:from-primary-hover transition-colors cursor-pointer"
                style={{ height: `${height}%` }}
                title={`${idx}:00 - ${idx + 1}:00`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-muted text-xs">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Location Heatmap */}
        <div className="bg-grey-1800 border border-border-color rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-heading font-semibold flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" />
              热点区域统计
            </h3>
            <button className="text-secondary hover:text-white text-xs transition-colors cursor-pointer">查看详情</button>
          </div>
          
          <div className="space-y-3">
            {['东区服务站', '西区出口', '加油站', '停车场', '便利店区域'].map((location, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-grey-1700 rounded-lg hover:bg-grey-1600 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`size-2 rounded-full ${idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-orange-500' : idx === 2 ? 'bg-yellow-500' : 'bg-primary'}`}></div>
                  <span className="text-white text-sm">{location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-data font-mono text-sm">{Math.floor(Math.random() * 500 + 100)}</span>
                  <span className="text-muted text-xs">事件</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalysis;
