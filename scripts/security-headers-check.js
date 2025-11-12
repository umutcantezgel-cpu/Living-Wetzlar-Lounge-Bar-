#!/usr/bin/env node

/**
 * Security Headers Check
 * Validates security headers configuration
 */

import { readFileSync, existsSync } from 'fs';

const REQUIRED_HEADERS = {
  'Strict-Transport-Security': /max-age=\d+/,
  'Content-Security-Policy': /default-src/,
  'X-Frame-Options': /(DENY|SAMEORIGIN)/,
  'X-Content-Type-Options': /nosniff/,
  'Referrer-Policy': /strict-origin/,
  'Permissions-Policy': /.*/,
  'Cross-Origin-Opener-Policy': /same-origin/,
  'Cross-Origin-Embedder-Policy': /require-corp/,
  'Cross-Origin-Resource-Policy': /same-origin/
};

function main() {
  console.log('🔒 Checking security headers configuration...\n');

  const headerFiles = [
    'public/_headers',
    'docs/deployment/nginx-headers.conf'
  ];

  let allPassed = true;

  for (const file of headerFiles) {
    if (!existsSync(file)) {
      console.log(`⚠️  ${file} - File not found`);
      continue;
    }

    console.log(`\nChecking: ${file}`);
    const content = readFileSync(file, 'utf-8');

    for (const [header, pattern] of Object.entries(REQUIRED_HEADERS)) {
      const hasHeader = content.includes(header) && pattern.test(content);

      if (hasHeader) {
        console.log(`  ✅ ${header}`);
      } else {
        console.log(`  ❌ ${header} - Missing or invalid`);
        allPassed = false;
      }
    }

    // Check for unsafe CSP directives
    if (content.includes("'unsafe-inline'") || content.includes("'unsafe-eval'")) {
      console.log(`  ❌ CSP contains unsafe-inline or unsafe-eval`);
      allPassed = false;
    } else {
      console.log(`  ✅ CSP strict (no unsafe-*)`);
    }
  }

  console.log('\n' + '='.repeat(50));

  if (!allPassed) {
    console.error('\n❌ Security headers check failed!');
    console.error('Fix the issues above before deploying.');
    process.exit(1);
  }

  console.log('\n✅ All security headers are properly configured!');
}

main();
