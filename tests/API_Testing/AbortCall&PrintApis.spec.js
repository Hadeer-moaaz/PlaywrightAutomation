const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('@API Login with valid data', async ({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();
    // page.route('**/*.{jpg,png,jpej}', route=> route.abort()); // will stop the call to reach the browser 

    page.on('request', request => console.log(request.url())); // capture all the netwrok calls in the BE then print them
    page.on('response', response => console.log(response.url(),response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title()); 
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await page.locator('#username').fill("rahulshettyacademy") 
    await page.locator('#password').fill("Learning@830$3mK2"); 
    await page.locator('[class="checkmark"]').nth(1).click();
    const isChecked = await page.locator('[class="checkmark"]').nth(1).isChecked();
    if (isChecked) {
        console.log("The checkbox is checked.");
    } else {
        console.log("The checkbox is not checked.");
    }

    console.log(await page.locator("#okayBtn").click());
    await expect(page.locator("div.modal-body")).toContainText('You will be limited to only fewer functionalities of the app. Proceed?');
    await expect(page.locator('[class="checkmark"]').nth(1)).toBeChecked();

    await page.locator('select.form-control').selectOption("consult");
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(page.locator('[class="blinkingText"]').nth(0)).toHaveAttribute('class', 'blinkingText'); //assert on blinky link class

    await page.locator('#signInBtn').click();
    
    console.log(await page.locator('.card-body a').nth(0).textContent());  
    await expect(page.locator('.card-body a').nth(0)).toContainText("iphone X");
    console.log(await page.locator('.card-body a').allTextContents());  
    console.log(await page.title()); 
    await expect(page).toHaveTitle("ProtoCommerce"); 

});


