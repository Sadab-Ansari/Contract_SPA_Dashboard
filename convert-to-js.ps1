# PowerShell script to convert all TypeScript files to JavaScript
Write-Host "Converting TypeScript files to JavaScript..."

# Get all .tsx and .ts files (excluding node_modules)
$tsxFiles = Get-ChildItem -Path "." -Filter "*.tsx" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" }
$tsFiles = Get-ChildItem -Path "." -Filter "*.ts" -Recurse | Where-Object { $_.FullName -notmatch "node_modules" -and $_.Name -ne "vite.config.ts" }

# Convert .tsx files to .jsx
foreach ($file in $tsxFiles) {
    $newName = $file.Name -replace "\.tsx$", ".jsx"
    $newPath = Join-Path $file.Directory $newName
    Write-Host "Renaming: $($file.Name) -> $newName"
    Rename-Item -Path $file.FullName -NewName $newName
}

# Convert .ts files to .js
foreach ($file in $tsFiles) {
    $newName = $file.Name -replace "\.ts$", ".js"
    $newPath = Join-Path $file.Directory $newName
    Write-Host "Renaming: $($file.Name) -> $newName"
    Rename-Item -Path $file.FullName -NewName $newName
}

Write-Host "File conversion complete!"