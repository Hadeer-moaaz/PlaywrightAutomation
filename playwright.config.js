const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 1 : 0,   // ← auto-retry once in CI, no retries locally
  timeout: 60 * 1000,
 // workers: process.env.CI ? 1 : undefined,
  expect: {
    timeout: 15000,
  },
  reporter: [["line"], ["allure-playwright"]],

  use: {
    browserName: 'chromium',
    headless: process.env.CI ? true : false,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    viewport: null,
    launchOptions: { args: ['--start-maximized'] },
    permissions: ['geolocation'],
  },
});