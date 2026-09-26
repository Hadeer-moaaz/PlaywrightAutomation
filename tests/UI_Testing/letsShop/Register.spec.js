const {test, expect} = require ('@playwright/test');



test('Register to website with valid data', async({page})=>
{
    const registerBtn = page.locator('a.btn1');
    const firstname = page.locator('#firstName');
    const lastname = page.locator('#lastName');
    const email = page.locator('#userEmail');
    const mobile = page.locator('#userMobile');
    const gender = page.locator('[value="Female"]');
    const password = page.locator('#userPassword');
    const confirmPassword = page.locator('#confirmPassword');
    const older = page.locator('[formcontrolname="required"]');
    const registerBtn2 = page.locator('#login');
    const RegsuccessMsg = page.locator('[class="headcolor"]');
    const loginBtn = page.locator('[class="btn btn-primary"]');
    const login = page.locator('#login');
    const adidasLocator = page.locator('.card-body b');

    
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
console.log(await page.title());
await expect(page).toHaveTitle("Let's Shop");

await registerBtn.click();
await firstname.fill("Suzy");
await lastname.fill("Roshdy");
await email.fill("SuzyRoshdy5@gamil.com");
await mobile.fill("1234567890");
await gender.click();
await password.fill("Dede@2020");
await confirmPassword.fill("Dede@2020");
await older.click();
await registerBtn2.click();

console.log(await RegsuccessMsg.textContent());
await expect(RegsuccessMsg).toContainText('Account Created Successfully');

await loginBtn.click();
await email.fill("SuzyRoshdy5@gamil.com");
await password.fill("Dede@2020");
await login.click();
console.log(await adidasLocator.first().textContent());
console.log(await adidasLocator.allTextContents());
await expect(adidasLocator).toContainText('ADIDAS ORIGINAL');

// await page.pause();

});