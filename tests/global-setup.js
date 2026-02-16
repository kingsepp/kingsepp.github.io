/**
 * Global Setup for Playwright Tests
 * Replaces Cloudflare Turnstile sitekeys with test keys for automated testing
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

function replaceInHtmlFile(filePath, productionKey, testKey) {
  const content = readFileSync(filePath, 'utf8');
  const updated = content.replace(new RegExp(productionKey, 'g'), testKey);
  if (updated !== content) {
    writeFileSync(filePath, updated);
    return true;
  }
  return false;
}

function walkHtmlFiles(dir) {
  const entries = require('fs').readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

export default async function globalSetup() {
  console.log('🔧 Setting up Playwright tests - replacing Turnstile sitekeys with test keys');

  // Cloudflare Turnstile test sitekey (always passes)
  const TEST_SITEKEY = '1x00000000000000000000AA';
  const PRODUCTION_SITEKEY = '0x4AAAAAABhCvPtIE3gog0lZ';

  try {
    const siteDir = join(process.cwd(), '_site');
    const htmlFiles = walkHtmlFiles(siteDir);

    let replacedCount = 0;
    for (const filePath of htmlFiles) {
      const replaced = replaceInHtmlFile(filePath, PRODUCTION_SITEKEY, TEST_SITEKEY);
      if (replaced) replacedCount++;
    }

    console.log(`✅ Replaced Turnstile sitekeys in ${replacedCount} HTML file(s) under _site`);
    console.log(`   Production key: ${PRODUCTION_SITEKEY}`);
    console.log(`   Test key: ${TEST_SITEKEY}`);
  } catch (error) {
    console.log('⚠️ Warning: Could not replace Turnstile sitekeys in _site files');
    console.log('   This is normal if Jekyll site is not built yet');
    console.log(`   Error: ${error.message}`);
  }

  console.log('📝 Test setup complete - Turnstile will use test sitekey for automated verification');
}
