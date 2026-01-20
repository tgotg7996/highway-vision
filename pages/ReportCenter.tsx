import React, { useState, useMemo } from 'react';
import { 
    CloudDownload, 
    Plus, 
    BarChart3, 
    AlertTriangle, 
    CheckCircle2, 
    Car,
    TrendingUp,
    Calendar,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Eye
} from 'lucide-react';
import { EventLog } from '../types';

const ReportCenter: React.FC = () => {
    // Mock data
    const allEvents: EventLog[] = [
        { id: '#EVT-8921', time: '2024-03-21 14:32:05', location: '东区服务站 A区', type: '违章停车', riskLevel: 'medium', status: 'handled' },
        { id: '#EVT-8920', time: '2024-03-21 14:28:12', location: '加油站入口', type: '行人闯入', riskLevel: 'high', status: 'pending' },
        { id: '#EVT-8919', time: '2024-03-21 14:15:33', location: '主楼大厅', type: '人员聚集', riskLevel: 'low', status: 'handled' },
        { id: '#EVT-8918', time: '2024-03-21 14:02:45', location: '西区出口匝道', type: '拥堵预警', riskLevel: 'medium', status: 'observing' },
        { id: '#EVT-8917', time: '2024-03-21 13:58:12', location: '东区服务站 B区', type: '长时停留', riskLevel: 'low', status: 'handled' },
        { id: '#EVT-8916', time: '2024-03-21 13:45:23', location: '北区停车场', type: '车辆倒车', riskLevel: 'medium', status: 'handled' },
        { id: '#EVT-8915', time: '2024-03-21 13:30:15', location: '主路入口', type: '超速驶入', riskLevel: 'high', status: 'pending' },
        { id: '#EVT-8914', time: '2024-03-21 13:12:08', location: '南区便利店', type: '人员聚集', riskLevel: 'low', status: 'handled' },
    ];
    
    // Filter and search state
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [areaFilter, setAreaFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    // Filtered and paginated data
    const filteredEvents = useMemo(() => {
        return allEvents.filter(event => {
            const matchesSearch = searchQuery === '' || 
                event.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.type.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesArea = areaFilter === 'all' || event.location.includes(areaFilter);
            const matchesType = typeFilter === 'all' || event.type === typeFilter;
            
            return matchesSearch && matchesArea && matchesType;
        });
    }, [searchQuery, areaFilter, typeFilter]);
    
    const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
    const paginatedEvents = filteredEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    // CSV Export function
    const handleExportCSV = () => {
        const headers = ['ID', '时间', '位置', '类型', '风险级别', '状态'];
        const csvContent = [
            headers.join(','),
            ...filteredEvents.map(e => 
                `${e.id},${e.time},${e.location},${e.type},${e.riskLevel},${e.status}`
            )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `report_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    return (
        <div className="flex flex-col h-full bg-black relative">
            {/* Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz2TPVPOTpQ9SRepnvmJi0hBzgmGwbR41ADSZfbuVr4eZFcqcNUufIXx-Sl3AkM8YLJvbmWkKt87KXp7R1FKj7u_-lsObf8vZaDkYd2iJTV-igcY6X-W_y2eCEvZenDR0EYxLim3NgEUB1ue6ZF1XMP9bUGvvx2TRV8p_9V-bFmdQFbfhGm4tCsWj_5XdUE88wFdrd0pNiHfji8Q3y2-6bmG28JeQSlQxJRMAaA1LplPSwCcCsn0sTdciIgSGrulSvWAvjJ7l8LQ8w" alt="bg" className="w-full h-full object-cover opacity-30 scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/90"></div>
                <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(transparent 50%, rgba(102, 255, 219, 0.05) 50%)', backgroundSize: '100% 4px' }}></div>
            </div>

            <div className="relative z-10 flex-1 overflow-y-auto px-8 py-8">
                {/* Header */}
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            报表中心
                            <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider font-mono">Real-time</span>
                        </h1>
                        <p className="text-white/50 text-sm font-light">全域服务区数据分析与历史事件记录查询</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleExportCSV}
                            className="px-4 py-2 rounded-lg bg-surface-dark border border-white/10 text-white/70 hover:text-white text-sm font-medium flex items-center gap-2 hover:border-white/20 transition-all duration-200 cursor-pointer"
                        >
                            <CloudDownload size={16} /> 导出 CSV
                        </button>
                        <button 
                            onClick={() => alert('新建分析任务功能开发中')}
                            className="px-4 py-2 rounded-lg bg-primary text-background-dark text-sm font-bold flex items-center gap-2 hover:bg-white transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer"
                        >
                            <Plus size={16} /> 新建分析任务
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="glass-panel p-5 rounded-xl flex flex-col justify-between group hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-white/50 font-medium">今日事件总数</span>
                            <BarChart3 className="text-primary/50 group-hover:text-primary transition-colors" size={20} />
                        </div>
                        <div className="text-2xl font-bold font-mono text-white">1,284</div>
                        <div className="text-[10px] text-primary flex items-center gap-1 mt-2">
                            <TrendingUp size={12} /> +12.4% <span className="text-white/30">较昨日</span>
                        </div>
                    </div>
                    
                    <div className="glass-panel p-5 rounded-xl flex flex-col justify-between group hover:border-red-400/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-white/50 font-medium">待处理告警</span>
                            <AlertTriangle className="text-red-400/50 group-hover:text-red-400 transition-colors" size={20} />
                        </div>
                        <div className="text-2xl font-bold font-mono text-white">03</div>
                        <div className="text-[10px] text-red-400 flex items-center gap-1 mt-2">
                            需立即响应
                        </div>
                    </div>

                    <div className="glass-panel p-5 rounded-xl flex flex-col justify-between group hover:border-blue-400/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-white/50 font-medium">AI 识别准确率</span>
                            <CheckCircle2 className="text-blue-400/50 group-hover:text-blue-400 transition-colors" size={20} />
                        </div>
                        <div className="text-2xl font-bold font-mono text-white">99.8%</div>
                        <div className="text-[10px] text-blue-400 flex items-center gap-1 mt-2">
                            模型运行正常
                        </div>
                    </div>

                    <div className="glass-panel p-5 rounded-xl flex flex-col justify-between group hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-white/50 font-medium">今日车流量</span>
                            <Car className="text-primary/50 group-hover:text-primary transition-colors" size={20} />
                        </div>
                        <div className="text-2xl font-bold font-mono text-white">45,231</div>
                        <div className="text-[10px] text-white/40 flex items-center gap-1 mt-2">
                            峰值: 14:00-15:00
                        </div>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="glass-panel p-3 rounded-xl mb-4 flex flex-wrap gap-3 items-center">
                    <div className="relative group">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={16} />
                        <input type="text" defaultValue="2024-03-21" className="bg-surface-dark/50 border border-white/10 text-white text-sm rounded-lg block w-40 pl-10 p-2.5 focus:ring-1 focus:ring-primary focus:border-primary placeholder-white/30 transition-all outline-none" placeholder="选择日期" />
                    </div>
                    <div className="h-6 w-px bg-white/10 mx-1"></div>
                    {['所有区域', '所有事件类型', '状态：全部'].map((ph, i) => (
                        <select key={i} className="bg-surface-dark/50 border border-white/10 text-white/80 text-sm rounded-lg p-2.5 pr-8 focus:ring-1 focus:ring-primary focus:border-primary outline-none cursor-pointer">
                            <option>{ph}</option>
                        </select>
                    ))}
                    <div className="flex-1"></div>
                    <div className="relative group w-64">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={16} />
                         <input 
                            type="text" 
                            placeholder="搜索事件ID或车牌号..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-surface-dark/50 border border-white/10 text-white text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-1 focus:ring-primary focus:border-primary placeholder-white/30 transition-all outline-none" 
                        />
                    </div>
                    <button className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background-dark p-2.5 rounded-lg transition-all duration-200 cursor-pointer" aria-label="Apply filters">
                        <Filter size={18} />
                    </button>
                </div>

                {/* Data Table */}
                <div className="glass-panel rounded-xl overflow-hidden flex flex-col relative min-h-[400px]">
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 bg-white/[0.02] text-xs font-medium text-white/50 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-md">
                        <div className="col-span-2">事件 ID / 时间</div>
                        <div className="col-span-2">区域位置</div>
                        <div className="col-span-2">事件类型</div>
                        <div className="col-span-2">风险等级</div>
                        <div className="col-span-2">处理状态</div>
                        <div className="col-span-2 text-right">操作</div>
                    </div>
                    
                    <div className="overflow-y-auto flex-1">
                        {paginatedEvents.map((evt) => (
                            <div key={evt.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 items-center hover:bg-white/[0.02] transition-all duration-200 group cursor-pointer">
                                <div className="col-span-2">
                                    <div className="text-sm font-mono text-white">{evt.id}</div>
                                    <div className="text-[10px] text-white/40 mt-1">{evt.time}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-sm text-white/90">{evt.location}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-dark border border-white/10 text-white/80 text-xs">
                                        {evt.type}
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${
                                                    evt.riskLevel === 'high' ? 'bg-red-500 w-full' : 
                                                    evt.riskLevel === 'medium' ? 'bg-yellow-400 w-2/3' : 'bg-blue-400 w-1/3'
                                                }`}
                                            ></div>
                                        </div>
                                        <span className={`text-xs ${
                                            evt.riskLevel === 'high' ? 'text-red-400' : 
                                            evt.riskLevel === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                                        }`}>
                                            {evt.riskLevel === 'high' ? '高风险' : evt.riskLevel === 'medium' ? '中风险' : '低风险'}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                        evt.status === 'handled' ? 'bg-primary/10 border-primary/20 text-primary' :
                                        evt.status === 'pending' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                        'bg-white/5 border-white/10 text-white/50'
                                    }`}>
                                        <span className={`size-1.5 rounded-full ${evt.status === 'pending' ? 'bg-red-500 animate-pulse' : evt.status === 'handled' ? 'bg-primary' : 'bg-white/30'}`}></span>
                                        {evt.status === 'handled' ? '已自动处理' : evt.status === 'pending' ? '待人工介入' : '观察中'}
                                    </span>
                                </div>
                                <div className="col-span-2 text-right">
                                    <button className="text-white/40 hover:text-primary transition-colors duration-200 p-1 cursor-pointer" aria-label="View details"><Eye size={18} /></button>
                                    <button className="text-white/40 hover:text-white transition-colors duration-200 p-1 cursor-pointer" aria-label="More options"><MoreVertical size={18} /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-white/5 flex justify-between items-center sticky bottom-0 bg-surface-darker/95">
                        <div className="text-xs text-white/40">
                            显示 {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredEvents.length)} 条，共 {filteredEvents.length} 条记录
                        </div>
                        <div className="flex gap-1">
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm rounded border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer flex items-center gap-1"
                            >
                                <ChevronLeft size={16} /> 上一页
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
                                Math.max(0, currentPage - 2), 
                                Math.min(totalPages, currentPage + 1)
                            ).map(page => (
                                <button 
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1.5 text-sm rounded border transition-all duration-200 cursor-pointer ${
                                        page === currentPage 
                                            ? 'bg-primary text-background-dark border-primary' 
                                            : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/10'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm rounded border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer flex items-center gap-1"
                            >
                                下一页 <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            <footer className="h-12 border-t border-white/5 bg-black/40 backdrop-blur-sm px-8 flex items-center justify-between shrink-0 relative z-20">
                <div className="flex gap-8">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">系统版本</span>
                        <span className="text-xs font-mono text-white/70">v4.2.0-STABLE</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">响应延迟</span>
                        <span className="text-xs font-mono text-primary">18ms</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="text-xs text-white/40">© 2024 数字眼科技 - B2B 企业级管理平台</div>
                </div>
            </footer>
        </div>
    );
};

export default ReportCenter;