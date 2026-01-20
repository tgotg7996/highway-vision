# Supabase Database Setup Instructions

## 方式一：使用 Supabase SQL Editor (推荐)

### 步骤 1: 打开 SQL Editor

1. 访问 https://app.supabase.com
2. 选择您的项目 (yyzmeapinodmplicujru)
3. 左侧菜单点击 **SQL Editor**
4. 点击 **+ New query** 创建新查询

### 步骤 2: 执行 Schema

1. 打开文件 `backend/supabase/schema.sql`
2. 复制全部内容
3. 粘贴到 SQL Editor
4. 点击右下角的 **Run** 按钮 (或按 Cmd/Ctrl + Enter)
5. 等待执行完成，应该看到 "Success. No rows returned" 或类似消息

### 步骤 3: 插入测试数据 (可选)

1. 打开文件 `backend/supabase/seed.sql`
2. 复制全部内容
3. 粘贴到新的 SQL Editor 查询
4. 点击 **Run** 按钮
5. 成功后会插入示例算法、摄像头、事件等数据

---

## 方式二：使用 psql 命令行 (高级)

如果您熟悉 PostgreSQL，可以使用 psql 连接：

```bash
# 获取数据库连接字符串
# 在 Supabase 控制台: Settings → Database → Connection string

psql "your-connection-string"

# 执行 schema
\i backend/supabase/schema.sql

# 执行 seed data
\i backend/supabase/seed.sql
```

---

## 验证数据库

执行 schema 后，检查表是否创建成功：

1. 在 Supabase 控制台左侧菜单点击 **Table Editor**
2. 您应该看到以下表：
   - ✅ algorithms
   - ✅ camera_feeds
   - ✅ event_logs
   - ✅ user_profiles
   - ✅ system_settings
   - ✅ notifications
   - ✅ reports

如果看到这些表，说明数据库设置成功！

---

## 常见问题

**Q: 执行 schema 时出现 "permission denied" 错误**
A: 确保您使用的是 service_role key，而不是 anon key

**Q: 表已存在的错误**
A: 这是正常的，说明表已经创建过了。如果需要重新创建，可以先删除表或使用 DROP TABLE IF EXISTS

**Q: RLS 策略报错**
A: 确保先执行完整个 schema.sql，RLS 策略依赖于表的存在

---

## 下一步

数据库设置完成后：

1. 确保 `backend/.env` 文件中的 `SUPABASE_SERVICE_ROLE_KEY` 已填写
2. 返回后端目录运行 `npm run dev` 启动API服务器
3. 访问 http://localhost:3001/health 验证服务器运行
