/**
 * Browser Compatibility Tests
 * Updated for terminal design
 */

import { test, expect } from '@playwright/test';

test.describe('Browser Compatibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');

    // Replace Turnstile sitekeys with test keys for automated testing
    await page.evaluate(() => {
      const TEST_SITEKEY = '1x00000000000000000000AA';
      const PRODUCTION_SITEKEY = '0x4AAAAAABhCvPtIE3gog0lZ';
      document.querySelectorAll('.cf-turnstile').forEach(element => {
        if (element.getAttribute('data-sitekey') === PRODUCTION_SITEKEY) {
          element.setAttribute('data-sitekey', TEST_SITEKEY);
        }
      });
    });

    await page.waitForLoadState('networkidle');

    // Accept cookies using ID-based selector (terminal cookie banner uses buttons)
    await expect(page.locator('#cookie-notice')).toBeVisible();
    await page.locator('#cookie-notice-accept').click();
    await expect(page.locator('#cookie-notice')).toBeHidden();

    // Either content or turnstile protection
    await expect(page.locator('#main-content').or(page.locator('#main-turnstile-protection'))).toBeVisible();
  });

  test('CSS Custom Properties (Variables) support', async ({ page, browserName }) => {
    console.log(`Testing CSS Variables on ${browserName}`);

    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);

    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(backgroundColor).not.toBe('transparent');
  });

  test('Local Storage functionality', async ({ page, browserName }) => {
    console.log(`Testing localStorage on ${browserName}`);

    // Theme is stored by terminal theme toggle; if not present, just validate localStorage works.
    await page.evaluate(() => localStorage.setItem('playwright-test', 'ok'));
    const value = await page.evaluate(() => localStorage.getItem('playwright-test'));
    expect(value).toBe('ok');
  });

  test('Cookie functionality across browsers', async ({ page, browserName }) => {
    console.log(`Testing cookies on ${browserName}`);

    const cookies = await page.context().cookies();
    const consentCookie = cookies.find(c => c.name === 'cookie-notice-dismissed');

    expect(consentCookie).toBeTruthy();
    expect(consentCookie.value).toBe('accept');
  });
});
