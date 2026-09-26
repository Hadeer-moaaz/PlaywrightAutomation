import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 0 ,
  timeout: 60 *1000,
  expect: {
    timeout: 5000,
  },
  reporter:'html',
  reporter: [["line"], ["allure-playwright"]],
  
  use: {
  browserName: 'chromium',
  headless: false,
  actionTimeout: 10 * 1000,
  navigationTimeout: 30 * 1000,
  screenshot: 'only-on-failure',
  video: 'retain-on-failure-and-retries',
  trace: 'retain-on-failure',
  ignoreHTTPSErrors: true,
  //...devices['iPhone 11'],
  viewport: null, launchOptions: {args: ['--start-maximized'],},
  permissions: ['geolocation']
}
});
module.exports = config;

//https://playwright.dev/docs/api/class-testconfig