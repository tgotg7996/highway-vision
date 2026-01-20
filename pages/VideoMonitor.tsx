import React, { useState, useEffect } from 'react';
import { 
    Video, 
    Grid, 
    Filter, 
    Bell, 
    Mic, 
    Search,
    Clock,
    LayoutGrid,
    Target,
    MapPin,
    AlertTriangle,
    CheckCircle,
    Settings,
    Maximize,
    Pause,
    Volume2
} from 'lucide-react';

const VideoMonitor: React.FC = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    // Video control state
    const [isPaused, setIsPaused] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    // View mode state
    const [viewMode, setViewMode] = useState<'grid' | 'focus'>('focus');
    
    // Filter state
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);
    
    // Toggle filter
    const toggleFilter = (filter: string) => {
        setActiveFilters(prev => 
            prev.includes(filter) 
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    return (
        <div className="flex flex-col h-full bg-background-dark overflow-hidden">
            {/* Custom Header for this view - Compressed */}
            <header className="h-14 border-b border-border-color flex items-center justify-between px-6 lg:px-8 bg-surface-darker shrink-0 z-20">
                <div className="w-full max-w-2xl">
                    <label className="flex w-full items-center relative group">
                        <div className="absolute left-4 text-grey-200 group-focus-within:text-primary transition-colors">
                            <Search size={20} />
                        </div>
                        <input className="w-full h-9 bg-[#1f2e2a] border border-border-color rounded-full pl-12 pr-4 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner" placeholder="通过自然语言搜索视频（例如:显示非法停放的红色卡车）" type="text" />
                        <button className="absolute right-2 top-1 bg-border-color hover:bg-primary/20 hover:text-primary text-grey-200 p-1.5 rounded-full transition-colors">
                            <Mic size={18} />
                        </button>
                    </label>
                </div>
                <div className="flex items-center gap-4 ml-6">
                    <div className="flex items-center gap-2 text-secondary">
                        <Clock size={20} />
                        <span className="text-sm font-mono">{time}</span>
                    </div>
                </div>
            </header>

            <div className="flex-1 p-4 lg:p-6 overflow-hidden flex flex-col lg:flex-row gap-6">
                {/* Main Video Area - Maximum size */}
                <div className="flex flex-col flex-[5] min-w-0 gap-4 h-full">
                    <div className="flex items-center justify-between shrink-0">
                        <div>
                            <h2 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
                                <Video className="text-primary" />
                                视频监控 - 01号摄像机
                            </h2>
                            <p className="text-secondary text-xs mt-1 ml-8">高速服务区 A • 延迟: <span className="font-mono text-data">12ms</span></p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all duration-200 cursor-pointer ${
                                    viewMode === 'grid' 
                                        ? 'bg-primary/20 text-primary border-primary/20 hover:bg-primary/30'
                                        : 'bg-surface-dark text-white border-transparent hover:bg-grey-1500 hover:border-[#5a7a72]'
                                }`}
                            >
                                <LayoutGrid size={16} /> 网格视图
                            </button>
                            <button 
                                onClick={() => setViewMode('focus')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all duration-200 cursor-pointer ${
                                    viewMode === 'focus'
                                        ? 'bg-primary/20 text-primary border-primary/20 hover:bg-primary/30'
                                        : 'bg-surface-dark text-white border-transparent hover:bg-grey-1500 hover:border-[#5a7a72]'
                                }`}
                            >
                                <Target size={16} /> 聚焦模式
                            </button>
                        </div>
                    </div>

                    <div className="relative w-full h-full bg-black rounded-xl overflow-hidden border border-border-color shadow-2xl group">
                        <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDAgJo0Z5JMGYN0GmHDJvASUYR_NMgaMetgA7PdfZvFF4S8S_fIbV8KawpOwLc252wntHCzvRZTzDlwc_NkBdrtMEdW7oNhxaXsSaSGQywI5i30ldfWmveXrXWJ74JXcdV79y4zazQb43PzKSJg-T-6g0rFZ2l7NH7-FxoGYHWFsGsUCA4aG_CQDum3cfHOW26bW35I8SuzuoXD7sw432nHqoRRROSdhdgty8L4H3jux83nTnMwSyJ8CRoZ4M1Xzrg5RqrYhUALZEdV")' }}></div>
                        <div className="scanline pointer-events-none"></div>
                        
                        {/* Overlays */}
                        <div className="absolute top-[35%] left-[15%] w-[18%] h-[25%] border-2 border-primary shadow-glow rounded-sm pointer-events-none">
                            <div className="absolute -top-6 left-0 bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                                <span>越野车</span>
                                <span className="font-mono opacity-80">98%</span>
                            </div>
                        </div>

                        {/* Detail Popover */}
                        <div className="absolute top-[10%] left-[40%] w-64 bg-surface-darker/90 border border-primary/50 rounded-lg p-3 backdrop-blur-md shadow-2xl animate-pulse">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-wider">部件识别: 井盖</span>
                                <span className="text-red-500 text-[10px] font-bold px-1 bg-red-500/10 border border-red-500/20 rounded">异常</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-20 h-20 bg-black/50 rounded border border-border-color overflow-hidden">
                                    <img alt="Crop" className="w-full h-full object-cover grayscale brightness-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0DWt4H8XzBDQ8F4dwwSWMh0cIiR9NSsXIVWmfbtOzyuhT2vU5cujMzCod64--qgMeAJPzt30Wv5mplFMsDtyYZRyiYjOGLbbL2GEM8kh5pu85R6pH-vRwszIYyKuMVjyqOyUmkDEy-1owD6Ku2Hr9O5IdaAAMVDNaK8DTgJQewMMCPl86b7VBcweDVnjRVVqfRfTefZ7X0DpvZsQ3Uwindw1FOqX6PEJs2R_5T_ltKajTW7X_ftngWdnkBHiSW0g7Z7vyMTBwZAwI"/>
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-[10px] text-secondary">置信度: <span className="font-mono">97.4%</span></p>
                                    <p className="text-[10px] text-secondary">偏移量: <span className="font-mono">56mm</span></p>
                                    <p className="text-[10px] text-secondary">开口间隙: <span className="font-mono">76mm</span></p>
                                    <div className="mt-2 h-1 bg-border-color rounded-full overflow-hidden">
                                        <div className="w-4/5 h-full bg-red-500"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setIsPaused(!isPaused)}
                                    className="text-white hover:text-primary transition-colors duration-200 cursor-pointer" 
                                    aria-label={isPaused ? 'Play' : 'Pause'}
                                >
                                    <Pause size={20} />
                                </button>
                                <button 
                                    onClick={() => setIsMuted(!isMuted)}
                                    className="text-white hover:text-primary transition-colors duration-200 cursor-pointer" 
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    <Volume2 size={20} />
                                </button>
                                <div className="flex items-center gap-2 text-xs text-white/80 font-mono">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                    {isPaused ? '暂停' : '实时'}
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => alert('设置功能开发中')}
                                    className="text-white hover:text-primary transition-colors duration-200 cursor-pointer" 
                                    aria-label="Settings"
                                >
                                    <Settings size={20} />
                                </button>
                                <button 
                                    onClick={() => setIsFullscreen(!isFullscreen)}
                                    className="text-white hover:text-primary transition-colors duration-200 cursor-pointer" 
                                    aria-label="Fullscreen"
                                >
                                    <Maximize size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Recognition Panel */}
                <aside className="w-full lg:w-72 flex flex-col gap-4 shrink-0 h-full overflow-hidden">
                    <div className="bg-surface-dark border border-border-color rounded-xl p-4 flex flex-col gap-4">
                        <div>
                            <h3 className="text-white text-sm font-bold mb-3 flex items-center gap-2">
                                <Settings className="text-primary" size={16} />
                                部件识别
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['电线杆', '路灯', '非机动车乱停放', '路牌'].map(tag => (
                                    <span 
                                        key={tag} 
                                        onClick={() => toggleFilter(tag)}
                                        className={`px-2 py-1 text-[11px] rounded cursor-pointer transition-all duration-200 ${
                                            activeFilters.includes(tag)
                                                ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
                                                : 'bg-surface-dark border border-border-color text-secondary hover:border-primary/50 hover:text-primary'
                                        }`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                                <span 
                                    onClick={() => toggleFilter('井盖')}
                                    className={`px-2 py-1 text-[11px] rounded cursor-pointer transition-all duration-200 ${
                                        activeFilters.includes('井盖')
                                            ? 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
                                            : 'bg-surface-dark border border-border-color text-secondary hover:border-primary/50 hover:text-primary'
                                    }`}
                                >
                                    井盖
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 bg-surface-dark border border-border-color rounded-xl overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-border-color bg-grey-1700 flex justify-between items-center shrink-0">
                            <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                                <AlertTriangle className="text-orange-400" size={16} />
                                事件信息
                            </h3>
                            <span className="text-[10px] font-mono bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/20">实时监控中</span>
                        </div>
                        <div className="overflow-y-auto p-4 flex flex-col gap-6">
                            {/* Alert Item */}
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 border border-red-500/20">
                                            <AlertTriangle size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white text-sm font-medium">井盖破损</h4>
                                            <p className="text-[10px] text-secondary font-mono mt-0.5">2023-03-16 14:34:23</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">最新告警</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-secondary pl-15">
                                    <MapPin size={14} /> 锦绣东路金粤路
                                </div>
                                {/* Status Flow */}
                                <div className="relative flex justify-between items-center mt-2 px-1">
                                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-border-color -translate-y-1/2 z-0"></div>
                                    {['上报', '受理', '派单', '处置', '核查'].map((step, idx) => (
                                         <div key={step} className="flex flex-col items-center gap-1 z-10 relative">
                                            <div className={`w-2.5 h-2.5 rounded-full border-4 border-surface-dark ${idx < 2 ? 'bg-primary shadow-glow' : 'bg-border-color'}`}></div>
                                            <span className={`text-[9px] ${idx < 2 ? 'text-primary font-bold' : 'text-muted'}`}>{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="h-px bg-border-color"></div>

                            {/* Completed Item */}
                             <div className="flex flex-col gap-3 opacity-70">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-3">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary border border-primary/20">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-white text-sm font-medium">非法停放</h4>
                                            <p className="text-[10px] text-grey-200 font-mono mt-0.5">2023-03-16 12:10:05</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold border border-primary/30">已完成</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default VideoMonitor;