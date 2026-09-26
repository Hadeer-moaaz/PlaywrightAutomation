import { test, expect } from '@playwright/test';

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const API_URL = BASE_URL + '/register';
// const API_URL = {BASE_URL}/register;

const Yahoo_USER   = {email: 'email1@gmail.com', password: 'ModyMM@2020' };
const Gmail_USER   = {email: 'email2@gmail.com', password: 'ModyMM@2020' };

async function loginAndGoToEvents(page, user) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(user.Yahoo_USER);
    await page.getByLabel('Password').fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  }

  test.skip('Banner IS visible when 6 events are returned', async ({ page }) => {


    
  })


