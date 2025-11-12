#!/usr/bin/env node

/**
 * No-Inline Scanner
 * Scans HTML files for inline scripts and styles (CSP violation)
 */

import { readFileSync } from 'fs';
import { glob } from 'glob';

const DIST_DIR = './dist';

async function main() {
  console.log('🔍 Scanning for inline scripts and styles...\n');

  const htmlFiles = await glob(`${DIST_DIR}/**/*.html`, { nodir: true });
  let totalViolations = 0;
  const violations = [];

  for (const file of htmlFiles) {
    const content = readFileSync(file, 'utf-8');
    const fileViolations = [];

    // Check for inline scripts
    const inlineScriptMatches = content.match(/<script(?![^>]*\ssrc=)[^>]*>/g) || [];
    const inlineScripts = inlineScriptMatches.filter(match =>
      !match.includes('type="application/ld+json"') &&
      !match.includes('type="module"')
    );

    // Check for inline styles
    const inlineStyles = content.match(/<style[^>]*>/g) || [];

    // Check for style attributes
    const styleAttrs = content.match(/\sstyle=/g) || [];

    // Check for event handlers
    const eventHandlers = content.match(/\son\w+=/g) || [];

    if (inlineScripts.length > 0) {
      fileViolations.push(`  ✗ ${inlineScripts.length} inline <script> tag(s)`);
    }

    if (inlineStyles.length > 0) {
      fileViolations.push(`  ✗ ${inlineStyles.length} inline <style> tag(s)`);
    }

    if (styleAttrs.length > 0) {
      fileViolations.push(`  ✗ ${styleAttrs.length} style attribute(s)`);
    }

    if (eventHandlers.length > 0) {
      fileViolations.push(`  ✗ ${eventHandlers.length} inline event handler(s)`);
    }

    if (fileViolations.length > 0) {
      const relativePath = file.replace(DIST_DIR + '/', '');
      violations.push({ file: relativePath, issues: fileViolations });
      totalViolations += fileViolations.length;

      console.log(`❌ ${relativePath}`);
      fileViolations.forEach(v => console.log(v));
      console.log('');
    } else {
      const relativePath = file.replace(DIST_DIR + '/', '');
      console.log(`✅ ${relativePath}`);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Files scanned: ${htmlFiles.length}`);
  console.log(`   Files with violations: ${violations.length}`);
  console.log(`   Total violations: ${totalViolations}`);

  if (totalViolations > 0) {
    console.error(`\n❌ Found ${totalViolations} CSP violations!`);
    console.error('\nTo fix: Remove all inline scripts, styles, and event handlers.');
    console.error('Use external files and addEventListener() instead.');
    process.exit(1);
  }

  console.log('\n✅ No inline scripts or styles detected!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
