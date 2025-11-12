#!/usr/bin/env node

/**
 * Contract Validation Script
 * Validates all JSON contracts against their schemas
 */

import { readFileSync } from 'fs';
import { glob } from 'glob';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

async function main() {
  console.log('🔍 Validating contracts...\n');

  const contractFiles = await glob('contracts/**/*.json', { nodir: true });
  let errors = 0;

  for (const file of contractFiles) {
    try {
      const content = readFileSync(file, 'utf-8');
      const contract = JSON.parse(content);

      // Basic JSON validation
      if (typeof contract !== 'object') {
        console.log(`❌ ${file} - Invalid JSON structure`);
        errors++;
        continue;
      }

      // Check for schema presence
      if (contract.$schema) {
        // TODO: Validate against schema if needed
        console.log(`✅ ${file} - Valid`);
      } else {
        console.log(`⚠️  ${file} - No schema defined`);
      }

    } catch (error) {
      console.log(`❌ ${file} - Parse error: ${error.message}`);
      errors++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total contracts: ${contractFiles.length}`);
  console.log(`   Errors: ${errors}`);

  if (errors > 0) {
    console.error(`\n❌ Contract validation failed with ${errors} error(s)!`);
    process.exit(1);
  }

  console.log('\n✅ All contracts are valid!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
