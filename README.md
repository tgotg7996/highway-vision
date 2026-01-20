# 🛣️ Digital Eye - 智慧高速AI监控平台

<div align="center">

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

一个现代化的B2B智慧高速监控平台，提供实时视频监控、事件分析、报表生成和AI算法管理等功能。

[在线演示](#) | [功能特性](#features) | [快速开始](#quick-start)

</div>

---

## ✨ 功能特性

### 🎯 核心功能

- **📊 总控台 (MainControl)**
  - 实时路网监控地图
  - 动画效果的地图线路展示
  - 事件中心、报表中心快捷访问
  - 全局搜索、通知系统、用户菜单

- **📹 视频监控 (VideoMonitor)**
  - 实时视频流监控
  - 网格视图/聚焦模式切换
  - AI部件识别与标注
  - 视频控制（播放/暂停/静音/全屏）
  - 过滤标签动态筛选

- **📈 报表中心 (ReportCenter)**
  - 事件数据统计与分析
  - CSV格式导出报表
  - 实时搜索与多维度筛选
  - 智能分页导航
  - 数据可视化大屏

- **🧠 算法库 (AlgorithmLibrary)**
  - AI算法模型管理
  - 算法配置与部署
  - 性能监控

- **⚙️ 算法构建器 (AlgorithmBuilder)**
  - 可视化算法配置
  - 参数调优界面
  - 模型训练管理

### 🎨 设计亮点

- ✅ 深色主题，专业科技感UI
- ✅ 流畅的动画效果与过渡
- ✅ 响应式布局，适配多种屏幕
- ✅ Glassmorphism 玻璃态设计
- ✅ 完整的交互反馈

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18.0
- npm >= 9.0

### 安装

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/digital-eye---smart-highway-ai.git

# 进入项目目录
cd digital-eye---smart-highway-ai

# 安装依赖
npm install
```

### 开发

```bash
# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 查看应用

### 构建

```bash
# 生产环境构建
npm run build

# 预览构建结果
npm run preview
```

---

## 📁 项目结构

```
digital-eye---smart-highway-ai/
├── components/          # 可复用组件
│   ├── common/         # 通用组件 (Button, Card, Modal等)
│   └── Layout.tsx      # 布局组件
├── pages/              # 页面组件
│   ├── MainControl.tsx       # 总控台
│   ├── VideoMonitor.tsx      # 视频监控
│   ├── ReportCenter.tsx      # 报表中心
│   ├── AlgorithmLibrary.tsx  # 算法库
│   └── AlgorithmBuilder.tsx  # 算法构建器
├── assets/             # 静态资源
├── styles.css          # 全局样式
├── types.ts            # TypeScript 类型定义
└── App.tsx             # 应用入口
```

---

## 🛠️ 技术栈

### 前端框架

- **React 19** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **React Router DOM** - 路由管理

### UI & 样式

- **Tailwind CSS** - 原子化CSS
- **Lucide React** - 图标库
- **Glassmorphism** - 玻璃态设计

### 开发工具

- **ESLint** - 代码检查
- **TypeScript** - 类型检查

---

## 🎯 已实现功能

### Phase 1: 核心组件 ✅

- [x] NotificationPanel - 通知面板
- [x] UserMenu - 用户菜单
- [x] Modal - 模态框组件

### Phase 2: MainControl增强 ✅

- [x] 导航按钮交互
- [x] 全局搜索功能
- [x] 通知面板集成
- [x] 用户菜单集成
- [x] 地图动画效果

### Phase 3: VideoMonitor增强 ✅

- [x] 视图模式切换
- [x] 视频控制功能
- [x] 过滤标签交互
- [x] UI布局优化

### Phase 4: ReportCenter增强 ✅

- [x] CSV导出功能
- [x] 实时搜索
- [x] 数据筛选
- [x] 智能分页

### Phase 5-6: 待完成 🚧

- [ ] 算法库交互完善
- [ ] 算法构建器功能
- [ ] 全局设置页面
- [ ] 用户权限管理

---

## 📝 开发日志

详见 [CHANGELOG.md](CHANGELOG.md)

---

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 👨‍💻 作者

**Your Name**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

## 🙏 致谢

- UI设计灵感来自现代B2B监控平台
- 图标由 [Lucide](https://lucide.dev/) 提供
- 使用 [Vite](https://vitejs.dev/) 构建

---

<div align="center">

Made with ❤️ for Smart Highway Monitoring

⭐ 如果这个项目对你有帮助，请给个Star！

</div>
