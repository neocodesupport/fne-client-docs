# Script PowerShell pour mettre à jour tous les fichiers de documentation
# Remplace provide() par useDocsPage()

$files = Get-ChildItem -Path "app/pages" -Filter "*.vue" -Recurse | Where-Object { 
    $content = Get-Content $_.FullName -Raw
    $content -match "provide\('headings'"
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remplacer les provide par useDocsPage
    if ($content -match "provide\('prevPage'|provide\('nextPage'|provide\('headings'") {
        # Ajouter l'import si nécessaire (mais useDocsPage est auto-importé)
        # Remplacer les provide
        $content = $content -replace "provide\('prevPage',\s*(.+?)\)", "setPrevPage(`$1)"
        $content = $content -replace "provide\('nextPage',\s*(.+?)\)", "setNextPage(`$1)"
        $content = $content -replace "provide\('headings',\s*(.+?)\)", "setHeadings(`$1)"
        
        # Ajouter useDocsPage avant les appels
        if ($content -match "setPrevPage|setNextPage|setHeadings") {
            if ($content -notmatch "const \{ setPrevPage, setNextPage, setHeadings \} = useDocsPage\(\)") {
                # Trouver où insérer useDocsPage (avant le premier setPrevPage/setNextPage/setHeadings)
                $pattern = "(const prevPage|const nextPage|// .*[Pp]rovide|// .*[Ff]ournir)"
                if ($content -match $pattern) {
                    $insertPoint = $content.IndexOf($matches[0])
                    $beforeInsert = $content.Substring(0, $insertPoint)
                    $afterInsert = $content.Substring($insertPoint)
                    
                    # Trouver la dernière ligne avec const prevPage/nextPage
                    $lines = $beforeInsert -split "`n"
                    $lastConstLine = -1
                    for ($i = $lines.Length - 1; $i -ge 0; $i--) {
                        if ($lines[$i] -match "const (prevPage|nextPage)") {
                            $lastConstLine = $i
                            break
                        }
                    }
                    
                    if ($lastConstLine -ge 0) {
                        $newContent = ($lines[0..$lastConstLine] -join "`n") + "`n`nconst { setPrevPage, setNextPage, setHeadings } = useDocsPage()`n" + ($lines[($lastConstLine+1)..($lines.Length-1)] -join "`n") + $afterInsert
                        $content = $newContent
                    }
                }
            }
        }
        
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Done! Updated $($files.Count) files."
