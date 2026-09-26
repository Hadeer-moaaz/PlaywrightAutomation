const base = require('@playwright/test');
const {request} = require('@playwright/test');

const {APiUtils} = require ('./APiUtils');
const loginPayLoad = {userEmail:"hadeer@gmail.com",userPassword:"ModyMM@2020"};
const orderPayLoad  = {orders:[{"country":"Turkey",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com';

exports.customtest = base.test.extend(
    {
    authenticationPage : async({browser}, use)=>{

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
        await page.getByPlaceholder('you@email.com').fill(loginPayLoad.userEmail);
        await page.getByLabel('Password').fill(loginPayLoad.userPassword);
        await page.locator('#login-btn').click();
        await use(page);
    },

    createEvent : async({}, use )=> {
        const apiContext = await request.newContext({ baseURL: API_BASE_URL });

        const apiUtils = new APiUtils(apiContext,loginPayLoad);
        const response =  await apiUtils.createOrder(orderPayLoad);
        await use(response);  //teardown
    },

    testDataForOrder : {
        productName : 'ADIDAS ORIGINAL'
    }

});