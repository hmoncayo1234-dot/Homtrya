# Script de instalación y configuración de n8n para Windows
$ErrorActionPreference = "Stop"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " 🚀 Iniciando instalación de n8n en Windows" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Directorio destino para Node.js
$nodeDir = "$env:LOCALAPPDATA\Programs\nodejs"
if (!(Test-Path $nodeDir)) {
    New-Item -ItemType Directory -Path $nodeDir -Force | Out-Null
}

$nodeExe = "$nodeDir\node.exe"
if (!(Test-Path $nodeExe)) {
    Write-Host "`n[1/3] Descargando Node.js v22 LTS..." -ForegroundColor Yellow
    $zipPath = "$env:TEMP\node-v22.zip"
    $url = "https://nodejs.org/dist/v22.23.2/node-v22.23.2-win-x64.zip"
    Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing

    Write-Host "[1/3] Extrayendo Node.js..." -ForegroundColor Yellow
    $extractPath = "$env:TEMP\node-extract"
    if (Test-Path $extractPath) { Remove-Item -Path $extractPath -Recurse -Force }
    Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force
    Copy-Item -Path "$extractPath\node-v22.23.2-win-x64\*" -Destination $nodeDir -Recurse -Force
    Remove-Item -Path $zipPath, $extractPath -Recurse -Force
    Write-Host "✔ Node.js instalado correctamente en $nodeDir" -ForegroundColor Green
} else {
    Write-Host "`n[1/3] ✔ Node.js ya se encuentra instalado." -ForegroundColor Green
}

# 2. Configurar variables de entorno en la sesión actual y en el usuario
$npmDir = "$env:APPDATA\npm"
if (!(Test-Path $npmDir)) {
    New-Item -ItemType Directory -Path $npmDir -Force | Out-Null
}

$env:PATH = "$nodeDir;$npmDir;$env:PATH"
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$nodeDir*") {
    $userPath = "$nodeDir;$npmDir;$userPath"
    [Environment]::SetEnvironmentVariable("Path", $userPath, "User")
}

Write-Host "`n[2/3] Versiones del entorno:" -ForegroundColor Yellow
& "$nodeDir\node.exe" -v
& "$nodeDir\npm.cmd" -v

# 3. Instalar n8n globalmente
Write-Host "`n[3/3] Instalando n8n (esto puede tomar 1 o 2 minutos)..." -ForegroundColor Yellow
& "$nodeDir\npm.cmd" install -g n8n --loglevel=error

Write-Host "`n=========================================" -ForegroundColor Green
Write-Host " 🎉 ¡n8n se ha instalado con éxito!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Para iniciar n8n, puedes ejecutar: n8n start" -ForegroundColor Cyan
Write-Host "O ejecutar el archivo 'iniciar_n8n.bat' creado en esta carpeta." -ForegroundColor Cyan
