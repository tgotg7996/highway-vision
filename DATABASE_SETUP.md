# 🔧 Database Setup Guide

## Problem: "Database error querying schema"

This error occurs when the database tables don't exist yet. You need to create the schema first.

---

## ✅ Solution 1: Using Supabase Dashboard (Recommended)

### Step 1: Open SQL Editor
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: `digital-eye-smart-highway`
3. Go to **SQL Editor** in the left sidebar

### Step 2: Run Schema
1. Open `backend/supabase/schema.sql`
2. Copy all SQL code
3. Paste it into the SQL Editor
4. Click **"Run"** (or press `Cmd/Ctrl + Enter`)

### Step 3: Verify Tables
1. Go to **Database** → **Tables** in the sidebar
2. You should see these tables:
   - `algorithms`
   - `camera_feeds`
   - `event_logs`
   - `notifications`
   - `reports`
   - `system_settings`
   - `user_profiles`

### Step 4: Seed Test Data (Optional)
1. Go back to **SQL Editor**
2. Open `backend/supabase/seed.sql`
3. Copy and paste the SQL code
4. Click **"Run"**

---

## ✅ Solution 2: Using psql Command Line

If you have `psql` installed:

```bash
./setup-database.sh
```

Or manually:

```bash
# Get your PostgreSQL connection string from Supabase Dashboard
# Project Settings → Database → Connection String → URI

export PSQL_URL="postgresql://postgres.xxxx:xxxx@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

# Create schema
psql "$PSQL_URL" < backend/supabase/schema.sql

# Seed data
psql "$PSQL_URL" < backend/supabase/seed.sql
```

---

## ✅ Solution 3: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Push schema to remote
supabase db push

# Or run migrations
supabase migration up
```

---

## 🔍 Troubleshooting

### Error: "relation does not exist"
**Cause**: Table doesn't exist in the database
**Solution**: Run the schema.sql file (see Solution 1)

### Error: "permission denied"
**Cause**: Your API key doesn't have sufficient permissions
**Solution**:
1. Go to Supabase Dashboard
2. Project Settings → API
3. Use `service_role` key instead of `anon` key
4. Update `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env`

### Error: "connection refused"
**Cause**: Wrong URL or firewall blocking connection
**Solution**:
1. Verify `SUPABASE_URL` is correct in `backend/.env`
2. Check your internet connection
3. Try using the connection string from Supabase Dashboard directly

### Error: "password authentication failed"
**Cause**: Wrong password in connection string
**Solution**:
1. Get fresh connection string from Supabase Dashboard
2. Update `DATABASE_PASSWORD` in `backend/.env` if using direct connection

---

## 📋 After Setup

Once the database is set up:

1. **Verify tables exist**:
   - Go to Supabase Dashboard → Database → Tables
   - Check all 8 tables are listed

2. **Check Row Level Security (RLS)**:
   - Go to Database → Tables → any table
   - Click on "Authentication" (shield icon)
   - Verify RLS policies are active

3. **Test the API**:
   ```bash
   cd backend
   npm run dev
   ```

4. **Test registration**:
   ```bash
   curl -X POST http://localhost:3001/api/users/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
   ```

---

## 📞 Quick Check

Run this to verify your database setup:

```bash
# Test backend connection
cd backend
npm run dev

# You should see:
# ✓ Supabase client initialized
# ✓ Database connection successful
```

If you see "Database error querying schema", the tables don't exist yet.

---

## 🚀 Next Steps

After database setup:

1. Create a test account via registration page
2. Login at http://localhost:3000
3. Explore the dashboard features

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
