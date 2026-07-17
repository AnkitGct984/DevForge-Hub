@echo off
REM Setup Verification Script for Windows
REM This script helps verify that all components are properly set up

echo.
echo 🔍 Blog Website - Setup Verification
echo ====================================
echo.

REM Check Node.js
echo 📌 Checking Node.js...
node -v >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo ✅ Node.js installed: %NODE_VERSION%
) else (
    echo ❌ Node.js not found. Please install Node.js from nodejs.org
)
echo.

REM Check npm
echo 📌 Checking npm...
npm -v >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo ✅ npm installed: %NPM_VERSION%
) else (
    echo ❌ npm not found. Please install npm
)
echo.

REM Check if server folder exists
echo 📌 Checking project structure...
if exist server (
    echo ✅ Server folder found
) else (
    echo ❌ Server folder not found
)

if exist client (
    echo ✅ Client folder found
) else (
    echo ❌ Client folder not found
)
echo.

REM Check .env file
echo 📌 Checking .env configuration...
if exist server\.env (
    echo ✅ .env file found
) else (
    echo ❌ .env file not found. Create it from .env.example
)
echo.

REM Check server dependencies
echo 📌 Checking server dependencies...
if exist server\node_modules (
    echo ✅ Server node_modules found
) else (
    echo ⚠️  Server node_modules not found. Run: cd server && npm install
)
echo.

REM Check for required files
echo 📌 Checking required files...
if exist server\server.js echo ✅ server\server.js
if exist server\package.json echo ✅ server\package.json
if exist client\index.html echo ✅ client\index.html
if exist client\js\api.js echo ✅ client\js\api.js
if exist client\js\app.js echo ✅ client\js\app.js
if exist client\css\style.css echo ✅ client\css\style.css
echo.

REM Summary
echo ====================================
echo ✨ Setup Verification Complete!
echo.
echo 📋 Next Steps:
echo 1. Make sure MongoDB is running
echo 2. Verify .env configuration
echo 3. Run: cd server ^&^& npm install
echo 4. Run: npm start (in server folder)
echo 5. Open client/index.html in browser
echo.
echo For more help, check README.md or QUICKSTART.md
echo.
pause
