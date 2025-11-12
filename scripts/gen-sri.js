#!/usr/bin/env node

/**
 * SRI (Subresource Integrity) Generator
 * Generates integrity hashes for CSS, JS, and WOFF2 files
 */

import { createHash } from 'crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const DIST_DIR = './dist';
const OUTPUT_FILE = './public/integrity.manifest.json';
const ALGORITHMS = ['sha384'];

function generateSRI(filePath) {
  const content = readFileSync(filePath);
  const hashes = ALGORITHMS.map(algo => {
    const hash = createHash(algo).update(content).digest('base64');
    return `${algo}-${hash}`;
  });
  return hashes.join(' ');
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = readdirSync(dirPath);

  files.forEach(file => {
    const filePath = join(dirPath, file);
    if (statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

function main() {
  console.log('🔒 Generating SRI hashes...');

  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    files: {}
  };

  try {
    const allFiles = getAllFiles(DIST_DIR);
    const assetFiles = allFiles.filter(file =>
      /\.(css|js|woff2)$/.test(file)
    );

    let count = 0;
    assetFiles.forEach(filePath => {
      const integrity = generateSRI(filePath);
      const relativePath = '/' + relative(DIST_DIR, filePath).replace(/\\/g, '/');

      manifest.files[relativePath] = {
        integrity,
        algorithm: ALGORITHMS[0],
        size: statSync(filePath).size
      };

      count++;
      console.log(`  ✓ ${relativePath}`);
    });

    writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
    console.log(`\n✅ Generated SRI hashes for ${count} files`);
    console.log(`📄 Manifest saved to: ${OUTPUT_FILE}`);

    // Calculate coverage
    const coverage = {
      css: Object.keys(manifest.files).filter(f => f.endsWith('.css')).length,
      js: Object.keys(manifest.files).filter(f => f.endsWith('.js')).length,
      woff2: Object.keys(manifest.files).filter(f => f.endsWith('.woff2')).length
    };

    console.log(`\n📊 Coverage:`);
    console.log(`   CSS:   ${coverage.css} files`);
    console.log(`   JS:    ${coverage.js} files`);
    console.log(`   WOFF2: ${coverage.woff2} files`);

  } catch (error) {
    console.error('❌ Error generating SRI hashes:', error);
    process.exit(1);
  }
}

main();
