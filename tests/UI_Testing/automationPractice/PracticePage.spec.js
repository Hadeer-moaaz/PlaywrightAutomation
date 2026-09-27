import { test, expect } from '@playwright/test';

const BASE_URL      = 'https://rahulshettyacademy.com/AutomationPractice/'

test('goBack & goForward', async({page})=>
{
    await page.goto(BASE_URL);
    await page.goto("https://www.udemy.com/");
    await page.goBack();
    await page.goForward();

});
test('show & hidden Button', async({page})=>
{
    await page.goto(BASE_URL);
    const hideText = page.getByPlaceholder('Hide/Show Example');
    const hideBtn = page.locator('#hide-textbox');
    await expect(hideText).toBeVisible();
    await hideBtn.click();
    await expect(hideText).toBeHidden();
});

test('handle popup', async({page})=>
{
    await page.goto(BASE_URL);
    page.on('dialog', dialog => dialog.accept()); //listener 
//  page.on('dialog', dialog => dialog.dismiss());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
    // await page.pause();
});

test('handle Frames', async({page})=>
{
    await page.goto(BASE_URL);
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator('li a[href="lifetime-access"]').first().click();
    // await page.pause();
    const textCheck= await framePage.locator('div h2').first().textContent();
  //console.log(textCheck.split(" ")[1]); 
    console.log(`Number of Subscibers: ${textCheck.split(" ")[1]}`);


});

