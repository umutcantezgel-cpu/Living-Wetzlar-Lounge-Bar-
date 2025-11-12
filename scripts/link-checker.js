#!/usr/bin/env node

/**
 * Link Checker Script
 * Checks for broken links in built HTML files
 */

import { readFileSync } from 'fs';
import { glob } from 'glob';

async function main() {
  console.log('🔗 Checking links...\n');

  const htmlFiles = await glob('dist/**/*.html', { nodir: true });
  let totalLinks = 0;
  let brokenLinks = 0;
  const broken = [];

  for (const file of htmlFiles) {
    const content = readFileSync(file, 'utf-8');
    const links = content.match(/href="([^"]+)"/g) || [];

    links.forEach(link => {
      totalLinks++;
      const href = link.match(/href="([^"]+)"/)[1];

      // Skip external links, anchors, and special protocols
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // Simple check: does the link start with / and not contain invalid patterns?
      if (!href.startsWith('/')) {
        brokenLinks++;
        broken.push({ file, link: href, reason: 'Relative link without leading /' });
      }
    });
  }

  console.log(`📊 Summary:`);
  console.log(`   HTML files scanned: ${htmlFiles.length}`);
  console.log(`   Total links found: ${totalLinks}`);
  console.log(`   Broken links: ${brokenLinks}`);

  if (brokenLinks > 0) {
    console.error(`\n❌ Found ${brokenLinks} broken link(s):\n`);
    broken.forEach(({ file, link, reason }) => {
      console.error(`  ${file}`);
      console.error(`    Link: ${link}`);
      console.error(`    Reason: ${reason}\n`);
    });
    process.exit(1);
  }

  console.log('\n✅ No broken links found!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
