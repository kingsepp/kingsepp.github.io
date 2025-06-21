/**
 * Browser Compatibility Tests
 * Tests for specific browser features and compatibility issues
 */

import { test, expect } from '@playwright/test';

test.describe('Browser Compatibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/');

    // Replace Turnstile sitekeys with test keys for automated testing
    await page.evaluate(() => {
      const TEST_SITEKEY = '1x00000000000000000000AA'; // Always passes
      const PRODUCTION_SITEKEY = '0x4AAAAAABhCvPtIE3gog0lZ';

      // Replace all Turnstile sitekeys with test key
      const turnstileElements = document.querySelectorAll('.cf-turnstile');
      turnstileElements.forEach(element => {
        if (element.getAttribute('data-sitekey') === PRODUCTION_SITEKEY) {
          element.setAttribute('data-sitekey', TEST_SITEKEY);
          console.log('🔧 Replaced Turnstile sitekey with test key');
        }
      });
    });

    // Accept cookies to unlock main content using semantic selector
    await expect(page.locator('#cookie-notice')).toBeVisible();
    await page.getByRole('link', { name: /Alle akzeptieren/i }).click();

    // Wait for Turnstile verification with web-first assertion
    await expect(
      page.locator('#main-content').or(page.locator('#main-turnstile-protection'))
    ).toBeVisible();

    // Check if main content is accessible for compatibility testing
    const isMainContentVisible = await page.locator('#main-content').isVisible();
    const isTurnstileVisible = await page.locator('#main-turnstile-protection').isVisible();

    console.log(
      `Browser compatibility setup - Main content: ${isMainContentVisible}, Turnstile: ${isTurnstileVisible}`
    );

    // Store the state for tests to check
    await page.evaluate(
      ({ mainVisible, turnstileVisible }) => {
        window.testState = { mainContentVisible: mainVisible, turnstileVisible: turnstileVisible };
      },
      { mainVisible: isMainContentVisible, turnstileVisible: isTurnstileVisible }
    );
  });

  test('CSS Grid and Flexbox compatibility', async ({ page, browserName }) => {
    console.log(`Testing CSS Grid/Flexbox on ${browserName}`);

    const testState = await page.evaluate(() => window.testState);

    if (!testState?.mainContentVisible) {
      console.log('⏭️ Skipping CSS Grid/Flexbox test - main content not accessible');
      return;
    }

    // Check services grid layout
    const servicesGrid = page.locator('.services-grid');
    await expect(servicesGrid).toBeVisible();

    // Verify grid is working
    const gridDisplay = await servicesGrid.evaluate(el => window.getComputedStyle(el).display);
    expect(gridDisplay).toBe('grid');

    // Check nav flexbox
    const navContainer = page.locator('.nav-container');
    const flexDisplay = await navContainer.evaluate(el => window.getComputedStyle(el).display);
    expect(flexDisplay).toBe('flex');
  });

  test('CSS Custom Properties (Variables) support', async ({ page, browserName }) => {
    console.log(`Testing CSS Variables on ${browserName}`);

    // Check if CSS variables are applied
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);

    // Should not be the default browser background
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(backgroundColor).not.toBe('transparent');

    // Test theme switching with CSS variables
    await page.waitForSelector('#cookie-notice');
    await page.click('#cookie-notice-accept');

    const themeToggle = page.locator('.theme-toggle-cookie');
    await themeToggle.click();

    // Background should change when theme switches
    const newBackgroundColor = await body.evaluate(
      el => window.getComputedStyle(el).backgroundColor
    );

    // Colors should be different - most browsers support CSS vars now
    expect(newBackgroundColor).not.toBe(backgroundColor);
  });

  test('Local Storage functionality', async ({ page, browserName }) => {
    console.log(`Testing localStorage on ${browserName}`);

    // Accept cookies and toggle theme
    await page.waitForSelector('#cookie-notice');
    await page.click('#cookie-notice-accept');

    const themeToggle = page.locator('.theme-toggle-cookie');
    await themeToggle.click();

    // Check localStorage was set
    const themeValue = await page.evaluate(() => localStorage.getItem('theme'));

    expect(['light', 'dark']).toContain(themeValue);

    // Reload page and check persistence
    await page.reload();

    const persistedTheme = await page.evaluate(() => localStorage.getItem('theme'));

    expect(persistedTheme).toBe(themeValue);
  });

  test('Cookie functionality across browsers', async ({ page, browserName }) => {
    console.log(`Testing cookies on ${browserName}`);

    // Accept cookies
    await page.waitForSelector('#cookie-notice');
    await page.click('#cookie-notice-accept');

    // Check cookie was set
    const cookies = await page.context().cookies();
    const consentCookie = cookies.find(c => c.name === 'cookie-notice-dismissed');

    expect(consentCookie).toBeTruthy();
    expect(consentCookie.value).toBe('accept');

    // Reload and check cookie persists
    await page.reload();

    const newCookies = await page.context().cookies();
    const persistedCookie = newCookies.find(c => c.name === 'cookie-notice-dismissed');

    expect(persistedCookie).toBeTruthy();
    expect(persistedCookie.value).toBe('accept');
  });

  test('Smooth scrolling behavior', async ({ page, browserName }) => {
    console.log(`Testing smooth scrolling on ${browserName}`);

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.pageYOffset);

    // Click navigation link using semantic selector
    await page.getByRole('link', { name: /Über mich/i }).click();

    // Use web-first assertion instead of manual timeout
    const aboutSection = page.getByRole('heading', { name: /Über mich/i });
    await expect(aboutSection).toBeInViewport();

    // Check we scrolled
    const finalScroll = await page.evaluate(() => window.pageYOffset);
    expect(finalScroll).toBeGreaterThan(initialScroll);
  });

  test('Form validation and input types', async ({ page, browserName }) => {
    console.log(`Testing form features on ${browserName}`);

    // Navigate to contact form using semantic selector
    await page.getByRole('link', { name: /Kontakt/i }).click();

    // Wait for contact section to be in viewport
    await expect(page.getByRole('heading', { name: /Kontakt/i })).toBeInViewport();

    // Test email input type using semantic selector
    const emailField = page.getByRole('textbox', { name: /email/i }).or(page.locator('#email'));
    await emailField.fill('invalid-email');

    // Try to submit form using semantic selector
    await page.getByRole('button', { name: /senden|submit/i }).click();

    // Browser should show validation message for invalid email
    const isValid = await emailField.evaluate(el => el.validity.valid);
    expect(isValid).toBe(false);

    // Test with valid email
    await emailField.fill('test@example.com');
    const isValidNow = await emailField.evaluate(el => el.validity.valid);
    expect(isValidNow).toBe(true);
  });

  test('Backdrop filter support', async ({ page, browserName }) => {
    console.log(`Testing backdrop-filter on ${browserName}`);

    // Accept cookies to show revoke button with backdrop filter
    await page.waitForSelector('#cookie-notice');
    await page.click('#cookie-notice-accept');

    // Check cookie revoke button styling
    const revokeButton = page.locator('#cookie-revoke');
    await expect(revokeButton).toBeVisible();

    // Get computed style (backdrop-filter might not be supported everywhere)
    const backdropFilter = await revokeButton
      .locator('div')
      .first()
      .evaluate(
        el =>
          window.getComputedStyle(el).backdropFilter ||
          window.getComputedStyle(el).webkitBackdropFilter
      );

    // Should have backdrop filter or fallback gracefully
    if (browserName === 'webkit' || browserName === 'chromium') {
      expect(backdropFilter).toContain('blur');
    }
    // Firefox might not support it, but should still be functional
  });

  test('Intersection Observer API support', async ({ page, browserName }) => {
    console.log(`Testing Intersection Observer on ${browserName}`);

    // Check if Intersection Observer is available
    const hasIntersectionObserver = await page.evaluate(() => 'IntersectionObserver' in window);

    if (hasIntersectionObserver) {
      // Scroll to trigger animations
      await page.click('a[href="#services"]');
      await page.waitForTimeout(2000);

      // Check if service cards have animation styles applied
      const serviceCard = page.locator('.service-card').first();
      const opacity = await serviceCard.evaluate(el => window.getComputedStyle(el).opacity);

      // Cards should be visible (opacity = 1) after intersection
      expect(parseFloat(opacity)).toBeGreaterThan(0.5);
    } else {
      console.log(`IntersectionObserver not supported in ${browserName}`);
      // Fallback behavior should still work
      const serviceCard = page.locator('.service-card').first();
      await expect(serviceCard).toBeVisible();
    }
  });

  test('Font loading and fallbacks', async ({ page, browserName }) => {
    console.log(`Testing font loading on ${browserName}`);

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check computed font family
    const bodyFont = await page
      .locator('body')
      .evaluate(el => window.getComputedStyle(el).fontFamily);

    // Should load Inter or fall back to system fonts
    const expectedFonts = ['Inter', 'system-ui', 'sans-serif', 'BlinkMacSystemFont'];
    const hasExpectedFont = expectedFonts.some(font =>
      bodyFont.toLowerCase().includes(font.toLowerCase())
    );

    expect(hasExpectedFont).toBe(true);
  });

  test('Event listener compatibility', async ({ page, browserName }) => {
    console.log(`Testing event listeners on ${browserName}`);

    // Test click events
    let clickWorked = false;

    await page.evaluate(() => {
      // Test if addEventListener works
      const testElement = document.createElement('div');
      testElement.addEventListener('click', () => {
        window.testClickWorked = true;
      });
      testElement.click();
    });

    clickWorked = await page.evaluate(() => window.testClickWorked);
    expect(clickWorked).toBe(true);

    // Test real UI interactions using web-first assertions
    await expect(page.locator('#cookie-notice')).toBeVisible();

    // This should trigger event listeners using semantic selector
    await page.getByRole('link', { name: /Alle akzeptieren/i }).click();

    // Banner should disappear (event listener worked)
    const banner = page.locator('#cookie-notice');
    await expect(banner).toBeHidden();
  });
});
