# Script pour remplacer provide() par useDocsPage() dans tous les fichiers Vue

$files = Get-ChildItem -Path "app/pages" -Filter "*.vue" -Recurse | Where-Object { 
    $content = Get-Content $_.FullName -Raw
    $content -match "provide\('headings'"
}

Write-Host "Found $($files.Count) files to update"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Pattern pour trouver les blocs provide
    if ($content -match "provide\('prevPage'|provide\('nextPage'|provide\('headings'") {
        # Trouver la section avec les provide
        $pattern = "(const\s+(prevPage|nextPage)\s*=\s*[^;]+;[\s\n]*)+"
        
        # Remplacer les provide par useDocsPage
        $content = $content -replace "provide\('prevPage',\s*(.+?)\)", "setPrevPage(`$1)"
        $content = $content -replace "provide\('nextPage',\s*(.+?)\)", "setNextPage(`$1)"
        $content = $content -replace "provide\('headings',\s*(.+?)\)", "setHeadings(`$1)"
        
        # Ajouter useDocsPage avant les appels setPrevPage/setNextPage/setHeadings
        if ($content -match "setPrevPage|setNextPage|setHeadings") {
            if ($content -notmatch "const \{ setPrevPage, setNextPage, setHeadings \} = useDocsPage\(\)") {
                # Trouver où insérer useDocsPage (avant le premier setPrevPage/setNextPage/setHeadings)
                $lines = $content -split "`n"
                $insertIndex = -1
                
                for ($i = 0; $i -lt $lines.Length; $i++) {
                    if ($lines[$i] -match "setPrevPage|setNextPage|setHeadings") {
                        # Chercher la dernière ligne avec const prevPage ou const nextPage avant
                        for ($j = $i - 1; $j -ge 0; $j--) {
                            if ($lines[$j] -match "const\s+(prevPage|nextPage)\s*=") {
                                $insertIndex = $j + 1
                                break
                            }
                        }
                        if ($insertIndex -ge 0) {
                            break
                        }
                    }
                }
                
                if ($insertIndex -ge 0) {
                    $newLines = @()
                    for ($i = 0; $i -lt $lines.Length; $i++) {
                        $newLines += $lines[$i]
                        if ($i -eq $insertIndex - 1) {
                            $newLines += ""
                            $newLines += "const { setPrevPage, setNextPage, setHeadings } = useDocsPage()"
                        }
                    }
                    $content = $newLines -join "`n"
                }
            }
        }
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            Write-Host "Updated: $($file.FullName)"
        }
    }
}

Write-Host "Done! Updated $($files.Count) files."
