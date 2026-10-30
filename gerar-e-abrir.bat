@echo off
rem Coleta, gera, testa e abre o site local em http://127.0.0.1:4191
cd /d "%~dp0"
call npm run atualizar
if errorlevel 1 (
  echo.
  echo Falhou. Veja as mensagens acima.
  pause <nul
  exit /b 1
)
start "" http://127.0.0.1:4191
call npm run preview
