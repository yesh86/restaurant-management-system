@echo off
echo ========================================
echo   Restaurant Management System
echo ========================================
echo.
echo Starting the application...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo Node.js found: 
node -v
echo npm version: 
npm -v
echo.

REM Start backend in a new window
echo Starting Backend Server...
cd backend
start cmd /k "npm install && npm start"

REM Wait 5 seconds for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend in a new window
echo Starting Frontend...
cd ..\frontend
start cmd /k "npm install && npm start"

cd ..

echo.
echo ========================================
echo Application is starting!
echo.
echo Backend will run at: http://localhost:5000
echo Frontend will open at: http://localhost:3000
echo.
echo Login credentials:
echo Username: admin
echo Password: V@ibhavam
echo.
echo Keep both windows open while using the app.
echo ========================================
echo.

pause
