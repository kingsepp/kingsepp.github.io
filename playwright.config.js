// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Cross-Browser Testing Configuration
 * Tests run across Chromium, Firefox, Safari, and Mobile devices
 */
export default defineConfig({
  testDir: './tests/playwright',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Global test timeout */
  timeout: 60 * 1000,

  /* Global expect timeout */
  expect: {
    timeout: 10 * 1000,
  },

  /* Test output directory */
  outputDir: 'test-results/',

  /* Test match patterns */
  testMatch: '**/*.spec.js',

  /* Test ignore patterns */
  testIgnore: '**/node_modules/**',

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'playwright-report/test-results.json' }],
    ['junit', { outputFile: 'playwright-report/junit-results.xml' }],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshots only on failure */
    screenshot: 'only-on-failure',

    /* Record video only on failure */
    video: 'retain-on-failure',

    /* Mock Turnstile verification for testing */
    extraHTTPHeaders: {
      'X-Test-Environment': 'true',
    },
  },

  /* Global setup for replacing Turnstile sitekeys with test keys */
  globalSetup: './tests/global-setup.js',

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'bundle exec jekyll serve --port 4000 --detach',
    url: 'http://localhost:4000',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000,
    stderr: 'pipe',
    stdout: 'pipe',
  },
});
