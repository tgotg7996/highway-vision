# Digital Eye Smart Highway AI - 完整项目

智慧高速AI监测系统 - 前后端一体化解决方案

## 🎯 项目简介

这是一个完整的全栈应用，用于高速公路服务区的智能监控，集成了AI算法识别、实时视频监控、事件告警管理等功能。

### 技术栈

**前端**

- React 19 + TypeScript
- Vite
- React Router DOM
- Lucide Icons

**后端**

- Node.js + Express
- TypeScript
- Supabase (PostgreSQL)
- JWT Authentication

## 📁 项目结构

```
digital-eye---smart-highway-ai/
├── frontend (根目录)
│   ├── pages/              # 页面组件
│   ├── components/         # 可复用组件
│   ├── src/
│   │   └── services/       # API服务层
│   ├── assets/             # 静态资源
│   └── styles.css          # 全局样式
│
├── backend/                # 后端API
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   ├── middleware/     # 中间件
│   │   ├── routes/         # API路由
│   │   ├── types/          # 类型定义
│   │   └── server.ts       # 服务器入口
│   ├── supabase/
│   │   ├── schema.sql      # 数据库schema
│   │   └── seed.sql        # 测试数据
│   ├── package.json
│   └── .env                # 环境配置
│
└── docs/                   # 文档（在brain目录）
    ├── quick_start.md      # 快速启动指南
    ├── walkthrough.md      # 实现说明
    └── implementation_plan.md
```

## 🚀 快速开始

### 前提条件

- Node.js 18+
- npm 或 yarn
- Supabase 账号

### 1. 安装依赖

```bash
# 安装前端依赖（根目录）
npm install

# 安装后端依赖
cd backend
npm install
```

### 2. 配置环境变量

#### 前端 (`.env.local`)

```bash
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

#### 后端 (`backend/.env`)

```bash
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. 初始化数据库

在 Supabase SQL Editor 中执行：

1. `backend/supabase/schema.sql` - 创建表结构
2. `backend/supabase/seed.sql` - 插入测试数据

### 4. 启动服务

```bash
# 终端1: 启动后端
cd backend
npm run dev

# 终端2: 启动前端
npm run dev
```

访问：

- 前端：http://localhost:5173
- 后端API：http://localhost:3001

## 📖 详细文档

- [快速启动指南](file:///Users/tgotg/.gemini/antigravity/brain/bd3e3d9b-4d5f-4166-9b13-c99934e62fe9/quick_start.md) - 完整设置步骤
- [实现说明](file:///Users/tgotg/.gemini/antigravity/brain/bd3e3d9b-4d5f-4166-9b13-c99934e62fe9/walkthrough.md) - 架构和实现细节
- [后端API文档](file:///Users/tgotg/Desktop/服务区监测/digital-eye---smart-highway-ai/backend/README.md) - API端点说明
- [数据库设置](file:///Users/tgotg/Desktop/服务区监测/digital-eye---smart-highway-ai/backend/DATABASE_SETUP.md) - 数据库初始化

## 🎨 核心功能

### 页面模块

1. **主控中心** (`/`) - 实时监控大屏
2. **视频监控** (`/monitor`) - 多路视频流管理
3. **算法库** (`/algorithms`) - AI算法管理
4. **算法构建器** (`/builder`) - 对话式算法配置
5. **设备管理** (`/devices`) - 摄像头设备CRUD
6. **报告中心** (`/reports`) - 事件日志和报告
7. **数据分析** (`/analysis`) - 统计图表
8. **系统设置** (`/settings`) - 全局配置
9. **用户权限** (`/permissions`) - 用户管理

### API端点

- `/api/algorithms` - 算法管理
- `/api/cameras` - 摄像头管理
- `/api/events` - 事件日志
- `/api/users` - 用户管理
- `/api/settings` - 系统设置
- `/api/notifications` - 通知管理

## 🔐 认证与授权

使用 Supabase Auth + JWT 实现：

- 三种角色：Admin、Operator、Viewer
- 行级安全策略（RLS）
- 基于角色的API访问控制

## 📊 数据库表

| 表名            | 说明         |
| --------------- | ------------ |
| algorithms      | AI算法配置   |
| camera_feeds    | 摄像头设备   |
| event_logs      | 事件告警日志 |
| user_profiles   | 用户扩展信息 |
| system_settings | 系统配置     |
| notifications   | 通知记录     |
| reports         | 报告元数据   |

## 🛠️ 开发命令

```bash
# 前端
npm run dev          # 开发模式
npm run build        # 构建生产版本
npm run preview      # 预览生产版本

# 后端
npm run dev          # 开发模式（自动重启）
npm run build        # 编译TypeScript
npm start            # 运行生产版本
npm run typecheck    # 类型检查
```

## 📝 待办事项

- [ ] 实现用户认证UI（登录/注册页面）
- [ ] 更新前端组件使用真实API
- [ ] 添加WebSocket支持实时推送
- [ ] 实现文件上传（事件快照）
- [ ] 添加单元测试
- [ ] 部署配置

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**作者**: Digital Eye Team  
**最后更新**: 2026-01-20
