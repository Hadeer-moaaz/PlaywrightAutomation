import { test, expect } from '@playwright/test';

const BASE_URL      = 'https://rahulshettyacademy.com/AutomationPractice/';

test.describe.configure({mode: 'parallel'});
test("Popup validations", async({page})=>
{
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");

});

test.only("Screenshot & Visual comparision", async({page})=>
{
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    const showAndHide = page.locator("#displayed-text");
    const hideBtn = page.locator("#hide-textbox");
    
    await expect(showAndHide).toBeVisible();
    await showAndHide.screenshot({path:'partialScreenshot.png', timeout: 20_000});
    await hideBtn.click();
    await page.screenshot({path: 'screenshot.png', timeout: 20_000});
    await expect(showAndHide).toBeHidden();
});

//screenshot -store -> screenshot ->
test('visual', async({page})=>
{
    await page.goto("https://google.com/", { waitUntil: 'domcontentloaded' });
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

});
