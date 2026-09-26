const {Given, When, Then, setDefaultTimeout} = require ('@cucumber/cucumber')
const {expect} = require ('@playwright/test');
     

setDefaultTimeout(60 * 1000);
Given ('user go to {string}', async function (url) {
        
        //await loginPage.goTo();
       await this.page.goto(url,{ waitUntil: 'domcontentloaded' });
});


When ('user login to Ecommerce application with {string} and {string}', async function (username , password) {
        this.loginPage = this.pomanager.getLoginPage();
        await this.loginPage.validLogin(username,password);
        console.log(await this.page.title());
        await expect(this.page).toHaveTitle("Let's Shop");
});


Then ('Title has {string} text', async function (expectedTitle) {
        await expect(this.page).toHaveTitle(expectedTitle);
});


When ('add {string} to Cart', async function (string) {
    this.dashboardPage = this.pomanager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(string);
    await this.dashboardPage.navigateToCart();

});

Then ('Verify {string} is displayed in the Cart', async function (string) {
        this.cartPage = this.pomanager.getCartPage();
        await this.cartPage.VerifyProductIsDisplayed(string)
        await this.cartPage.Checkout();
});


When ('Enter valid details and place the Order', async function () {
        this.checkOut = this.pomanager.getCheckoutPage();
        await this.checkOut.quantity();
        await this.checkOut.creditCardInfo("5643 2345 8965 1234","08","13","234", "Suzy Roshdy Rahul");
        await this.checkOut.searchCountryAndSelect("Eg");
        await this.checkOut.applyCoupon("rahulshettyacademy");
        await this.checkOut.submitandGetOrderID();
        await this.checkOut.checkOrder();
});


Then ('Verify Order is present in the OrderHistory', async function () {
        this.orderHistoryPage = this.pomanager.getOrderHistoryPage();
        await this.orderHistoryPage.getOrderId();

});


When('user login to with invalid credentials to the application with {string} and {string}', async function (username, password) {
        const loginPage = this.pomanager.getLoginPage();
        this.result = await loginPage.invalidLogin(username, password);
    });

Then('Verify error message is displayed', async function () {
        expect(this.result.status).toBe(400);
        expect(this.result.message).toContain("Incorrect email or password");
});