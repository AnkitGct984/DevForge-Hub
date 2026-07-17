#!/bin/bash
# Setup Verification Script
# This script helps verify that all components are properly set up

echo "🔍 Blog Website - Setup Verification"
echo "===================================="
echo ""

# Check Node.js
echo "📌 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js from nodejs.org"
fi
echo ""

# Check npm
echo "📌 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm installed: $NPM_VERSION"
else
    echo "❌ npm not found. Please install npm"
fi
echo ""

# Check MongoDB
echo "📌 Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB installed"
else
    echo "⚠️  MongoDB CLI not found. Using MongoDB Atlas? Make sure connection string is in .env"
fi
echo ""

# Check if server folder exists
echo "📌 Checking project structure..."
if [ -d "server" ]; then
    echo "✅ Server folder found"
else
    echo "❌ Server folder not found"
fi

if [ -d "client" ]; then
    echo "✅ Client folder found"
else
    echo "❌ Client folder not found"
fi
echo ""

# Check .env file
echo "📌 Checking .env configuration..."
if [ -f "server/.env" ]; then
    echo "✅ .env file found"
    if grep -q "MONGODB_URI" server/.env; then
        echo "✅ MONGODB_URI configured"
    else
        echo "⚠️  MONGODB_URI not found in .env"
    fi
    if grep -q "JWT_SECRET" server/.env; then
        echo "✅ JWT_SECRET configured"
    else
        echo "⚠️  JWT_SECRET not found in .env"
    fi
else
    echo "❌ .env file not found. Create it from .env.example"
fi
echo ""

# Check server dependencies
echo "📌 Checking server dependencies..."
if [ -d "server/node_modules" ]; then
    echo "✅ Server node_modules found"
else
    echo "⚠️  Server node_modules not found. Run: cd server && npm install"
fi
echo ""

# Check for required files
echo "📌 Checking required files..."
FILES=(
    "server/server.js"
    "server/package.json"
    "client/index.html"
    "client/js/api.js"
    "client/js/app.js"
    "client/css/style.css"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file missing"
    fi
done
echo ""

# Summary
echo "===================================="
echo "✨ Setup Verification Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Make sure MongoDB is running"
echo "2. Verify .env configuration"
echo "3. Run: cd server && npm install"
echo "4. Run: npm start (in server folder)"
echo "5. Open client/index.html in browser"
echo ""
echo "For more help, check README.md or QUICKSTART.md"
