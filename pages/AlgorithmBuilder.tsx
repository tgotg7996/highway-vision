import React from 'react';
import { 
  ArrowUp, 
  Rocket, 
  CheckCircle, 
  AlertTriangle,
  Wand2,
  Box,
  Image as ImageIcon
} from 'lucide-react';
import { ChatMessage } from '../types';

const AlgorithmBuilder: React.FC = () => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: '1', sender: 'system', text: '准备就绪...请描述您想在此数据集中识别的特定物体或异常。' },
    { id: '2', sender: 'user', text: '检测未穿反光背心的人员' },
    { id: '3', sender: 'system', text: '理解。我正在为识别出的“人”类配置“反光背心”的负向检测过滤器。', tags: ['零样本', 'LoRA'] },
  ]);
  
  const [inputMessage, setInputMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'system',
        text: '正在分析您的需求...'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  const handleQuickAction = (action: string) => {
    setInputMessage(action.replace('+ ', ''));
  };

  return (
    <div className="flex h-full">
      {/* Left Chat Panel */}
      <section className="w-[450px] flex flex-col border-r border-border-color bg-surface-darker relative z-10 shadow-xl">
        <div className="px-6 py-4 border-b border-border-color/50">
          <div className="flex flex-wrap gap-2 items-center text-sm text-grey-200">
            <span>项目</span> <span className="text-[10px]">›</span>
            <span>施工安全</span> <span className="text-[10px]">›</span>
            <span className="text-white font-medium">新建算法</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          <div>
            <h3 className="text-white tracking-tight text-2xl font-heading font-bold leading-tight mb-2">提示词工程</h3>
            <p className="text-secondary text-sm">使用自然语言定义您的检测目标。</p>
          </div>

          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-8 shrink-0 border border-border-color" 
                style={{ backgroundImage: msg.sender === 'system' ? 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB6Ybmtn-1jAnv3bW3UNMPm8lAL_BWA5mN9rgJB3t8CEBvF1usXJ1FJS6h7QvI3gjURBWXZd57hF5EDKSh-QzoSL9vSuibiBmlaqiv8101bAG9e6e5CdXkZmw9vhpmUOx3KmtCa4IIT-cZWrmwv7KBf8oWVp_GAZWs_FGKPUkTUoFx5VHEHZYVbSh-bf1jBAgBPVnpuaTD2QWhlmu7QOPL-xwvglLI0Gk-RfZTLtkFFvAEoxZzl87Z0or8eFsF6KyuApulRlw0WGxkU")' : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAoGEPyZuNqj7SDMx9sw177QjkZTLHSdk7-7d7AZnhoCNcjNZDsRaD2wu5_Fs9YKBULBmwyt23B5ZPdEqzgzozmoij2bUNfoxrzmf3MaMZabXW3c-ZwSr70il2eEa8JWQMXcf4UQDoJaVv82SJG_eVTXoLiN9nQB69Q0RDS5W_oXDNJ838OySv86lsZzEfBPG9vhnTglADKch5oG3f-YGrDV7kF-JLobaQk6KCZ5yfeD8K1450O-KmTQm7KNQoEuwlPAVChl-OpJMSz")' }}
              ></div>
              <div className={`flex flex-col gap-1 items-${msg.sender === 'user' ? 'end' : 'start'} max-w-[85%]`}>
                <p className={`text-secondary text-xs font-medium ${msg.sender === 'user' ? 'mr-1' : 'ml-1'}`}>
                  {msg.sender === 'user' ? '您' : '系统'}
                </p>
                <div className={`text-sm font-normal leading-relaxed rounded-2xl px-4 py-3 ${msg.sender === 'user' ? 'rounded-tr-none bg-primary/20 text-white border border-primary/20' : 'rounded-tl-none bg-grey-1600 text-white'}`}>
                  {msg.text}
                  {msg.tags && (
                    <div className="flex gap-2 mt-2">
                        {msg.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs text-primary border border-primary/20">
                                {tag === '零样本' ? <Rocket size={12} /> : <Wand2 size={12} />}
                                {tag}
                            </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 pt-2 bg-surface-darker">
          <div className="relative group">
            <textarea 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="w-full bg-grey-1700 text-white border border-border-color rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none h-[50px] transition-all placeholder:text-muted" 
              placeholder="优化您的算法或添加约束条件..."
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-2 top-1.5 p-1.5 bg-primary text-[#0f231e] rounded-lg hover:bg-white hover:text-black transition-all duration-200 shadow-lg shadow-primary/20 cursor-pointer" 
              aria-label="Send message"
            >
              <ArrowUp size={20} />
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {['+ 提高灵敏度', '+ 忽略背景', '+ 添加遮挡'].map(action => (
                <button 
                  key={action} 
                  onClick={() => handleQuickAction(action)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-grey-1600 text-xs text-secondary hover:text-white hover:bg-grey-1500 transition-all duration-200 border border-transparent hover:border-[#4a6b63] cursor-pointer"
                >
                    {action}
                </button>
            ))}
          </div>
        </div>
      </section>

      {/* Right Preview Panel */}
      <section className="flex-1 bg-background-dark relative flex flex-col">
        <div className="h-14 border-b border-border-color flex items-center justify-between px-6 bg-grey-1800">
            <div className="flex items-center gap-4">
                <h2 className="text-white font-heading font-semibold text-sm">模型预览</h2>
                <div className="h-4 w-px bg-border-color"></div>
                <div className="flex items-center gap-2 text-grey-200 text-xs">
                    <ImageIcon size={16} />
                    <span>test_sample_04.jpg</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-900/30 text-green-400 text-xs font-medium border border-green-900/50">
                    <CheckCircle size={14} /> GPU已连接
                </span>
                <button className="text-xs font-bold bg-primary text-[#0f231e] px-4 py-2 rounded-lg hover:bg-white transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-lg">
                    <Rocket size={16} /> 部署 v0.1
                </button>
            </div>
        </div>

        <div className="flex-1 p-8 flex items-center justify-center relative bg-[#0a1512] overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#273a36 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="relative rounded-lg overflow-hidden border border-border-color shadow-2xl max-w-[900px] w-full aspect-video group">
                <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz2TPVPOTpQ9SRepnvmJi0hBzgmGwbR41ADSZfbuVr4eZFcqcNUufIXx-Sl3AkM8YLJvbmWkKt87KXp7R1FKj7u_-lsObf8vZaDkYd2iJTV-igcY6X-W_y2eCEvZenDR0EYxLim3NgEUB1ue6ZF1XMP9bUGvvx2TRV8p_9V-bFmdQFbfhGm4tCsWj_5XdUE88wFdrd0pNiHfji8Q3y2-6bmG28JeQSlQxJRMAaA1LplPSwCcCsn0sTdciIgSGrulSvWAvjJ7l8LQ8w" 
                    alt="Construction site" 
                    className="w-full h-full object-cover opacity-80" 
                />
                
                <div className="scanline"></div>

                {/* Overlays */}
                <div className="absolute top-[35%] left-[25%] w-[8%] h-[28%] border-2 border-primary bg-primary/10 shadow-glow animate-pulse">
                    <div className="absolute -top-7 left-0 bg-primary text-[#0f231e] text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 whitespace-nowrap">
                        <AlertTriangle size={10} /> 未穿背心 (98%)
                    </div>
                </div>

                <div className="absolute top-[42%] left-[45%] w-[7%] h-[25%] border-2 border-primary bg-primary/10 shadow-glow">
                    <div className="absolute -top-7 left-0 bg-primary text-[#0f231e] text-[10px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 whitespace-nowrap">
                        <AlertTriangle size={10} /> 未穿背心 (94%)
                    </div>
                </div>

                <div className="absolute top-[30%] left-[60%] w-[6%] h-[22%] border border-dashed border-gray-500 opacity-50">
                    <div className="absolute -top-5 left-0 text-gray-400 text-[9px] px-1 bg-black/50">
                        检测到背心
                    </div>
                </div>
            </div>

            {/* Floating stats */}
            <div className="absolute top-12 right-12 flex flex-col items-center gap-2">
                <div className="relative size-24 p-1 rounded-full flex items-center justify-center border-4 border-l-primary border-t-primary border-r-[#273a36] border-b-[#273a36] shadow-glow transform -rotate-45">
                    <div className="transform rotate-45 flex flex-col items-center">
                        <span className="text-white text-xl font-bold font-mono">99%</span>
                        <span className="text-grey-200 text-[9px] uppercase tracking-wider">训练中</span>
                    </div>
                </div>
                <div className="bg-[#101817]/90 backdrop-blur-md border border-border-color px-3 py-1.5 rounded-lg text-xs text-primary shadow-lg flex items-center gap-2">
                    <span className="size-2 bg-primary rounded-full animate-ping"></span>
                    正在完成权重配置...
                </div>
            </div>

            <div className="absolute bottom-12 left-12 flex gap-2">
                <div className="backdrop-blur-md bg-black/40 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-white shadow-lg">
                    <Wand2 className="text-purple-400" size={16} /> LoRA微调已激活
                </div>
                <div className="backdrop-blur-md bg-black/40 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs text-white shadow-lg">
                    <Box className="text-blue-400" size={16} /> YOLOv8 基座
                </div>
            </div>
        </div>

        {/* Footer Metrics */}
        <div className="h-16 bg-[#101817] border-t border-border-color flex items-center justify-between px-8 shrink-0">
            <div className="flex gap-8">
                <div className="flex flex-col">
                    <span className="text-muted text-[10px] uppercase font-bold tracking-wider">精度</span>
                    <span className="text-white text-lg font-mono leading-none">94.2%</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-muted text-[10px] uppercase font-bold tracking-wider">召回率</span>
                    <span className="text-white text-lg font-mono leading-none">89.5%</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-muted text-[10px] uppercase font-bold tracking-wider">推理时间</span>
                    <span className="text-data text-lg font-mono leading-none">12ms</span>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                <span className="text-secondary text-xs">置信度阈值</span>
                <div className="w-32 h-1.5 bg-grey-1600 rounded-full relative cursor-pointer">
                    <div className="absolute left-0 top-0 h-full w-[75%] bg-primary rounded-full"></div>
                    <div className="absolute left-[75%] top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow hover:scale-125 transition-transform"></div>
                </div>
                <span className="text-white text-xs font-mono">0.75</span>
            </div>
        </div>
      </section>
    </div>
  );
};

export default AlgorithmBuilder;