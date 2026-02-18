# 🔧 Load Failed - 完整修复指南

## ✅ 问题诊断与解决

"Load failed" 错误已成功修复！

---

## 🐛 原因分析

### 问题 1: CORS 配置错误 ❌
**症状**: 前端无法访问后端 API
**原因**: `backend/.env` 中的 `CORS_ORIGIN` 设置为 `http://localhost:5173`，但前端运行在 `http://localhost:3000`
**状态**: ✅ 已修复

### 问题 2: 数据库 Schema 编码错误 ❌
**症状**: "Database error querying schema"
**原因**: `schema.sql` 文件中有关键字拼写错误
**状态**: ✅ 已修复

---

## 🚀 启动步骤

### 1. 启动后端

```bash
cd backend
npm run dev
```

你应该看到：

```
╔════════════════════════════════════════════════════════╗
║   Digital Eye Smart Highway AI - Backend API          ║
╠══════════════════════════════════════════════════════╣
║   Server running on: http://localhost:3001           ║
║   Environment: development                          ║
║   Supabase: ✓ Connected                    ║
╚════════════════════════════════════════════════════════╝
```

### 2. 启动前端

在新的终端窗口中：

```bash
npm run dev
```

前端应该自动打开：`http://localhost:3000`

---

## ✅ 验证步骤

### 检查后端健康状态

在浏览器或终端中运行：

```bash
curl http://localhost:3001/health
```

预期响应：

```json
{
  "success": true,
  "message": "Digital Eye API is running",
  "timestamp": "2024-XX-XX..."
}
```

### 检查 API 端点

```bash
# 测试算法 API
curl http://localhost:3001/api/algorithms

# 测试用户注册
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123","name":"Test User"}'
```

---

## 🔍 故障排查

### 如果仍然出现 "Load failed"

#### 检查 1: 后端是否运行

```bash
# 查找进程
lsof -i :3001

# 或
ps aux | grep "node.*server"

# 如果没有输出，后端没有运行
```

#### 检查 2: 端口是否被占用

```bash
# 查看 3000 端口
lsof -i :3000

# 如果被占用，杀死进程
kill -9 <PID>
```

#### 检查 3: 浏览器控制台错误

打开浏览器开发者工具（F12），查看：

1. **Console 标签** - 查看 JavaScript 错误
2. **Network 标签** - 查看失败的请求
   - 红色 = 请求失败
   - 状态码 404/500 = 服务器错误
   - CORS 错误 = 跨域问题

#### 检查 4: 前端 API URL 配置

打开 `src/services/api.ts`，确认：

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

注意端口：后端是 `3001`，API URL 应该正确

#### 检查 5: 环境变量

```bash
cat backend/.env | grep -v "#"
```

确保所有变量都正确设置：
- `PORT=3001`
- `SUPABASE_URL` = 你的 Supabase URL
- `SUPABASE_ANON_KEY` = 你的 anon key
- `SUPABASE_SERVICE_ROLE_KEY` = 你的 service role key
- `CORS_ORIGIN=http://localhost:3000`

---

## 📋 已修复的问题清单

| 问题 | 状态 | 说明 |
|------|------|------|
| CORS_ORIGIN 错误 | ✅ | 已从 5173 改为 3000 |
| schema.sql 编码错误 | ✅ | 所有拼写错误已修复 |
| 数据库表未创建 | ✅ | 测试确认所有表存在 |
| Supabase 连接 | ✅ | 连接测试通过 |

---

## 🎯 快速修复命令

如果需要完全重置：

```bash
# 1. 停止所有服务
pkill -f "node.*server"
pkill -f "vite"

# 2. 清理并重新安装
rm -rf backend/node_modules backend/dist
cd backend && npm install

# 3. 重新启动
npm run dev
```

---

## 📞 测试账号

后端和前端都启动后，访问：`http://localhost:3000`

### 注册新用户
1. 点击 "注册" 标签
2. 填写：
   - 邮箱: `test@example.com`
   - 密码: `Test123`（至少6位）
   - 用户名: `测试用户`
3. 点击 "注册" 按钮

### 登录
1. 切换到 "登录" 标签
2. 输入注册的邮箱和密码
3. 点击 "登录" 按钮

---

## 🔐 Supabase 设置确认

确保 Supabase 中有以下配置：

### 1. 启用 Email Auth
- Dashboard → Authentication → Providers
- 确保 Email 已启用

### 2. 禁用 Email 确认（可选，用于测试）
- Dashboard → Authentication → Providers → Email
- "Confirm email" → 取消勾选
- 或者手动确认注册后的邮件

### 3. 检查 RLS 策略
- Dashboard → Database → Tables → 任意表
- 点击 "Authentication"（盾牌图标）
- 确保策略不会阻止正常访问

---

## 📊 预期行为

### 正常启动后应该看到：

1. **后端终端**：
   ```
   ╔════════════════════════════════════════════════════════╗
   ║   Digital Eye Smart Highway AI - Backend API          ║
   ╠══════════════════════════════════════════════════════╣
   ║   Server running on: http://localhost:3001           ║
   ╚══════════════════════════════════════════════════════╝
   ```

2. **前端浏览器**：
   - 页面正常加载
   - 没有 "Load failed" 错误
   - 可以正常登录/注册
   - API 请求返回数据

3. **API 请求**：
   - `GET /api/algorithms` → 返回算法列表
   - `POST /api/users/register` → 创建新用户
   - `GET /api/cameras` → 返回摄像头列表

---

## 🆘 如果还有问题

请提供以下信息以便进一步诊断：

1. **具体的错误消息**：
   ```json
   {
     "error": "具体的错误文本",
     "stack": "完整的堆栈跟踪"
   }
   ```

2. **浏览器控制台截图**：
   - Console 标签
   - Network 标签中失败的请求

3. **后端终端输出**：
   - 启动时的日志
   - 错误信息

4. **运行环境**：
   ```bash
   node --version
   npm --version
   ```
   - 操作系统版本

---

## ✅ 修复总结

所有已知问题已修复：

| 问题 | 修复方法 | 验证状态 |
|------|----------|----------|
| Database schema 编码错误 | 重新创建正确的 schema.sql | ✅ 测试通过 |
| CORS_ORIGIN 配置错误 | 更新为正确的端口 | ✅ 已修复 |
| 环境变量配置 | 验证所有必需变量 | ✅ 已验证 |
| Supabase 连接 | 创建测试脚本并验证 | ✅ 连接成功 |

---

## 🎉 现在应该可以正常使用了！

按照上述步骤启动后端和前端，然后访问：
**http://localhost:3000**

祝你使用愉快！
