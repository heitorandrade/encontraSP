$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

function Write-Step {
  param([string]$Message)
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Get-PortListener {
  param([int]$Port)

  try {
    return Get-NetTCPConnection -LocalPort $Port -State Listen | Select-Object -First 1
  } catch {
    return $null
  }
}

function Wait-ForHttp {
  param(
    [string]$Url,
    [int]$Attempts = 25,
    [int]$DelaySeconds = 2
  )

  for ($attempt = 1; $attempt -le $Attempts; $attempt++) {
    try {
      $response = Invoke-WebRequest -UseBasicParsing $Url -TimeoutSec 5
      return $response
    } catch {
      Start-Sleep -Seconds $DelaySeconds
    }
  }

  return $null
}

Write-Step "Validando build"
npm run build

$listener = Get-PortListener -Port 3000

if ($listener) {
  Write-Step "Encerrando processo antigo na porta 3000"
  try {
    $processInfo = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)" |
      Select-Object ProcessId, Name, CommandLine

    if ($processInfo) {
      Write-Host ("PID anterior: {0}" -f $processInfo.ProcessId)
      Write-Host ("Processo: {0}" -f $processInfo.Name)
      Write-Host ("Comando: {0}" -f $processInfo.CommandLine)
    }
  } catch {
    Write-Host "Nao foi possivel inspecionar o processo antigo." -ForegroundColor Yellow
  }

  Stop-Process -Id $listener.OwningProcess -Force
  Start-Sleep -Seconds 2
}

Write-Step "Subindo servidor local em http://localhost:3000"
$devProcess = Start-Process -FilePath "npm.cmd" `
  -ArgumentList @("run", "dev", "--", "--port", "3000") `
  -WorkingDirectory $projectRoot `
  -PassThru

Start-Sleep -Seconds 3

$activeListener = Get-PortListener -Port 3000
if (-not $activeListener) {
  throw "A porta 3000 nao ficou em LISTEN apos iniciar o servidor."
}

$response = Wait-ForHttp -Url "http://localhost:3000"
if (-not $response) {
  throw "localhost:3000 nao respondeu com HTTP valido."
}

$expectedMarkers = @("Encontra SP", "Negocios em destaque", "__next")
$html = [string]$response.Content
$matchedMarkers = $expectedMarkers | Where-Object { $html -like "*$_*" }

if ($response.StatusCode -ne 200) {
  throw "localhost:3000 respondeu com status $($response.StatusCode)."
}

if ($matchedMarkers.Count -eq 0) {
  throw "localhost:3000 respondeu, mas nao retornou os marcadores esperados da home."
}

Write-Step "Servidor validado"
Write-Host ("PID atual: {0}" -f $activeListener.OwningProcess) -ForegroundColor Green
Write-Host ("Status HTTP: {0}" -f $response.StatusCode) -ForegroundColor Green
Write-Host ("Marcadores encontrados: {0}" -f ($matchedMarkers -join ", ")) -ForegroundColor Green
Write-Host "Abra http://localhost:3000" -ForegroundColor Green
Write-Host "Para encerrar depois: Stop-Process -Id $($activeListener.OwningProcess)" -ForegroundColor DarkGray
