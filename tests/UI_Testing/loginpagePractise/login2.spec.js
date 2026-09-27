const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');
const { only } = require('node:test');

test('Browser Context Playwright test', async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com/");
    console.log(await page.title());
   await expect(page).toHaveTitle("Google");

});

test('Login with valid data', async ({page})=>
{

    const username = page.locator('#username');
    const password = page.locator('#password');
    const signinBtn = page.locator('#signInBtn');
    const warningMessage_locator = page.locator("[style*='block']");
    const iphoneLocator = page.locator('.card-body a');
    const dropdown = page.locator('select.form-control'); //select 
    const radioBtn = page.locator('[class="checkmark"]');
    const okayBtn = page.locator("#okayBtn");
    const bodymsg = page.locator("div.modal-body");
    const terms = page.locator('#terms');
    const documentLink = page.locator('[class="blinkingText"]');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title()); // get title - assersion
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

//Enter valid data
    await username.fill("rahulshettyacademy") //locate the username 
    await password.fill("Learning@830$3mK2"); //locate the password 
    await radioBtn.nth(1).click();
    const isChecked = await radioBtn.nth(1).isChecked();
    if (isChecked) {
        console.log("The checkbox is checked.");
    } else {
        console.log("The checkbox is not checked.");
    }

    console.log(await okayBtn.click());
    await expect(bodymsg).toContainText('You will be limited to only fewer functionalities of the app. Proceed?');
    await expect(radioBtn.nth(1)).toBeChecked();

    await dropdown.selectOption("consult");
    await terms.click();
    await expect(terms).toBeChecked();
    await terms.uncheck();
    expect(await terms.isChecked()).toBeFalsy();
    await expect(documentLink.nth(0)).toHaveAttribute('class', 'blinkingText'); //assert on blinky link class

    await signinBtn.click();
    //print the message 
    //console.log(await iphoneLocator.first().textContent()); // print the first element 1 way
    console.log(await iphoneLocator.nth(0).textContent());  // print the first element 2 way
    await expect(iphoneLocator.nth(0)).toContainText("iphone X"); //assert on the first element
    console.log(await iphoneLocator.allTextContents());  // print all elements
    console.log(await page.title()); //print the title
    await expect(page).toHaveTitle("ProtoCommerce"); //assert on the title 

});


test('Login with invalid data', async ({page})=>
{

    const username = page.locator('#username');
    const password = page.locator('#password');
    const signinBtn2 = page.getByRole('button', { name: 'Sign In' });
    const warningMessage_locator = page.locator("[style*='block']");
    const iphoneLocator = page.locator('.card-body a');
    const dropdown = page.locator('select.form-control'); //select 
    const radioBtn = page.locator('[class="checkmark"]');
    const okayBtn = page.locator("#okayBtn");
    const bodymsg = page.locator("div.modal-body");
    const terms = page.locator('#terms');



    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title()); // get title - assersion
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    
    // Enter invalid data
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK");
    await radioBtn.nth(1).click();
    const isChecked = await radioBtn.nth(1).isChecked();
    if (isChecked) {
        console.log("The checkbox is checked.");
    } else {
        console.log("The checkbox is not checked.");
    }
    
    console.log(await okayBtn.click());
    await expect(bodymsg).toContainText('You will be limited to only fewer functionalities of the app. Proceed?');
    await dropdown.selectOption("consult");  //select 
    
    console.log("Terms count:", await terms.count());
    console.log("Terms visible:", await terms.isVisible());
    console.log("Terms enabled:", await terms.isEnabled());

    await terms.click();

    await signinBtn2.click();
    console.log(await warningMessage_locator.textContent());//print the warning 
    await expect(warningMessage_locator).toContainText('Incorrect');   //asserstion 

});

test('child window handling', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator('[class="blinkingText"]');
    const username = page.locator('#username');

    //method to listen to any page gets opened, pending, rejected, fulfilled
    const [newPage] = await Promise.all
    (
    [context.waitForEvent('page'), 
    await documentLink.nth(0).click(),]  
    )

   const text = await newPage.locator('[class="im-para red"]').textContent();
   const arrayText = text.split("@")
   const domain = arrayText[1].split(" ")[0]
   // console.log(domain);
   await page.locator("#username").fill(domain);
  // console.log(await page.locator("#username").textContent()); // textContent will show the locator text when it is present in the DOM like username/password 
  console.log(await page.locator("#username").inputValue()); 
    // const massage = newPage.locator('[class="im-para red"]');
    // console.log(await massage.textContent());
});
