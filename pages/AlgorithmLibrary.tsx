import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Car, 
  UserX, 
  TrafficCone, 
  Trash2, 
  HardHat, 
  CloudFog, 
  Plus, 
  SlidersHorizontal,
  Play,
  Package,
  Zap,
  Activity,
  AlertTriangle,
  X
} from 'lucide-react';
import { Algorithm } from '../types';

const AlgorithmCard: React.FC<{ alg: Algorithm; onConfig?: () => void; onToggle?: () => void }> = ({ alg, onConfig, onToggle }) => {
  const Icon = alg.icon === 'fire' ? Flame :
               alg.icon === 'car' ? Car :
               alg.icon === 'walk' ? UserX :
               alg.icon === 'traffic' ? TrafficCone :
               alg.icon === 'trash' ? Trash2 :
               alg.icon === 'worker' ? HardHat : CloudFog;

  const colorClass = alg.color === 'orange' ? 'text-orange-500 bg-orange-500/10 border-orange-500/20' :
                     alg.color === 'blue' ? 'text-blue-500 bg-blue-500/10 border-blue-500/20' :
                     alg.color === 'red' ? 'text-red-500 bg-red-500/10 border-red-500/20' :
                     alg.color === 'yellow' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' :
                     alg.color === 'teal' ? 'text-teal-500 bg-teal-500/10 border-teal-500/20' :
                     alg.color === 'indigo' ? 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' :
                     'text-slate-400 bg-slate-500/10 border-slate-500/20';

  const barColor = alg.color === 'orange' ? 'from-orange-600 to-orange-400' :
                   alg.color === 'blue' ? 'from-blue-600 to-blue-400' :
                   alg.color === 'red' ? 'from-red-600 to-red-400' :
                   alg.color === 'yellow' ? 'from-yellow-600 to-yellow-400' :
                   alg.color === 'teal' ? 'from-teal-600 to-teal-400' :
                   alg.color === 'indigo' ? 'from-indigo-600 to-indigo-400' :
                   'from-slate-600 to-slate-400';

  return (
    <div className="group relative bg-gradient-to-br from-[#162e29] to-[#101f1c] border border-border-color rounded-xl p-6 hover:border-primary/50 hover:shadow-glow transition-all duration-300 flex flex-col h-full cursor-pointer hover:-translate-y-1">
      <div className="flex justify-between items-start mb-5">
        <div className={`size-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform ${colorClass}`}>
          <Icon size={28} />
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold border ${alg.status === 'online' ? 'bg-green-900/30 text-green-400 border-green-900/50' : 'bg-gray-700/50 text-gray-400 border-gray-600/50'}`}>
          <span className={`size-1.5 rounded-full ${alg.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></span>
          {alg.status === 'online' ? '在线' : '离线'}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{alg.name}</h3>
      <p className="text-grey-200 text-xs mb-6 line-clamp-2">{alg.description}</p>
      
      <div className="mt-auto">
        <div className="flex justify-between text-xs text-grey-200 mb-2">
          <span>准确率</span>
          <span className="text-white font-mono">{alg.accuracy}%</span>
        </div>
        <div className="w-full h-1.5 bg-grey-1800 rounded-full overflow-hidden mb-5">
          <div className={`h-full bg-gradient-to-r ${barColor}`} style={{ width: `${alg.accuracy}%` }}></div>
        </div>
        
        <button 
            onClick={onConfig}
            className="w-full py-2.5 rounded-lg border border-border-color bg-transparent hover:bg-primary hover:text-[#0f231e] hover:border-primary text-sm font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          {alg.status === 'online' ? (
              <>
                <SlidersHorizontal size={16} />
                配置参数
              </>
          ) : (
              <>
                 <Play size={16} />
                 启动算法
              </>
          )}
        </button>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; icon: any; color: string; subColor: string }> = ({ title, value, icon: Icon, color, subColor }) => (
    <div className="glass-panel p-5 rounded-xl border border-border-color flex items-center justify-between">
    <div>
        <p className="text-grey-200 text-xs font-medium mb-1">{title}</p>
        <p className={`text-2xl font-bold ${subColor}`}>{value}</p>
    </div>
    <div className={`size-10 rounded-full flex items-center justify-center ${color}`}>
        <Icon size={24} />
    </div>
    </div>
)

