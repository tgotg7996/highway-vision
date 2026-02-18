#!/bin/bash

echo "===================================="
echo "  Digital Eye - Troubleshooting Script"
echo "===================================="
echo ""

echo "1. Checking backend environment..."
if [ ! -f "backend/.env" ]; then
    echo "   ❌ backend/.env not found!"
    echo "   Creating from backend/.env.example..."
    cp backend/.env.example backend/.env
    echo "   ⚠️  Please update backend/.env with your Supabase credentials"
fi

source backend/.env

echo "   ✓ .env file loaded"
echo ""

echo "2. Checking required environment variables..."
MISSING_VARS=()

if [ -z "$SUPABASE_URL" ]; then
    echo "   ❌ SUPABASE_URL is missing"
    MISSING_VARS+=("SUPABASE_URL")
fi

if [ -z "$SUPABASE_ANON_KEY" ]; then
    echo "   ❌ SUPABASE_ANON_KEY is missing"
    MISSING_VARS+=("SUPABASE_ANON_KEY")
fi

if [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "   ❌ SUPABASE_SERVICE_ROLE_KEY is missing"
    MISSING_VARS+=("SUPABASE_SERVICE_ROLE_KEY")
fi

if [ -z "$PORT" ]; then
    echo "   ❌ PORT is missing"
    MISSING_VARS+=("PORT")
fi

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo ""
    echo "   ⚠️  Missing variables: ${MISSING_VARS[@]}"
    echo "   Please update backend/.env file"
    exit 1
fi

echo "   ✓ All required variables present"
echo ""

echo "3. Checking node_modules..."
if [ ! -d "backend/node_modules" ]; then
    echo "   ⚠️  node_modules not found"
    echo "   Installing dependencies..."
    cd backend && npm install
    if [ $? -ne 0 ]; then
        echo "   ❌ Failed to install dependencies"
        exit 1
    fi
    cd ..
fi

echo "   ✓ node_modules exists"
echo ""

echo "4. Testing Supabase connection..."
node backend/test-connection.js 2>/dev/null

if [ $? -eq 0 ]; then
    echo "   ✓ Supabase connection successful"
else
    echo "   ❌ Supabase connection failed"
    echo "   Please check your credentials in backend/.env"
    echo ""
    echo "   Common issues:"
    echo "   - Wrong SUPABASE_URL"
    echo "   - Invalid API keys"
    echo "   - Database tables not created"
fi

echo ""
echo "===================================="
echo "  Troubleshooting Complete!"
echo "===================================="
echo ""
echo "If all checks passed, try:"
echo "  cd backend && npm run dev"
echo ""
