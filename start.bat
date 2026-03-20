@echo off

rem 检查并杀死占用端口3001的进程
echo Checking for process using port 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do (
    echo Found process using port 3001, PID: %%a
    taskkill /F /PID %%a
    echo Killed process %%a
)

echo Starting backend service...
npm run start
