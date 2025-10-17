========================================
RESTAURANT MANAGEMENT SYSTEM - USER GUIDE
========================================

FIRST TIME SETUP:
1. Install Node.js v16 LTS from: https://nodejs.org
   ✅ Make sure to check "Add to PATH" during installation

2. Restart your computer after installing Node.js

3. Double-click "START_APP.bat"
   - First time will take 2-5 minutes to install dependencies
   - Two windows will open (Backend and Frontend)
   - Your browser will automatically open to http://localhost:3000

LOGIN CREDENTIALS:
Username: admin
Password: V@ibhavam

HOW TO USE:
1. Double-click "START_APP.bat" to start the application
2. Wait for browser to open automatically
3. Login with the credentials above
4. Use the application
5. When done, double-click "STOP_APP.bat" to stop

IMPORTANT NOTES:
- Keep both terminal windows open while using the app
- Don't close the black windows that appear
- If browser doesn't open, manually go to: http://localhost:3000
- First time startup takes longer (installing packages)
- Subsequent startups are faster

TROUBLESHOOTING:
- If app doesn't start: Make sure Node.js is installed
- If port errors: Run "STOP_APP.bat" first, then try again
- If login fails: Check username/password (case-sensitive)

========================================
```

### 4. Create a Complete Package

Create a `.zip` file with:
```
restaurant-management-system/
├── START_APP.bat          ← Double-click this to start
├── STOP_APP.bat           ← Double-click this to stop
├── README_FOR_USER.txt    ← Read this first
├── frontend/
├── backend/
└── (all other project files)