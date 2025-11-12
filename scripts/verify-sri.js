#!/usr/bin/env node

/**
 * SRI Verification Script
 * Verifies that all CSS, JS, and WOFF2 files have SRI hashes
 */

import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';

const MANIFEST_PATH = './public/integrity.manifest.json';
const DIST_DIR = './dist';

async function main() {
  console.log('🔍 Verifying SRI coverage...\n');

  if (!existsSync(MANIFEST_PATH)) {
    console.error('❌ Integrity manifest not found. Run npm run sri:gen first.');
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'));
  const assetFiles = await glob(`${DIST_DIR}/**/*.{css,js,woff2}`, { nodir: true });

  let missing = 0;
  const results = {
    total: assetFiles.length,
    covered: 0,
    missing: []
  };

  assetFiles.forEach(file => {
    const relativePath = '/' + file.replace(DIST_DIR + '/', '').replace(/\\/g, '/');

    if (manifest.files[relativePath]) {
      results.covered++;
      console.log(`  ✓ ${relativePath}`);
    } else {
      results.missing.push(relativePath);
      missing++;
      console.log(`  ✗ ${relativePath} - MISSING`);
    }
  });

  console.log(`\n📊 Results:`);
  console.log(`   Total files:   ${results.total}`);
  console.log(`   Covered:       ${results.covered}`);
  console.log(`   Missing:       ${results.missing.length}`);
  console.log(`   Coverage:      ${((results.covered / results.total) * 100).toFixed(2)}%`);

  if (results.missing.length > 0) {
    console.error(`\n❌ SRI verification failed. ${results.missing.length} files missing integrity hashes.`);
    console.error('\nMissing files:');
    results.missing.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  }

  console.log('\n✅ All files have SRI hashes!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
