# PowerShell script to convert CoffeeScript tests to ES6/Vitest

$testDir = "test\tests"
$filesToConvert = @(
    "ContextTest",
    "CurvesTest",
    "DeviceComponentTest",
    "FlowComponentTest",
    "GradientTest",
    "ImporterTest",
    "LayerAnimationTest",
    "LayerDraggableTest",
    "LayerEventsTest",
    "LayerGesturesTest",
    "LayerStatesBackwardsTest",
    "LayerStatesTest",
    "LayerTest",
    "PageComponentTest",
    "PreloaderTest",
    "RangeSliderComponentTest",
    "ScrollComponentTest",
    "SliderComponentTest",
    "SVGLayerTest",
    "SVGPathTest",
    "TextLayerTest",
    "UtilsTest",
    "VideoLayerTest"
)

Write-Host "Starting test file conversion to ES6/Vitest..." -ForegroundColor Cyan
Write-Host ""

foreach ($baseName in $filesToConvert) {
    $coffeeFile = Join-Path $testDir "$baseName.coffee"
    $jsFile = Join-Path $testDir "$baseName.js"
    $finalFile = Join-Path $testDir "$($baseName -replace 'Test$','').test.js"
    
    Write-Host "Converting $baseName.coffee..." -ForegroundColor Yellow
    
    try {
        # Run decaffeinate
        npx decaffeinate --use-js-modules $coffeeFile 2>&1 | Out-Null
        
        if (Test-Path $jsFile) {
            # Read the converted file
            $content = Get-Content $jsFile -Raw
            
            # Post-process: Remove old requires
            $content = $content -replace "require\('es6-promise'\)\.polyfill\(\);?", ""
            $content = $content -replace "const assert = require\(`"assert`"\);?", ""
            $content = $content -replace "const \{expect\} = require\(`"chai`"\);?", ""
            $content = $content -replace "import \{expect\} from 'chai';?", ""
            
            # Add Vitest imports
            $imports = "import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';`nimport Framer from '../../framer/Framer.js';`n`nconst { Layer, Align, Animation, Utils, Events, Color, Screen, SVGLayer } = Framer;`n`n"
            
            # Find the first describe and add imports before it
            if ($content -match '(?s)(.*?)(describe\()') {
                $before = $matches[1] -replace '^\s+', ''
                $content = $imports + $matches[2] + $content.Substring($matches[0].Length)
            }
            
            # Replace .should.equal with expect().toBe()
            $content = $content -replace '([a-zA-Z_$][\w.$]*|[a-zA-Z_$][\w.$]*\([^)]*\))\.should\.equal\(([^)]+)\)', 'expect($1).toBe($2)'
            
            # Replace .should.eql with expect().toEqual()  
            $content = $content -replace '([a-zA-Z_$][\w.$]*|[a-zA-Z_$][\w.$]*\([^)]*\))\.should\.eql\(([^)]+)\)', 'expect($1).toEqual($2)'
            
            # Replace .should.be.true/false
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.true', 'expect($1).toBe(true)'
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.false', 'expect($1).toBe(false)'
            
            # Replace .should.exist
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.exist', 'expect($1).toBeTruthy()'
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.not\.exist', 'expect($1).toBeFalsy()'
            
            # Replace .should.be.ok
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.ok', 'expect($1).toBeTruthy()'
            
            # Replace .should.be.undefined/null
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.undefined', 'expect($1).toBeUndefined()'
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.null', 'expect($1).toBeNull()'
            
            # Replace .should.be.instanceOf
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.instanceOf\(([^)]+)\)', 'expect($1).toBeInstanceOf($2)'
            
            # Replace .should.be.above/below
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.above\(([^)]+)\)', 'expect($1).toBeGreaterThan($2)'
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.below\(([^)]+)\)', 'expect($1).toBeLessThan($2)'
            
            # Replace .should.be.closeTo
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.be\.closeTo\(([^,]+),\s*([^)]+)\)', 'expect($1).toBeCloseTo($2, $3)'
            
            # Replace .should.have.length
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.have\.length\(([^)]+)\)', 'expect($1).toHaveLength($2)'
            
            # Replace .should.contain/include
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.contain\(([^)]+)\)', 'expect($1).toContain($2)'
            $content = $content -replace '([a-zA-Z_$][\w.$]*)\.should\.include\(([^)]+)\)', 'expect($1).toContain($2)'
            
            # Replace chai expect syntax
            $content = $content -replace 'expect\(([^)]+)\)\.to\.equal\(([^)]+)\)', 'expect($1).toBe($2)'
            $content = $content -replace 'expect\(([^)]+)\)\.to\.eql\(([^)]+)\)', 'expect($1).toEqual($2)'
            $content = $content -replace 'expect\(([^)]+)\)\.to\.be\.true', 'expect($1).toBe(true)'
            $content = $content -replace 'expect\(([^)]+)\)\.to\.be\.false', 'expect($1).toBe(false)'
            
            # Clean up multiple empty lines
            $content = $content -replace '\n\n\n+', "`n`n"
            
            # Remove trailing whitespace
            $content = $content -replace ' +$', ''
            
            # Write to .test.js file
            Set-Content -Path $finalFile -Value $content -NoNewline
            
            # Delete intermediate .js file if different from final
            if ($jsFile -ne $finalFile -and (Test-Path $jsFile)) {
                Remove-Item $jsFile
            }
            
            Write-Host "  ✅ Created $($finalFile -replace '.*\\', '')" -ForegroundColor Green
        }
    }
    catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "✨ Conversion complete!" -ForegroundColor Cyan
