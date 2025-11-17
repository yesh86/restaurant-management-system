@echo off
title Restaurant Management System
echo Starting Backend...
start "Backend Server" cmd /k "cd backend && npm install && npm start"

timeout /t 5 /nobreak

echo Starting Frontend...
start "Frontend App" cmd /k "cd frontend && npm install && npm start"

echo.
echo Two windows should have opened!
echo Login: admin / V@ibhavam
echo.
pause
```

## Or Just Use Manual Commands

For now, tell your friend to:
1. Open Command Prompt
2. Run these commands one by one:
```
cd C:\restaurant
start cmd /k "cd backend && npm install && npm start"
```

Wait a few seconds, then:
```
start cmd /k "cd frontend && npm install && npm start"
