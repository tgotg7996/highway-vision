import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Activity,
    Bell,
    FileText,
    BrainCircuit,
    ChevronRight,
    Search,
    User
} from 'lucide-react';
import { NotificationPanel, generateMockNotifications, Notification } from '../components/common/NotificationPanel';
import { UserMenu } from '../components/common/UserMenu';

// ==================================================================================
//地图图片配置
// 使用本地assets文件夹中的图片
// ==================================================================================

// 地图底图 (深色/科技感地图)
const MAP_BASE_SOURCE = '/assets/map-base.png';

// 地图线条/路网 (透明背景 PNG，带律动效果)
const MAP_LINES_SOURCE = '/assets/map-lines.png';

// ==================================================================================

const MainControl: React.FC = () => {
    const navigate = useNavigate();

    // Map image state
    const [baseSrc, setBaseSrc] = useState(MAP_BASE_SOURCE);
    const [linesSrc, setLinesSrc] = useState(MAP_LINES_SOURCE);
    
    // UI State
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Data State
    const [notifications, setNotifications] = useState<Notification[]>(generateMockNotifications());

    const handleImageError = (type: 'base' | 'lines') => {
        console.warn(`Failed to load ${type} image.`);
        if (type === 'lines') setLinesSrc('');
    };
    
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
        <div className="h-screen w-full bg-[#050f12] text-white flex flex-col font-sans">
            {/* Header */}
            <header className="h-20 flex items-center justify-between px-8 border-b border-[#1a3d3f] bg-[#0a1f22]/80 relative z-[300] overflow-visible">
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-glow">
                        <Activity className="text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
                        智慧高速 <span className="text-primary font-light">总控台</span>
                    </h1>
                </div>
                
                <nav className="hidden md:flex items-center gap-4 ml-12 flex-1">
                    <button className="px-5 py-2 rounded bg-[#064e3b] text-cyan-400 border border-transparent font-semibold text-base shadow-glow transition-all duration-200 cursor-pointer">
                        总览监控
                    </button>
                    {['设备管理', '数据分析'].map(item => (
                         <button key={item} className="px-5 py-2 rounded text-[#94a3b8] hover:text-white hover:bg-white/5 transition-all duration-200 text-base cursor-pointer">
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-6">
                    <div className="relative group">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                         <input 
                            className="bg-black/20 border border-[#1a3d3f] text-base rounded-full pl-10 pr-6 py-2 w-80 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-300 placeholder-gray-500 transition-all" 
                            placeholder="全局搜索：路路 ID / 设备号 / 事件..." 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery) {
                                    alert(`搜索功能开发中："${searchQuery}"`);
                                }
                            }}
                        />
                    </div>
                    <button 
                        className="relative p-2.5 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer" 
                        aria-label="Notifications"
                        onClick={() => setNotificationOpen(!notificationOpen)}
                    >
                        <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
                        <Bell size={24} />
                    </button>
                    <div className="relative z-[302]">
                        <div 
                            className="w-11 h-11 rounded-full bg-gradient-to-r from-teal-600 to-green-600 flex items-center justify-center text-sm font-bold border border-white/20 text-white cursor-pointer hover:shadow-lg transition-all"
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                            AD
                            <UserMenu 
                                isOpen={userMenuOpen}
                                onClose={() => setUserMenuOpen(false)}
                                userName="管理员"
                                userEmail="admin@digital-eye.com"
                                position="bottom"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-auto">
                {/* Map Area */}
                <main className="w-[70%] relative bg-[#081014] flex-shrink-0 border-r border-[#1a3d3f] overflow-hidden group flex items-center justify-center">
                    
                    {/* Layered Map Background */}
                    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                         {/* Radial Gradient for depth */}
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.05)_0%,rgba(0,0,0,0.8)_100%)] z-10"></div>
                         
                         {/* Layer 1: Base Map */}
                         <img 
                            src={baseSrc}
                            onError={() => handleImageError('base')}
                            alt="Map Base" 
                            className="absolute w-[95%] h-[95%] object-contain opacity-60 mix-blend-screen"
                        />

                         {/* Layer 2: Lines Map (径向扩散发光效果) */}
                         <img 
                            src={linesSrc}
                            onError={() => handleImageError('lines')}
                            alt="Map Lines" 
                            className="absolute w-[95%] h-[95%] object-contain mix-blend-screen map-lines-radial-spread"
                        />
                        
                        {/* CSS Grid Overlay (Always visible for texture) */}
                        <div 
                            className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                            style={{ 
                                backgroundImage: 'linear-gradient(rgba(81, 251, 211, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(81, 251, 211, 0.1) 1px, transparent 1px)', 
                                backgroundSize: '60px 60px', 
                                maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)' 
                            }}
                        ></div>
                    </div>
                    
                    <div className="absolute top-6 left-6 z-10">
                        <div className="bg-black/40 border border-white/10 px-4 py-2 rounded flex items-center gap-3 shadow-lg backdrop-blur-md">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium tracking-wide text-primary">全国高速路网实时监测中</span>
                        </div>
                    </div>

                    <div className="absolute bottom-6 right-6 z-10 flex gap-4">
                        <div className="bg-black/60 backdrop-blur-sm border border-white/5 px-5 py-3 rounded-lg flex items-center gap-4 min-w-[160px]">
                            <div className="w-10 h-10 rounded bg-teal-500/20 flex items-center justify-center">
                                <Activity className="text-teal-400" size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-wide">全网平均车速</div>
                                <div className="text-xl font-bold font-mono text-white">88 <span className="text-xs text-gray-500 font-sans">km/h</span></div>
                            </div>
                        </div>
                        <div className="bg-black/60 backdrop-blur-sm border border-white/5 px-5 py-3 rounded-lg flex items-center gap-4 min-w-[180px]">
                            <div className="w-10 h-10 rounded bg-blue-500/20 flex items-center justify-center">
                                <FileText className="text-blue-400" size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-wide">当前拥堵里程</div>
                                <div className="text-xl font-bold font-mono text-white">1,240 <span className="text-xs text-gray-500 font-sans">km</span></div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Right Panel */}
                <aside className="w-[30%] bg-[#081518]/95 backdrop-blur-md flex flex-col p-6 border-l border-[#1a3d3f] relative z-10">
                    <div className="flex items-center justify-between mb-10 flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-6 bg-primary shadow-glow"></div>
                            <h2 className="text-xl font-bold text-white tracking-widest">核心操作台</h2>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1 bg-black/30 rounded border border-white/5">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-mono text-green-400 tracking-wider uppercase">System Online</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-6 overflow-visible pr-1">
                        <article 
                            onClick={() => navigate('/monitor')}
                            onKeyDown={(e) => e.key === 'Enter' && navigate('/monitor')}
                            tabIndex={0}
                            role="button"
                            aria-label="Navigate to Event Center"
                            className="relative z-10 bg-black/20 p-6 rounded-2xl border border-red-500/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:border-red-500/40 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col hover:-translate-y-1 hover:z-50"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20 shadow-inner group-hover:scale-110 transition-transform">
                                        <Bell size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-100 group-hover:text-white transition-colors">事件中心</h3>
                                </div>
                                <span className="bg-red-500/20 text-red-400 text-[11px] font-bold px-3 py-1 rounded-full border border-red-500/30">3 待处理</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                实时交通事故检测、路网异常响应及多级联动调度。当前高优事件：<span className="text-red-400/80">G15沈海高速K1205追尾事故。</span>
                            </p>
                            <div className="mt-4 flex justify-end">
                                <span className="text-[10px] text-gray-500 group-hover:text-red-400/60 flex items-center gap-1">进入处理 <ChevronRight size={10} /></span>
                            </div>
                        </article>

                        <article 
                            onClick={() => navigate('/reports')}
                            onKeyDown={(e) => e.key === 'Enter' && navigate('/reports')}
                            tabIndex={0}
                            role="button"
                            aria-label="Navigate to Report Center"
                            className="relative z-10 bg-black/20 p-6 rounded-2xl border border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-blue-500/40 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col hover:-translate-y-1 hover:z-50"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-inner group-hover:scale-110 transition-transform">
                                        <FileText size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-100 group-hover:text-white transition-colors">报表生成</h3>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                自动汇总全网流量统计、收费额度及各区域交通态势日报。支持一键导出PDF/Excel。
                            </p>
                            <div className="mt-4 flex justify-end">
                                <span className="text-[10px] text-gray-500 group-hover:text-blue-400/60 flex items-center gap-1">查看详细 <ChevronRight size={10} /></span>
                            </div>
                        </article>

                        <article 
                            onClick={() => navigate('/algorithms')}
                            onKeyDown={(e) => e.key === 'Enter' && navigate('/algorithms')}
                            tabIndex={0}
                            role="button"
                            aria-label="Navigate to Training Platform"
                            className="relative z-10 bg-black/20 p-6 rounded-2xl border border-green-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:border-green-500/40 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col hover:-translate-y-1 hover:z-50"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20 shadow-inner group-hover:scale-110 transition-transform">
                                        <BrainCircuit size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-100 group-hover:text-white transition-colors">训练平台</h3>
                                </div>
                                <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-500/20 font-mono">AI CORE V3.1</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                优化交对路况预测模型，上传复杂气象样本以迭代算法精度。当前模型准确率 <span className="text-green-400/80 font-mono">96.4%</span>。
                            </p>
                            <div className="mt-4 flex justify-end">
                                <span className="text-[10px] text-gray-500 group-hover:text-green-400/60 flex items-center gap-1">模型调优 <ChevronRight size={10} /></span>
                            </div>
                        </article>
                    </div>
                </aside>
            </div>

            <footer className="h-8 bg-[#03080a] border-t border-[#1a3d3f] flex items-center justify-between px-6 text-[10px] text-gray-500 font-mono z-30 flex-shrink-0">
                <div className="flex gap-6">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        全网网关覆盖在线
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                        云端算力中心: 负载 42%
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                        正在实时刷新热力数据量...
                    </span>
                </div>
                <div className="opacity-70">
                    NODE ID: CH-HQ-CENTER-A1 <span className="mx-2 text-[#1a3d3f]">|</span> LATENCY: 18MS <span className="mx-2 text-[#1a3d3f]">|</span> 2023-11-24 15:42:01
                </div>
            </footer>
            
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

export default MainControl;