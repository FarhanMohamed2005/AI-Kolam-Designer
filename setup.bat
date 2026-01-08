@echo off
REM Setup script for AI Rangoli Designer (Windows)

echo 🎨 AI Rangoli Designer Setup
echo ================================

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

echo ✅ Node.js found
node --version

REM Setup Backend
echo.
echo Setting up backend...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Dependencies already installed
)

REM Create .env file if not exists
if not exist ".env" (
    echo Creating .env file...
    copy .env.example .env
    echo ⚠️  Please edit .env with your configuration
)

cd ..

echo.
echo ✅ Setup complete!
echo.
echo To start the application:
echo 1. Backend: cd backend ^&^& npm run dev
echo 2. Frontend: cd frontend ^&^& npx http-server
echo 3. Open: http://localhost:8080
pause
