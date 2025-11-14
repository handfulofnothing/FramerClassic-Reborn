#!/usr/bin/env node
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const testDir = 'test/tests';

// CoffeeScript test files that need conversion
const filesToConvert = [
  'ContextTest.coffee',
  'CurvesTest.coffee',
  'DeviceComponentTest.coffee',
  'EventEmitterTest.coffee',
  'FlowComponentTest.coffee',
  'GradientTest.coffee',
  'ImporterTest.coffee',
  'LayerAnimationTest.coffee',
  'LayerDraggableTest.coffee',
  'LayerEventsTest.coffee',
  'LayerGesturesTest.coffee',
  'LayerStatesBackwardsTest.coffee',
  'LayerStatesTest.coffee',
  'LayerTest.coffee',
  'PageComponentTest.coffee',
  'PreloaderTest.coffee',
  'RangeSliderComponentTest.coffee',
  'ScrollComponentTest.coffee',
  'SliderComponentTest.coffee',
  'SVGLayerTest.coffee',
  'SVGPathTest.coffee',
  'TextLayerTest.coffee',
  'UtilsTest.coffee',
  'VersionTest.coffee',
  'VideoLayerTest.coffee'
];

function convertFile(filename) {
  const coffeeFile = join(testDir, filename);
  const baseName = filename.replace('Test.coffee', '');
  const jsFile = join(testDir, `${baseName}.test.js`);

  console.log(`Converting ${filename}...`);

  try {
    // Use decaffeinate to convert the file
    execSync(`npx decaffeinate --use-js-modules "${coffeeFile}"`, { 
      stdio: 'inherit'
    });

    // The decaffeinate output will be filename.js, rename and fix it
    const decaffeinatedFile = coffeeFile.replace('.coffee', '.js');
    
    if (existsSync(decaffeinatedFile)) {
      let content = readFileSync(decaffeinatedFile, 'utf8');
      
      // Post-process the converted file
      content = postProcessConvertedFile(content);
      
      // Write to the .test.js file
      writeFileSync(jsFile, content);
      
      console.log(`✅ Created ${jsFile}`);
      
      // Clean up the intermediate file
      if (decaffeinatedFile !== jsFile) {
        execSync(`del "${decaffeinatedFile}"`, { stdio: 'inherit' });
      }
    }
  } catch (error) {
    console.error(`❌ Error converting ${filename}:`, error.message);
  }
}

function postProcessConvertedFile(content) {
  // Replace require statements with imports
  content = content.replace(/require\('es6-promise'\)\.polyfill\(\)/g, '');
  content = content.replace(/const assert = require\("assert"\);?/g, '');
  content = content.replace(/const \{expect\} = require\("chai"\);?/g, '');
  
  // Add Vitest imports at the top
  const imports = `import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Framer from '../../framer/Framer.js';

`;
  
  // Remove old imports and add new ones
  content = content.replace(/^(.*\n)*?(describe\()/m, imports + '$2');
  
  // Replace .should.equal with expect().toBe()
  content = content.replace(/(\w+)\.should\.equal\(([^)]+)\)/g, 'expect($1).toBe($2)');
  
  // Replace .should.eql with expect().toEqual()
  content = content.replace(/(\w+)\.should\.eql\(([^)]+)\)/g, 'expect($1).toEqual($2)');
  
  // Replace .should.be.true/false
  content = content.replace(/(\w+)\.should\.be\.true/g, 'expect($1).toBe(true)');
  content = content.replace(/(\w+)\.should\.be\.false/g, 'expect($1).toBe(false)');
  
  // Replace .should.exist
  content = content.replace(/(\w+)\.should\.exist/g, 'expect($1).toBeTruthy()');
  
  // Replace .should.not.exist
  content = content.replace(/(\w+)\.should\.not\.exist/g, 'expect($1).toBeFalsy()');
  
  // Replace .should.be.ok
  content = content.replace(/(\w+)\.should\.be\.ok/g, 'expect($1).toBeTruthy()');
  
  // Replace .should.be.undefined
  content = content.replace(/(\w+)\.should\.be\.undefined/g, 'expect($1).toBeUndefined()');
  
  // Replace .should.be.null
  content = content.replace(/(\w+)\.should\.be\.null/g, 'expect($1).toBeNull()');
  
  // Replace .should.be.instanceOf
  content = content.replace(/(\w+)\.should\.be\.instanceOf\(([^)]+)\)/g, 'expect($1).toBeInstanceOf($2)');
  
  // Replace .should.be.above
  content = content.replace(/(\w+)\.should\.be\.above\(([^)]+)\)/g, 'expect($1).toBeGreaterThan($2)');
  
  // Replace .should.be.below
  content = content.replace(/(\w+)\.should\.be\.below\(([^)]+)\)/g, 'expect($1).toBeLessThan($2)');
  
  // Replace .should.be.closeTo
  content = content.replace(/(\w+)\.should\.be\.closeTo\(([^,]+),\s*([^)]+)\)/g, 'expect($1).toBeCloseTo($2, $3)');
  
  // Replace .should.have.length
  content = content.replace(/(\w+)\.should\.have\.length\(([^)]+)\)/g, 'expect($1).toHaveLength($2)');
  
  // Replace .should.contain
  content = content.replace(/(\w+)\.should\.contain\(([^)]+)\)/g, 'expect($1).toContain($2)');
  
  // Replace .should.include
  content = content.replace(/(\w+)\.should\.include\(([^)]+)\)/g, 'expect($1).toContain($2)');
  
  // Replace expect(x).to.equal with expect(x).toBe
  content = content.replace(/expect\(([^)]+)\)\.to\.equal\(([^)]+)\)/g, 'expect($1).toBe($2)');
  
  // Replace expect(x).to.eql with expect(x).toEqual
  content = content.replace(/expect\(([^)]+)\)\.to\.eql\(([^)]+)\)/g, 'expect($1).toEqual($2)');
  
  // Clean up empty lines
  content = content.replace(/\n\n\n+/g, '\n\n');
  
  return content;
}

console.log('Starting test file conversion...\n');

for (const file of filesToConvert) {
  convertFile(file);
}

console.log('\n✨ Conversion complete!');
