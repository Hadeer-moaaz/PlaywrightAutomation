import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 1 ,
  timeout: 60 *1000,
  expect: {
    timeout: 5000,
  },
  reporter:'html',
  projects: [
    {
    name : 'safari',
    use: {
      browserName: 'webkit',
      headless: true,
      actionTimeout: 10 * 1000,
      navigationTimeout: 30 * 1000,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure-and-retries',
      trace: 'retain-on-failure',
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      permissions: ['geolocation']
      },
  },
  {
    name : 'chrome',
    use: {
      browserName: 'chromium',
      headless: true,
      actionTimeout: 10 * 1000,
      navigationTimeout: 30 * 1000,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure-and-retries',
      trace: 'retain-on-failure',
      viewport: { width: 375, height: 812 },
      ...devices['iPhone 11'],
      ignoreHTTPSErrors: true,
      permissions: ['geolocation']
      },
  },
  
  ],
  
});
module.exports = config;

//https://playwright.dev/docs/api/class-testconfig