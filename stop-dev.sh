#!/bin/bash

echo "🛑 Digital Eye - 停止所有服务"
echo "================================"
echo ""

# 通过PID文件停止
if [ -f logs/backend.pid ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    if ps -p $BACKEND_PID > /dev/null 2>&1; then
        kill $BACKEND_PID 2>/dev/null
        echo "✅ 后端服务已停止 (PID: $BACKEND_PID)"
    else
        echo "ℹ️  后端服务未运行"
    fi
    rm logs/backend.pid
fi

if [ -f logs/frontend.pid ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
        kill $FRONTEND_PID 2>/dev/null
        echo "✅ 前端服务已停止 (PID: $FRONTEND_PID)"
    else
        echo "ℹ️  前端服务未运行"
    fi
    rm logs/frontend.pid
fi

# 清理端口（备用方案）
echo ""
echo "🔍 检查端口占用..."

if lsof -ti:3001 > /dev/null 2>&1; then
    echo "⚠️  端口3001仍被占用，强制清理..."
    lsof -ti:3001 | xargs kill -9 2>/dev/null
fi

if lsof -ti:5173 > /dev/null 2>&1; then
    echo "⚠️  端口5173仍被占用，强制清理..."
    lsof -ti:5173 | xargs kill -9 2>/dev/null
fi

echo ""
echo "✅ 所有服务已停止"
echo "================================"
