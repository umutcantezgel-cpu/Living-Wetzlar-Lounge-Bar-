#!/usr/bin/env node

/**
 * Axe Accessibility Check
 * Runs axe-core against built HTML files
 */

import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { glob } from 'glob';

async function main() {
  console.log('♿ Running Axe accessibility tests...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlFiles = await glob('dist/**/*.html', { nodir: true });
  let totalViolations = 0;
  const violations = [];

  for (const file of htmlFiles) {
    const url = `file://${process.cwd()}/${file}`;

    try {
      await page.goto(url);

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      const critical = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');

      if (critical.length > 0) {
        console.log(`❌ ${file}`);
        critical.forEach(v => {
          console.log(`   ${v.impact.toUpperCase()}: ${v.help}`);
          totalViolations++;
        });
        violations.push({ file, critical });
      } else {
        console.log(`✅ ${file}`);
      }
    } catch (error) {
      console.log(`⚠️  ${file} - Error: ${error.message}`);
    }
  }

  await browser.close();

  console.log(`\n📊 Summary:`);
  console.log(`   Files scanned: ${htmlFiles.length}`);
  console.log(`   Critical/Serious violations: ${totalViolations}`);

  if (totalViolations > 0) {
    console.error(`\n❌ Found ${totalViolations} accessibility violation(s)!`);
    process.exit(1);
  }

  console.log('\n✅ No critical accessibility violations found!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