const AlgorithmLibrary: React.FC = () => {
  const navigate = useNavigate();
  
  // Filter state 
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const algorithms: Algorithm[] = [
    { id: '1', name: '火灾烟雾检测', description: '实时识别隧道及路面的火光与烟雾，支持极早期预警。', accuracy: 99.2, status: 'online', icon: 'fire', color: 'orange', type: 'safety' },
    { id: '2', name: '违章停车检测', description: '自动检测应急车道占用及主路异常停车行为。', accuracy: 97.5, status: 'online', icon: 'car', color: 'blue', type: 'traffic' },
    { id: '3', name: '行人闯入检测', description: '全天候监测行人非法进入高速公路主路区域。', accuracy: 98.8, status: 'online', icon: 'walk', color: 'red', type: 'safety' },
    { id: '4', name: '交通拥堵检测', description: '分析车流密度和平均速度，识别常发性拥堵路段。', accuracy: 95.0, status: 'offline', icon: 'traffic', color: 'yellow', type: 'traffic' },
    { id: '5', name: '路面抛撒物检测', description: '识别路面上的障碍物、货物掉落等异常情况。', accuracy: 92.4, status: 'online', icon: 'trash', color: 'teal', type: 'road' },
    { id: '6', name: '施工区域入侵', description: '监测非施工车辆或人员误入施工隔离区域。', accuracy: 96.3, status: 'online', icon: 'worker', color: 'indigo', type: 'safety' },
    { id: '7', name: '能见度检测', description: '基于视频分析的大雾、暴雨等低能见度天气检测。', accuracy: 91.0, status: 'offline', icon: 'fog', color: 'slate', type: 'weather' },
  ];
  
  // Filter algorithms by category
  const filteredAlgorithms = activeCategory === 'all' 
    ? algorithms 
    : algorithms.filter(alg => alg.type === activeCategory);
  
  // Handlers
  const handleConfig = (alg: Algorithm) => {
    alert(`配置算法：${alg.name}\n\n准确率：${alg.accuracy}%\n状态：${alg.status === 'online' ? '在线' : '离线'}`);
  };
  
  const handleToggle = (alg: Algorithm) => {
    const newStatus = alg.status === 'online' ? '离线' : '在线';
    alert(`算法 "${alg.name}" 状态已切换为：${newStatus}`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 relative z-10 bg-[url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center h-full">
      <div className="absolute inset-0 bg-grey-1800/95 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
             <div className="flex gap-4 items-center">
                 <button 
                    onClick={() => navigate('/builder')}
                    className="bg-primary hover:bg-primary-dark text-[#0f231e] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-primary/20"
                 >
                    <Plus size={20} />
                    新建算法
                </button>
             </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="部署算法总数" value="24" icon={Package} color="bg-blue-500/10 text-blue-400" subColor="text-white" />
            <StatCard title="正在运行" value="18" icon={Zap} color="bg-primary/10 text-primary" subColor="text-primary" />
            <StatCard title="平均准确率" value="96.8%" icon={Activity} color="bg-purple-500/10 text-purple-400" subColor="text-white" />
            <StatCard title="今日告警次数" value="1,204" icon={AlertTriangle} color="bg-orange-500/10 text-orange-400" subColor="text-orange-400" />
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">算法列表</h2>
          <div className="flex gap-2">
            {[{ label: '全部', value: 'all' }, { label: '安全事件', value: 'safety' }, { label: '交通监测', value: 'traffic' }, { label: '路面监测', value: 'road' }].map((filter) => (
               <button 
                key={filter.value}
                onClick={() => setActiveCategory(filter.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 cursor-pointer ${
                  activeCategory === filter.value 
                    ? 'bg-primary/20 border-primary/30 text-primary' 
                    : 'bg-transparent border-transparent text-grey-200 hover:text-white hover:bg-white/5'
                }`}
               >
                 {filter.label}
               </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
          {algorithms.map((alg) => (
            <AlgorithmCard key={alg.id} alg={alg} onConfig={() => {}} />
          ))}
          
          {/* New Algorithm Card Placeholder */}
          <div 
            onClick={() => navigate('/builder')}
            className="group relative border border-dashed border-border-color rounded-xl p-6 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer min-h-[260px]"
          >
            <div className="size-16 rounded-full bg-surface-dark flex items-center justify-center text-grey-400 group-hover:text-primary group-hover:bg-primary/10 transition-all mb-4">
              <Plus size={32} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">自定义算法</h3>
            <p className="text-grey-400 text-xs text-center px-4">使用 AI Studio 创建新的检测模型</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmLibrary;