# Digital Eye Smart Highway AI - Backend API

后端API服务，基于 Node.js/Express + Supabase

## 快速开始

### 1. 安装依赖

```bash
cd backend
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并填入您的 Supabase 配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入：

- `SUPABASE_SERVICE_ROLE_KEY` - 您的 Supabase service_role 密钥

### 3. 初始化数据库

在 Supabase 控制台执行以下SQL文件：

1. **打开 Supabase SQL Editor**:
   - 访问 https://app.supabase.com
   - 选择您的项目
   - 左侧菜单 → SQL Editor → New Query

2. **执行 schema.sql**:
   - 复制 `backend/supabase/schema.sql` 的内容
   - 粘贴到 SQL Editor
   - 点击 Run 执行

3. **执行 seed.sql** (可选，用于测试数据):
   - 复制 `backend/supabase/seed.sql` 的内容
   - 粘贴到 SQL Editor
   - 点击 Run 执行

### 4. 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3001` 启动

## API 端点

### Algorithms (算法管理)

- `GET /api/algorithms` - 获取所有算法
- `POST /api/algorithms` - 创建算法 (admin)
- `PUT /api/algorithms/:id` - 更新算法 (admin)
- `DELETE /api/algorithms/:id` - 删除算法 (admin)
- `PATCH /api/algorithms/:id/toggle` - 切换算法状态 (admin/operator)

### Cameras (摄像头管理)

- `GET /api/cameras` - 获取所有摄像头
- `POST /api/cameras` - 添加摄像头 (admin/operator)
- `PUT /api/cameras/:id` - 更新摄像头 (admin/operator)
- `DELETE /api/cameras/:id` - 删除摄像头 (admin)
- `GET /api/cameras/:id/status` - 获取设备状态

### Events (事件日志)

- `GET /api/events` - 获取事件列表（支持筛选和分页）
- `POST /api/events` - 创建事件 (admin/operator)
- `PUT /api/events/:id` - 更新事件状态 (admin/operator)
- `GET /api/events/stats` - 获取统计数据
- `GET /api/events/export` - 导出CSV

### Users (用户管理)

- `GET /api/users` - 获取所有用户 (admin)
- `GET /api/users/me` - 获取当前用户信息
- `PUT /api/users/:id` - 更新用户信息
- `PATCH /api/users/:id/permissions` - 更新权限 (admin)
- `DELETE /api/users/:id` - 删除用户 (admin)

### Settings (系统设置)

- `GET /api/settings` - 获取系统设置
- `PUT /api/settings/:key` - 更新单个设置 (admin)
- `PUT /api/settings` - 批量更新设置 (admin)

### Notifications (通知)

- `GET /api/notifications` - 获取通知列表
- `PATCH /api/notifications/:id/read` - 标记为已读
- `PATCH /api/notifications/read-all` - 全部标记为已读
- `DELETE /api/notifications/:id` - 删除通知

## 认证

所有API端点都需要身份验证（除了健康检查）。

在请求头中包含 Supabase JWT token：

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 项目结构

```
backend/
├── src/
│   ├── config/          # 配置文件
│   │   └── supabase.ts  # Supabase客户端
│  ├── middleware/      # 中间件
│   │   ├── auth.ts      # 认证中间件
│   │   └── validation.ts # 验证中间件
│   ├── routes/          # API路由
│   │   ├── algorithms.ts
│   │   ├── cameras.ts
│   │   ├── events.ts
│   │   ├── users.ts
│   │   ├── settings.ts
│   │   └── notifications.ts
│   ├── types/           # TypeScript类型
│   │   └── index.ts
│   └── server.ts        # 服务器入口
├── supabase/           # 数据库文件
│   ├── schema.sql      # 数据库schema
│   └── seed.sql        # 初始数据
├── .env                # 环境变量
├── package.json
└── tsconfig.json
```

## 开发命令

```bash
# 开发模式（自动重启）
npm run dev

# 构建生产版本
npm run build

# 运行生产版本
npm start

# 类型检查
npm run typecheck
```

## 环境变量

| 变量                      | 说明             | 示例                    |
| ------------------------- | ---------------- | ----------------------- |
| PORT                      | 服务器端口       | 3001                    |
| NODE_ENV                  | 环境模式         | development             |
| SUPABASE_URL              | Supabase项目URL  | https://xxx.supabase.co |
| SUPABASE_ANON_KEY         | Supabase公开密钥 | eyJhbGc...              |
| SUPABASE_SERVICE_ROLE_KEY | Supabase服务密钥 | eyJhbGc...              |
| CORS_ORIGIN               | 允许的跨域源     | http://localhost:5173   |

## 故障排除

### 连接错误

如果遇到Supabase连接错误：

1. 检查 `.env` 文件中的配置是否正确
2. 确认Supabase项目处于活跃状态
3. 验证service_role_key是正确的

### 数据库错误

如果遇到数据库操作错误：

1. 确认已执行 `schema.sql` 创建表结构
2. 检查RLS策略是否正确配置
3. 查看Supabase控制台的日志

## 技术栈

- **运行时**: Node.js
- **框架**: Express.js
- **语言**: TypeScript
- **数据库**: Supabase (PostgreSQL)
- **验证**: Joi
- **认证**: Supabase Auth (JWT)
