@echo off
title n8n - Automatización y Agentes IA
echo ========================================================
echo   Iniciando n8n (Servidor Local)
echo   Abre tu navegador en: http://localhost:5678
echo ========================================================

set PATH=%LOCALAPPDATA%\Programs\nodejs;%APPDATA%\npm;%PATH%
n8n start
pause
