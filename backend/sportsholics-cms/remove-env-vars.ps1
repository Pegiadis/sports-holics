# Script to remove conflicting database environment variables
# This allows Strapi to use the .env file instead of system variables

Write-Host "Removing conflicting system environment variables..." -ForegroundColor Yellow
Write-Host ""

# List of variables to remove
$varsToRemove = @(
    'DATABASE_NAME',
    'DATABASE_HOST_PGPOOL_READER',
    'DATABASE_HOST_PGPOOL_WRITER',
    'DATABASE_IP_READER',
    'DATABASE_IP_WRITER',
    'DATABASE_PORT_READER',
    'DATABASE_PORT_WRITER',
    'DATABASE_POOLING',
    'DATABASE_SSL'
)

foreach ($varName in $varsToRemove) {
    # Check if the variable exists
    $userVar = [System.Environment]::GetEnvironmentVariable($varName, 'User')
    $machineVar = [System.Environment]::GetEnvironmentVariable($varName, 'Machine')
    
    if ($userVar) {
        Write-Host "Removing User variable: $varName = $userVar" -ForegroundColor Cyan
        [System.Environment]::SetEnvironmentVariable($varName, $null, 'User')
    }
    
    if ($machineVar) {
        Write-Host "Removing Machine variable: $varName = $machineVar (requires admin)" -ForegroundColor Red
        # Uncomment the next line if running as Administrator
        # [System.Environment]::SetEnvironmentVariable($varName, $null, 'Machine')
    }
}

Write-Host ""
Write-Host "Done! Please restart your terminal for changes to take effect." -ForegroundColor Green
Write-Host ""
Write-Host "If you see 'requires admin' messages, run this script as Administrator:" -ForegroundColor Yellow
Write-Host "  Right-click PowerShell -> Run as Administrator" -ForegroundColor Yellow
Write-Host "  Then run: .\remove-env-vars.ps1" -ForegroundColor Yellow


