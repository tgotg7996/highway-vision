# GitHub发布指南

## 📋 发布到GitHub的步骤

### 1. Git仓库已初始化 ✅

项目已经初始化为Git仓库，所有文件已添加到暂存区。

### 2. 创建首次提交

```bash
git commit -m "feat: initial commit - Digital Eye智慧高速监控平台

- ✨ 实现总控台(MainControl)功能
- ✨ 实现视频监控(VideoMonitor)功能
- ✨ 实现报表中心(ReportCenter)功能
- ✨ 实现算法库(AlgorithmLibrary)
- ✨ 实现算法构建器(AlgorithmBuilder)
- 🎨 统一设计风格，深色主题
- ⚡ 添加交互功能：搜索、筛选、分页
- 📝 完善README文档"
```

### 3. 在GitHub上创建仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `digital-eye-smart-highway-ai` 或 `digital-eye---smart-highway-ai`
   - **Description**: `🛣️ 智慧高速AI监控平台 - 现代化B2B视频监控、事件分析与报表系统`
   - **Visibility**: Public 或 Private
   - **⚠️ 不要勾选** "Initialize this repository with a README"

3. 点击 **Create repository**

### 4. 关联远程仓库

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/digital-eye---smart-highway-ai.git

# 或使用SSH (推荐)
git remote add origin git@github.com:YOUR_USERNAME/digital-eye---smart-highway-ai.git
```

### 5. 推送到GitHub

```bash
# 推送到main分支
git push -u origin main

# 如果失败，可能需要先设置默认分支
git branch -M main
git push -u origin main
```

---

## 🔧 后续维护

### 日常提交流程

```bash
# 1. 查看修改
git status

# 2. 添加文件
git add .

# 3. 提交更改
git commit -m "feat: 添加新功能"

# 4. 推送到远程
git push
```

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具链相关

示例：

```bash
git commit -m "feat: 添加用户权限管理功能"
git commit -m "fix: 修复报表导出CSV编码问题"
git commit -m "docs: 更新API文档"
```

---

## 📌 可选：添加GitHub配置

### 创建 LICENSE 文件

```bash
# MIT License (推荐)
echo "MIT License

Copyright (c) $(date +%Y) YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy...
" > LICENSE
```

### 配置 GitHub Actions (CI/CD)

创建 `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run build
```

### 添加 GitHub Topics

在GitHub仓库页面点击 **⚙️ Settings** → **About** → **Topics**，添加：

- `react`
- `typescript`
- `vite`
- `monitoring`
- `dashboard`
- `ai`
- `smart-highway`
- `b2b-platform`

---

## ✅ 检查清单

发布前确认：

- [ ] README.md 内容完整
- [ ] .gitignore 配置正确
- [ ] 敏感信息已移除（.env.local等）
- [ ] 代码可以正常构建 (`npm run build`)
- [ ] 所有功能正常运行
- [ ] package.json 信息准确
- [ ] 添加了 LICENSE 文件(可选)

---

## 🎯 下一步

1. 完成首次提交
2. 在GitHub创建仓库
3. 推送代码
4. 添加仓库描述和Topics
5. （可选）配置GitHub Pages部署演示站点

---

**需要帮助？**

- Git问题: https://git-scm.com/docs
- GitHub指南: https://docs.github.com
