const {test, expect} = require ('@playwright/test');
const {POmanager} = require('../../../pageobjects/POmanager');
const {customtest} = require('../../../utils/test-base');

// convert JSON --> String --> js object
const dataSet = JSON.parse(JSON.stringify(require('../../../utils/testData.json')));


for (const data of dataSet){  // running different test data 

test(`@web Client APP login ${data.productName}`, async({page})=>
{


const pomanager = new POmanager(page);
const loginPage = pomanager.getLoginPage();
const dashboardPage = pomanager.getDashboardPage();
const cartPage = pomanager.getCartPage();
const checkOut = pomanager.getCheckoutPage();
const orderHistoryPage = pomanager.getOrderHistoryPage();


await loginPage.goTo();
await loginPage.validLogin(data.username,data.password);
console.log(await page.title());
await expect(page).toHaveTitle("Let's Shop");

await dashboardPage.searchProductAddCart(data.productName);
await dashboardPage.navigateToCart();
await cartPage.VerifyProductIsDisplayed(data.productName)

await cartPage.Checkout();
await checkOut.quantity();
await checkOut.creditCardInfo("5643 2345 8965 1234","08","13","234", "Suzy Roshdy Rahul");
await checkOut.searchCountryAndSelect("Eg");
await checkOut.applyCoupon("rahulshettyacademy");
await checkOut.submitandGetOrderID();
await checkOut.checkOrder();
await orderHistoryPage.getOrderId();


});


customtest(`@web Client App login`, async ({page,testDataForOrder})=>
{
  const poManager = new POmanager(page);
  //js file- Login js, DashboardPage
  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
});
}