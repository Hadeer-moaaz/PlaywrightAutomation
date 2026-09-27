# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI_Testing\letsShop\Login&CreateOrderPO.spec.js >> @web Client APP login ADIDAS ORIGINAL
- Location: tests\UI_Testing\letsShop\Login&CreateOrderPO.spec.js:11:1

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e28]:
    - paragraph [ref=e30]: Thank you for Shopping With Us
    - generic [ref=e31]:
      - generic [ref=e32]: order summary
      - generic [ref=e34]:
        - text: Order Id
        - generic [ref=e35]: 6ab8ed522be7a4bc2b728ef6
      - generic [ref=e37]:
        - generic [ref=e39]:
          - generic [ref=e40]: Billing Address
          - paragraph [ref=e41]: SuzyRoshdy3@gamil.com
          - paragraph [ref=e42]: Country - Egypt
        - generic [ref=e44]:
          - generic [ref=e45]: Delivery Address
          - paragraph [ref=e46]: SuzyRoshdy3@gamil.com
          - paragraph [ref=e47]: Country - Egypt
      - generic [ref=e48]: Product Ordered
      - generic [ref=e56]:
        - generic [ref=e57]: ADIDAS ORIGINAL
        - generic [ref=e58]:
          - generic [ref=e59]: by ECOM
          - generic [ref=e60]: $ 11500
      - generic [ref=e61]: View Orders
```

# Test source

```ts
  1  | const {expect} = require ('@playwright/test');
  2  | 
  3  | class Checkout {
  4  | 
  5  | 
  6  |     constructor(page){
  7  | 
  8  |         this.page = page;
  9  |         this.quantitylocator = page.locator('[class="item__quantity"]');
  10 |         this.creditCardNum = page.locator('[type="text"]');
  11 |         this.month = page.locator('[class="input ddl"]');
  12 |         this.day = page.locator('[class="input ddl"]');
  13 |         this.csv = page.locator('[class="input txt"]');
  14 |         this.nameOnCard = page.locator('[class="input txt"]');
  15 |         this.selectCountry = page.getByPlaceholder("Select Country");
  16 |         this.countryText = page.getByRole("button", {name: "Egypt"});
  17 |         this.coupon = page.locator('[name="coupon"]');
  18 |         this.ApplycouponBtn = page.getByText("Apply Coupon").nth(1);
  19 |         this.placeOrder = page.getByText("PLACE ORDER");
  20 |         this.thankUMsg = page.getByText("Thankyou for the order.");
  21 |         this.orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');
  22 |         this.orderBtnLocator = page.locator('button[routerlink="/dashboard/myorders"]');
  23 |         this.tbody = page.locator("tbody");
  24 |         this.tbodyTable = page.locator("tbody tr");
  25 |         this.OrderIdDetails = page.locator('.col-text');
  26 |     }
  27 | async quantity (){
  28 |     await expect(this.quantitylocator.first()).toHaveText(" Quantity: 1 ");
  29 | }
  30 | 
  31 | async creditCardInfo (creditCardNum, month, day, csv, nameOnCard){
  32 | 
  33 |     await this.creditCardNum.nth(0).fill(creditCardNum);
  34 |     await this.month.nth(0).selectOption(month);
  35 |     await this.day.nth(1).selectOption(day);
  36 |     await this.csv.first().fill(csv);
  37 |     await this.nameOnCard.last().fill(nameOnCard);
  38 | 
  39 | }
  40 | 
  41 | async searchCountryAndSelect (countryCode){
  42 | 
  43 |     await this.selectCountry.pressSequentially(countryCode, { delay: 150 });
  44 |     await this.countryText.click();
  45 | }
  46 | 
  47 | async applyCoupon (couponCode){
  48 | 
  49 |     await this.coupon.fill(couponCode);
  50 |     await this.ApplycouponBtn.click({ timeout: 10_000 });
  51 | }
  52 | 
  53 | async submitandGetOrderID()
  54 | {
  55 |     await this.placeOrder.click();
  56 |     await expect (this.thankUMsg).toHaveText(" Thankyou for the order. ");
  57 |     await expect (this.thankUMsg).toBeVisible();
  58 |     console.log(await this.thankUMsg.innerText());
  59 | 
  60 | 
  61 |     this.orderId = await this.orderIdLocator.textContent();
  62 |     console.log(await this.orderId);
  63 |     await this.orderBtnLocator.click();
  64 |     await this.tbody.waitFor(); 
  65 | 
  66 | 
  67 |     const rows = this.tbodyTable;
  68 |     for (let i = 0; i < await rows.count(); ++i){
  69 |        const orderIdNum = await rows.nth(i).locator("th").textContent();
  70 |        if (this.orderId.includes(orderIdNum))
  71 |        {
  72 |         console.log("orderID = orderIdNum");
  73 |         await rows.nth(i).locator("button").nth(0).click();
  74 |         break;
  75 |        }
  76 |     }
  77 | }
  78 | 
  79 | async checkOrder (){
  80 | 
  81 |     
  82 |     await this.orderBtnLocator.waitFor();
  83 |     const orderIdDetailsText = await this.OrderIdDetails.textContent();
> 84 |     expect(this.orderId.includes(orderIdDetailsText)).toBeTruthy();
     |                                                       ^ Error: expect(received).toBeTruthy()
  85 |     console.log(orderIdDetailsText);
  86 | }
  87 | 
  88 | 
  89 | }
  90 | module.exports = {Checkout};
```