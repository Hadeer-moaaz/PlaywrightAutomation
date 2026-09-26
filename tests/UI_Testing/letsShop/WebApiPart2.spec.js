const {test, expect} = require ('@playwright/test');
let webContext; 
const URL = "https://rahulshettyacademy.com/client/#/auth/login";

test.beforeAll( async ({browser})=> 
{

   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto(URL);
   console.log(await page.title());
   await expect(page).toHaveTitle("Let's Shop");
   await page.getByPlaceholder("email@example.com").fill("SuzyRoshdy5@gamil.com");
   await page.getByPlaceholder("enter your passsword").fill("Dede@2020");
   await page.getByRole("button", {name: "login"}).click();
   await page.waitForLoadState('networkidle');
   await context.storageState({path: 'state.json'});
   webContext = await browser.newContext({storageState: 'state.json'});

});

test('E2E place order', async({})=>
{
    
    const page = await webContext.newPage();

    const productNameSecondPage = page.getByText("ZARA COAT 3");
    const allItems = page.locator('div li');
    const checkoutBtn = page.getByRole("button", {name: "Checkout"});
    const quantity = page.locator('[class="item__quantity"]');
    const creditCardNum = page.locator('[type="text"]');
    const month = page.locator('[class="input ddl"]');
    const day = page.locator('[class="input ddl"]');
    const csv = page.locator('[class="input txt"]');
    const nameOnCard = page.locator('[class="input txt"]');
    const shipInfo = page.getByLabel('SuzyRoshdy5@gamil.com');
    const coupon = page.locator('[name="coupon"]');
    const ApplycouponBtn = page.getByText("Apply Coupon").nth(1);
    const placeOrder = page.getByText("PLACE ORDER");
    const thankUMsg = page.getByText("Thankyou for the order.");
    const orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');
    const orderIdLocatorSecondPage = page.locator('[_ngcontent-hsa-c43]').nth(15);
    const orderBtnLocator = page.locator('button[routerlink="/dashboard/myorders"]');
    const orderSummaryContainer = page.locator('[class="email-container"]');

   
    const productName = 'ZARA COAT 3';
    await page.goto(URL);
    const products = page.locator('.card-body');
    const titles = await products.allTextContents();
    console.log(titles);


    await products
                .filter({hasText: productName})
                .getByRole("button", {name: " Add To Cart"})
                .click();
    await page
             .getByRole("listitem")
             .getByRole('button', {name: "Cart"})
             .click();

    await allItems
                .first()
                .waitFor(); // we are putting here wait for due to playwright is not supporting the auto-wait for isVisible, so when go to check if the element isVisible or not need to wait untill the allItems locator is loaded
    await expect(productNameSecondPage).toBeVisible();

    await checkoutBtn.click();
    await expect(quantity.first()).toHaveText(" Quantity: 1 ");
    await creditCardNum.nth(0).fill("5643 2345 8965 1234");
    await month
                .nth(0)
                .selectOption("08");
    await day  
            .nth(1)
            .selectOption("13");
    await csv
            .first()
            .fill("234");
    await nameOnCard
                    .last()
                    .fill("Suzy Roshdy Rahul");
   
    await page
            .getByPlaceholder("Select Country")
            .pressSequentially("Eg", { delay: 150 });

    await page
            .getByRole("button", {name: "Egypt"})
            .click();

    await coupon.fill("rahulshettyacademy");
    await ApplycouponBtn.click({ timeout: 10_000 });
    await placeOrder.click();

    await expect (thankUMsg).toHaveText(" Thankyou for the order. ");
    await expect (thankUMsg).toBeVisible();
    console.log(await thankUMsg.innerText());

    const orderId = await orderIdLocator.textContent();
    console.log(orderId);
    await orderBtnLocator.click();
    await page 
            .locator("tbody")
            .waitFor(); //wait for the whole page is loaded



    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i){
       const orderIdNum = await rows.nth(i).locator("th").textContent();
       if (orderId.includes(orderIdNum))
       {
        console.log("orderID = orderIdNum");
        await rows.nth(i).locator("button").nth(0).click();
        break;
       }
    }

    await orderBtnLocator.waitFor();
    const OrderIdDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(OrderIdDetails)).toBeTruthy();
    console.log(OrderIdDetails);



});