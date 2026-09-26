import { test, expect , request} from '@playwright/test';
const {customtest} = require("../../utils/fixtures");

customtest('@API Fixtures Demo',async({authenticationPage,createOrder, testDataForOrder})=> 
{

    //login to app / create order and verify if the order is created
    authenticationPage.goto("https://rahulshettyacademy.com/client/");
    await authenticationPage.locator("button[routerlink*='myorders']").click();
    await authenticationPage.locator("tbody").waitFor();
    await expect(authenticationPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
})