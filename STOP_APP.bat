@echo off
echo Stopping Restaurant Management System...
echo.

REM Kill Node.js processes
taskkill /F /IM node.exe /T >nul 2>nul

echo Application stopped successfully!
echo You can close this window.
pause