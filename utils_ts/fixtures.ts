const base = require('@playwright/test');
const {request} = require('@playwright/test');

const {APiUtils} = require ('../utils/APiUtils');
const loginPayLoad = {userEmail:"SuzyRoshdy5@gamil.com",userPassword:"Dede@2020"};
const orderPayLoad  = {orders:[{"country":"Turkey",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

exports.customtest = base.test.extend(
    {
    authenticationPage : async({browser}, use)=>{

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("SuzyRoshdy5@gamil.com");
        await page.locator("#userPassword").fill("Dede@2020");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await use(page);
    },

    createOrder : async({}, use )=> {
        const apiContext = await request.newContext();
        const apiUtils = new APiUtils(apiContext,loginPayLoad);
        const response =  await apiUtils.createOrder(orderPayLoad);
        await use(response);  //teardown
    },

    testDataForOrder : {
        productName : 'ADIDAS ORIGINAL'
    }

});