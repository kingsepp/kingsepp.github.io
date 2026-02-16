/**
 * Cross-Browser Functionality Tests
 * Updated for terminal design structure
 */

import { test, expect } from '@playwright/test';

async function acceptCookiesIfPresent(page) {
  const banner = page.locator('#cookie-notice');
  if (await banner.isVisible().catch(() => false)) {
    await page.locator('#cookie-notice-accept').click();
    await expect(banner).toBeHidden();
  }
}

test.describe('Cross-Browser Core Functionality', () => {
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
    await acceptCookiesIfPresent(page);
  });

  test('homepage loads correctly across browsers', async ({ page, browserName }) => {
    console.log(`Testing homepage on ${browserName}`);

    await expect(page).toHaveTitle(/kingsepp\.dev/i);
    await expect(page.getByRole('main')).toBeAttached();

    // Either content or turnstile protection
    await expect(page.locator('#main-content').or(page.locator('#main-turnstile-protection'))).toBeVisible();

    if (await page.locator('#main-content').isVisible()) {
      await expect(page.getByRole('navigation')).toBeVisible();
      // Terminal hero uses divs; ensure project list exists
      await expect(page.getByRole('main')).toContainText('Meine Projekte');
      await expect(page.getByRole('main')).toContainText('ai4mbse');
    } else {
      await expect(page.getByText('Verifizierung erforderlich')).toBeVisible();
    }
  });

  test('navigation works across browsers', async ({ page, browserName }) => {
    console.log(`Testing navigation on ${browserName}`);

    // Navigation always visible (header include)
    await expect(page.getByRole('navigation')).toBeVisible();

    await page.getByRole('link', { name: /projects/i }).click();
    await expect(page).toHaveURL(/\/projects/);

    await page.getByRole('link', { name: /about/i }).click();
    await expect(page).toHaveURL(/\/about/);

    await page.getByRole('link', { name: /home/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test('cookie consent banner works across browsers', async ({ page, browserName }) => {
    console.log(`Testing cookie consent on ${browserName}`);

    await page.context().clearCookies();
    await page.reload();

    const banner = page.locator('#cookie-notice');
    await expect(banner).toBeVisible();

    await expect(page.locator('#cookie-notice-accept')).toBeVisible();
    await expect(page.locator('#cookie-notice-essential')).toBeVisible();
    await expect(page.locator('#cookie-notice-reject')).toBeVisible();
    await expect(page.locator('#cookie-settings-btn')).toBeVisible();

    await page.locator('#cookie-notice-accept').click();
    await expect(banner).toBeHidden();

    await expect(page.getByText('Cookie-Einstellungen ändern')).toBeVisible();
  });

  test('cookie settings modal works across browsers', async ({ page, browserName }) => {
    console.log(`Testing cookie settings modal on ${browserName}`);

    await page.context().clearCookies();
    await page.reload();

    await expect(page.locator('#cookie-notice')).toBeVisible();
    await page.locator('#cookie-settings-btn').click();

    const modal = page.locator('#cookie-settings-modal');
    await expect(modal).toBeVisible();

    await expect(page.locator('#analytics-consent')).toBeVisible();
    await expect(page.locator('#save-settings')).toBeVisible();
    await expect(page.locator('#close-settings')).toBeVisible();

    await page.locator('#close-settings').click();
    await expect(modal).toBeHidden();
  });

  test('theme toggle works across browsers', async ({ page, browserName }) => {
    console.log(`Testing theme toggle on ${browserName}`);

    // Theme toggle exists in cookie include only after consent UI shows revoke (our implementation)
    await page.context().clearCookies();
    await page.reload();

    await page.locator('#cookie-notice-accept').click();

    // If theme toggle exists, it should be clickable
    const toggle = page.locator('.theme-toggle-cookie');
    if (await toggle.count()) {
      await expect(toggle).toBeVisible();
      const body = page.locator('body');
      const initialTheme = await body.getAttribute('data-theme');
      await toggle.click();
      if (initialTheme === 'light') {
        await expect(body).not.toHaveAttribute('data-theme', 'light');
      } else {
        await expect(body).toHaveAttribute('data-theme', 'light');
      }
    } else {
      test.skip(true, 'Theme toggle not present in terminal design cookie UI');
    }
  });

  test('responsive design works across device sizes', async ({ page, browserName }) => {
    console.log(`Testing responsive design on ${browserName}`);

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('navigation')).toBeVisible();

    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('external links and assets load correctly', async ({ page, browserName }) => {
    console.log(`Testing external resources on ${browserName}`);

    await expect(page.locator('link[rel="stylesheet"]')).toHaveCount(1);
    await expect(page.locator('script[src*="main.js"]')).toHaveCount(1);
  });
});
