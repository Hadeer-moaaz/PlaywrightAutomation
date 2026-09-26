const {test, expect} = require ('@playwright/test');

// timeout config: global > test level > step level 

// 30 secs timeout - test timeout error
test('PlayWright Special Locators', async({page})=> {

    test.setTimeout(60000);
    // set assertion timeout in Test level
    const slowExpect = expect.configure({ timeout: 10_000 });
    // set action timeout in Test level
    page.setDefaultTimeout(9000); //this overrides what we have set in global level (mean will ignore the timeout set globally in config.js and replace this)

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    const name = page.locator('[name="name"]').first();
    const password = page.getByPlaceholder("Password");    
    const checkBox = page.getByLabel("Check me out if you Love IceCreams!");
    const employmentStatus = page.getByLabel("Employed");
    const gender = page.getByLabel("Gender");    
    const submit = page.getByRole("button", {name: "submit"});
    const successMessage = page.getByText("Success! The Form has been submitted successfully!.");
    const shopLink = page.getByRole("link", {name: "Shop"});
    const appCardList = page.locator("app-card");


    await name.fill("MMM")
    await password.fill("345532222");
    await checkBox.click();
    await employmentStatus.check();
    await gender.selectOption("Male");
    await submit.click();
    //5 seconds default timeout for expect assertions 
    await expect (successMessage).toBeVisible({ timeout: 10_000 });// set assertion timeout in step level
    await slowExpect (successMessage).toContainText("Success! The Form has been submitted successfully!.");
    await shopLink.click();
    await appCardList.filter({hasText: "Nokia Edge"}).getByRole("button").click({ timeout: 10_000 });// set action timeout in step level


    // await page.pause();



});