#!/bin/bash

echo "===================================="
echo "  Digital Eye - Setup Script"
echo "===================================="
echo ""

if [ ! -f "backend/.env" ]; then
    echo "❌ Error: backend/.env not found!"
    echo "   Please create it from backend/.env.example"
    exit 1
fi

source backend/.env

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Error: Missing Supabase environment variables!"
    echo "   Please check backend/.env file"
    exit 1
fi

echo "✓ Found Supabase configuration"
echo "  URL: $SUPABASE_URL"
echo ""

PSQL_URL="${SUPABASE_URL}/postgres?pgbouncer=true"

echo "===================================="
echo "  Step 1: Creating Schema"
echo "===================================="

psql "$PSQL_URL" < backend/supabase/schema.sql

if [ $? -eq 0 ]; then
    echo "✓ Schema created successfully"
else
    echo "❌ Error creating schema"
    exit 1
fi

echo ""
echo "===================================="
echo "  Step 2: Seeding Data"
echo "===================================="

psql "$PSQL_URL" < backend/supabase/seed.sql

if [ $? -eq 0 ]; then
    echo "✓ Test data seeded successfully"
else
    echo "❌ Error seeding data"
    exit 1
fi

echo ""
echo "===================================="
echo "  Setup Complete!"
echo "===================================="
echo ""
echo "✅ Database is ready!"
echo ""
echo "Next steps:"
echo "  1. Start backend: cd backend && npm run dev"
echo "  2. Start frontend: npm run dev"
echo "  3. Visit: http://localhost:3000"
echo ""
