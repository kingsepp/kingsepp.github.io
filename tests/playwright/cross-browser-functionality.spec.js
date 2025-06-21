/**
 * Cross-Browser Functionality Tests
 * Tests core website functionality across different browsers and devices
 * Following Playwright best practices with semantic selectors and web-first assertions
 */

import { test, expect } from '@playwright/test';

test.describe('Cross-Browser Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Ensure test isolation - clear all state
    await page.context().clearCookies();
    await page.goto('/');

    // Setup Turnstile test environment
    await page.evaluate(() => {
      const TEST_SITEKEY = '1x00000000000000000000AA'; // Always passes
      const PRODUCTION_SITEKEY = '0x4AAAAAABhCvPtIE3gog0lZ';

      // Replace Turnstile sitekeys with test keys
      document.querySelectorAll('.cf-turnstile').forEach(element => {
        if (element.getAttribute('data-sitekey') === PRODUCTION_SITEKEY) {
          element.setAttribute('data-sitekey', TEST_SITEKEY);
        }
      });
    });

    // Wait for page to load and check for cookie banner
    await page.waitForLoadState('networkidle');

    // Try to accept cookies if banner appears
    try {
      await page.waitForSelector('#cookie-notice', { state: 'visible', timeout: 5000 });
      await page.locator('#cookie-notice-accept').click();
      await page.waitForSelector('#cookie-notice', { state: 'hidden', timeout: 5000 });
    } catch {
      // Cookie banner might not be visible or already accepted
      console.log('Cookie banner not found or already handled');
    }
  });

  test('homepage loads correctly across browsers', async ({ page, browserName }) => {
    console.log(`Testing homepage on ${browserName}`);

    // Check page title - user-facing element
    await expect(page).toHaveTitle(/Kingsepp.*Cloud Consulting/);

    // Test that page content loads - using semantic selectors where possible
    await expect(page.getByRole('main')).toBeAttached();

    // Check for either main content or Turnstile protection using auto-waiting assertions
    const mainContentExists = await page.locator('#main-content').isVisible();
    const turnstileExists = await page.locator('#main-turnstile-protection').isVisible();

    if (mainContentExists) {
      // Test main page functionality using semantic selectors
      await expect(page.getByRole('navigation')).toBeVisible();

      // Check for main heading using text content (user-facing)
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Cloud Consulting');

      // Verify key sections exist using landmarks
      await expect(page.getByRole('main')).toContainText('Über mich');
      await expect(page.getByRole('main')).toContainText('Kernkompetenzen');
      await expect(page.getByRole('main')).toContainText('Kontakt');
    } else if (turnstileExists) {
      // Test Turnstile protection using user-facing text
      await expect(page.getByText('Verifizierung erforderlich')).toBeVisible();
      await expect(page.getByText('Bestätigen Sie, dass Sie ein Mensch sind')).toBeVisible();
    } else {
      throw new Error(
        'Page failed to load - neither main content nor Turnstile protection visible'
      );
    }
  });

  test('navigation works across browsers', async ({ page, browserName }) => {
    console.log(`Testing navigation on ${browserName}`);

    // Skip navigation test if main content is not visible
    const mainContentVisible = await page.locator('#main-content').isVisible();
    if (!mainContentVisible) {
      console.log('⏭️ Skipping navigation test - main content protected by Turnstile');
      return;
    }

    // Test navigation using accessible text (user-facing)
    await page.getByRole('link', { name: 'Über mich' }).click();
    await expect(page.getByRole('heading', { name: /Über mich/i })).toBeInViewport();

    await page.getByRole('link', { name: 'Kernkompetenzen' }).click();
    await expect(page.getByRole('heading', { name: /Kernkompetenzen/i })).toBeInViewport();

    await page.getByRole('link', { name: 'Kontakt' }).click();
    await expect(page.getByRole('heading', { name: /Kontakt/i })).toBeInViewport();
  });

  test('cookie consent banner works across browsers', async ({ page, browserName }) => {
    console.log(`Testing cookie consent on ${browserName}`);

    // Reset cookies to test banner again
    await page.context().clearCookies();
    await page.reload();

    // Test cookie banner using user-facing text
    await expect(page.getByText('Cookie-Einstellungen')).toBeVisible();

    // Test buttons using accessible text
    await expect(page.getByRole('link', { name: /Alle akzeptieren/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Nur notwendige/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Alle ablehnen/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Cookie-Einstellungen/i })).toBeVisible();

    // Test accept functionality
    await page.getByRole('link', { name: /Alle akzeptieren/i }).click();
    await expect(page.getByText('Cookie-Einstellungen')).toBeHidden();

    // Check that settings change button appears
    await expect(page.getByText('Cookie-Einstellungen ändern')).toBeVisible();
  });

  test('cookie settings modal works across browsers', async ({ page, browserName }) => {
    console.log(`Testing cookie settings modal on ${browserName}`);

    // Use web-first assertions instead of waitForSelector
    await expect(page.locator('#cookie-notice')).toBeVisible();
    await page.getByRole('link', { name: /Cookie-Einstellungen/i }).click();

    // Check modal appears using semantic selectors
    const modal = page.locator('#cookie-settings-modal');
    await expect(modal).toBeVisible();

    // Check modal content using semantic selectors where possible
    await expect(page.getByRole('checkbox', { name: /Analytics/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Einstellungen speichern/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Schließen/i })).toBeVisible();

    // Test close button with semantic selector
    await page.getByRole('button', { name: /Schließen/i }).click();
    await expect(modal).toBeHidden();
  });

  test('theme toggle works across browsers', async ({ page, browserName }) => {
    console.log(`Testing theme toggle on ${browserName}`);

    // First accept cookies to see theme toggle
    await expect(page.locator('#cookie-notice')).toBeVisible();
    await page.getByRole('link', { name: /Alle akzeptieren/i }).click();

    // Wait for theme toggle to appear using web-first assertion
    const themeToggle = page
      .getByRole('button', { name: /theme/i })
      .or(page.locator('.theme-toggle-cookie'));
    await expect(themeToggle).toBeVisible();

    // Check initial state (should be dark mode)
    const body = page.locator('body');
    const initialTheme = await body.getAttribute('data-theme');

    // Click theme toggle
    await themeToggle.click();

    // Use web-first assertion to check theme changed
    if (initialTheme === 'light') {
      await expect(body).not.toHaveAttribute('data-theme', 'light');
    } else {
      await expect(body).toHaveAttribute('data-theme', 'light');
    }

    // Check icon changed using semantic content
    const themeIcon = page.locator('.theme-icon-cookie');
    const iconText = await themeIcon.textContent();
    expect(['☀️', '🌙']).toContain(iconText);
  });

  test('contact form validation works across browsers', async ({ page, browserName }) => {
    console.log(`Testing contact form on ${browserName}`);

    // Navigate to contact section using semantic selector
    await page.getByRole('link', { name: /Kontakt/i }).click();

    // Wait for contact section to be in viewport
    await expect(page.getByRole('heading', { name: /Kontakt/i })).toBeInViewport();

    // Check form fields using semantic selectors
    const nameField = page.getByRole('textbox', { name: /name/i }).or(page.locator('#name'));
    const emailField = page.getByRole('textbox', { name: /email/i }).or(page.locator('#email'));
    const messageField = page
      .getByRole('textbox', { name: /nachricht|message/i })
      .or(page.locator('#message'));
    const submitButton = page
      .getByRole('button', { name: /senden|submit/i })
      .or(page.locator('.submit-button'));

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(messageField).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Check HTML5 validation attributes
    await expect(nameField).toHaveAttribute('required');
    await expect(emailField).toHaveAttribute('required');
    await expect(messageField).toHaveAttribute('required');
    await expect(emailField).toHaveAttribute('type', 'email');
  });

  test('responsive design works across device sizes', async ({ page, browserName }) => {
    console.log(`Testing responsive design on ${browserName}`);

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE

    // Check mobile navigation using semantic selectors
    const hamburger = page
      .getByRole('button', { name: /menu|navigation/i })
      .or(page.locator('.hamburger'));
    if (await hamburger.isVisible()) {
      await hamburger.click();
      const mobileNav = page.getByRole('navigation').locator('.nav-links-mobile');
      await expect(mobileNav).toBeVisible();
    }

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    // Check hero section using semantic selector
    const heroTitle = page.getByRole('heading', { level: 1 }).or(page.locator('.hero-title'));
    await expect(heroTitle).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });

    // Check desktop navigation using semantic selector
    const desktopNav = page.getByRole('navigation').locator('.nav-links');
    await expect(desktopNav).toBeVisible();
  });

  test('external links and assets load correctly', async ({ page, browserName }) => {
    console.log(`Testing external resources on ${browserName}`);

    // Check that CSS loads using web-first assertions
    await expect(page.locator('link[rel="stylesheet"]')).toHaveCount({ min: 1 });

    // Check that main script loads
    await expect(page.locator('script[src*="main.js"]')).toHaveCount({ min: 1 });

    // Check Google Fonts load (if accepted cookies)
    await expect(page.locator('#cookie-notice')).toBeVisible();
    await page.getByRole('link', { name: /Alle akzeptieren/i }).click();

    // Wait for font loading using web-first assertion
    await expect(page.locator('body')).toHaveCSS('font-family', /Inter/);
  });
});
