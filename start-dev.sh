#!/bin/bash

echo "🚀 Digital Eye - 启动所有服务"
echo "================================"
echo ""

# 检查是否在项目根目录
if [ ! -d "backend" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 创建日志目录
mkdir -p logs

echo "📦 启动后端服务..."
cd backend
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "   后端PID: $BACKEND_PID"
cd ..

# 等待后端启动
echo "⏳ 等待后端启动..."
sleep 3

# 检查后端是否成功启动
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo "✅ 后端启动成功: http://localhost:3001"
else
    echo "⚠️  后端可能未完全启动，请查看日志"
fi

echo ""
echo "🎨 启动前端服务..."
npm run dev > logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "   前端PID: $FRONTEND_PID"

# 等待前端启动
sleep 2

echo ""
echo "✅ 服务启动完成！"
echo "================================"
echo "📊 后端API:  http://localhost:3001"
echo "🎨 前端界面: http://localhost:5173"
echo ""
echo "📝 日志文件:"
echo "   后端: logs/backend.log"
echo "   前端: logs/frontend.log"
echo ""
echo "💡 查看日志:"
echo "   tail -f logs/backend.log"
echo "   tail -f logs/frontend.log"
echo ""
echo "🛑 停止服务:"
echo "   ./stop-dev.sh"
echo "   或手动: kill $BACKEND_PID $FRONTEND_PID"
echo ""

# 保存PID
echo $BACKEND_PID > logs/backend.pid
echo $FRONTEND_PID > logs/frontend.pid

# 显示进程状态
echo "📋 运行中的进程:"
ps -p $BACKEND_PID -o pid,command
ps -p $FRONTEND_PID -o pid,command

echo ""
echo "按 Ctrl+C 停止监控（服务继续在后台运行）"
echo "================================"

# 保持脚本运行以便用户可以Ctrl+C
trap "echo '服务仍在后台运行。使用 ./stop-dev.sh 停止。'; exit 0" INT
tail -f logs/backend.log logs/frontend.log
