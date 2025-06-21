/**
 * Global Setup for Playwright Tests
 * Replaces Cloudflare Turnstile sitekeys with test keys for automated testing
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default async function globalSetup() {
  console.log('🔧 Setting up Playwright tests - replacing Turnstile sitekeys with test keys');

  // Cloudflare Turnstile test sitekey (always passes)
  const TEST_SITEKEY = '1x00000000000000000000AA';
  const PRODUCTION_SITEKEY = '0x4AAAAAABhCvPtIE3gog0lZ';

  try {
    // Read the Jekyll site files and replace sitekeys
    const siteDir = join(process.cwd(), '_site');
    const indexPath = join(siteDir, 'index.html');

    if (readFileSync(indexPath, 'utf8')) {
      const content = readFileSync(indexPath, 'utf8');

      // Replace all production sitekeys with test sitekey
      const updatedContent = content.replace(new RegExp(PRODUCTION_SITEKEY, 'g'), TEST_SITEKEY);

      // Write back the modified content
      writeFileSync(indexPath, updatedContent);

      console.log(`✅ Replaced Turnstile sitekeys in ${indexPath}`);
      console.log(`   Production key: ${PRODUCTION_SITEKEY}`);
      console.log(`   Test key: ${TEST_SITEKEY}`);
    }
  } catch (error) {
    console.log('⚠️ Warning: Could not replace Turnstile sitekeys in _site files');
    console.log('   This is normal if Jekyll site is not built yet');
    console.log(`   Error: ${error.message}`);
  }

  // Alternative: Intercept network requests to replace sitekeys dynamically
  console.log(
    '📝 Test setup complete - Turnstile will use test sitekey for automated verification'
  );
}
