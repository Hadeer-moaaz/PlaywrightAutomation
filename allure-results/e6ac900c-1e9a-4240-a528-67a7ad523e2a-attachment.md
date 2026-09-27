# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI_Testing\letsShop\Login&CreateOrderPO.spec.js >> @web Client APP login ZARA COAT 3
- Location: tests\UI_Testing\letsShop\Login&CreateOrderPO.spec.js:11:1

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.col-text').first()
Expected substring: "6ab8f3972be7a4bc2b72a43d"
Received string:    "6ab8ef902be7a4bc2b729741"
Timeout: 15000ms

Call log:
  - Expect "toContainText" locator('.col-text').first() with timeout 15000ms
  - waiting for locator('.col-text').first()
    33 × locator resolved to <div _ngcontent-qnh-c41="" class="col-text -main">6ab8ef902be7a4bc2b729741</div>
       - unexpected value "6ab8ef902be7a4bc2b729741"

```

```yaml
- text: 6ab8ef902be7a4bc2b729741
```

# Test source

```ts
  7   | 
  8   |         this.page = page;
  9   |         this.quantitylocator = page.locator('[class="item__quantity"]');
  10  |         this.creditCardNum = page.locator('[type="text"]');
  11  |         this.month = page.locator('[class="input ddl"]');
  12  |         this.day = page.locator('[class="input ddl"]');
  13  |         this.csv = page.locator('[class="input txt"]');
  14  |         this.nameOnCard = page.locator('[class="input txt"]');
  15  |         this.selectCountry = page.getByPlaceholder("Select Country");
  16  |         this.countryText = page.getByRole("button", {name: "Egypt"});
  17  |         this.coupon = page.locator('[name="coupon"]');
  18  |         this.ApplycouponBtn = page.getByText("Apply Coupon").nth(1);
  19  |         this.placeOrder = page.getByText("PLACE ORDER");
  20  |         this.thankUMsg = page.getByText("Thankyou for the order.");
  21  |         this.orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');
  22  |         this.orderBtnLocator = page.locator('button[routerlink="/dashboard/myorders"]');
  23  |         this.tbody = page.locator("tbody");
  24  |         this.tbodyTable = page.locator("tbody tr");
  25  |         this.OrderIdDetails = page.locator('.col-text');
  26  |     }
  27  | async quantity (){
  28  |     await expect(this.quantitylocator.first()).toHaveText(" Quantity: 1 ");
  29  | }
  30  | 
  31  | async creditCardInfo (creditCardNum, month, day, csv, nameOnCard){
  32  | 
  33  |     await this.creditCardNum.nth(0).fill(creditCardNum);
  34  |     await this.month.nth(0).selectOption(month);
  35  |     await this.day.nth(1).selectOption(day);
  36  |     await this.csv.first().fill(csv);
  37  |     await this.nameOnCard.last().fill(nameOnCard);
  38  | 
  39  | }
  40  | 
  41  | async searchCountryAndSelect (countryCode){
  42  | 
  43  |     await this.selectCountry.pressSequentially(countryCode, { delay: 150 });
  44  |     await this.countryText.click();
  45  | }
  46  | 
  47  | async applyCoupon (couponCode){
  48  | 
  49  |     await this.coupon.fill(couponCode);
  50  |     await this.ApplycouponBtn.click({ timeout: 10_000 });
  51  | }
  52  | 
  53  | // async submitandGetOrderID()
  54  | // {
  55  | //     await this.placeOrder.click();
  56  | //     await expect (this.thankUMsg).toHaveText(" Thankyou for the order. ");
  57  | //     await expect (this.thankUMsg).toBeVisible();
  58  | //     console.log(await this.thankUMsg.innerText());
  59  | 
  60  | 
  61  | //     this.orderId = await this.orderIdLocator.textContent();
  62  | //     console.log(await this.orderId);
  63  | //     await this.orderBtnLocator.click();
  64  | //     await this.tbody.waitFor(); 
  65  | 
  66  | 
  67  | //     const rows = this.tbodyTable;
  68  | //     for (let i = 0; i < await rows.count(); ++i){
  69  | //        const orderIdNum = await rows.nth(i).locator("th").textContent();
  70  | //        if (this.orderId.includes(orderIdNum))
  71  | //        {
  72  | //         console.log("orderID = orderIdNum");
  73  | //         await rows.nth(i).locator("button").nth(0).click();
  74  | //         break;
  75  | //        }
  76  | //     }
  77  | // }
  78  | 
  79  | async submitandGetOrderID()
  80  | {
  81  |     await this.placeOrder.click();
  82  |     await expect(this.thankUMsg).toHaveText(" Thankyou for the order. ");
  83  |     await expect(this.thankUMsg).toBeVisible();
  84  | 
  85  |     this.orderId = (await this.orderIdLocator.textContent()).trim();
  86  | 
  87  |     // Extract just the ID portion between the pipes, if the format is consistently " | <id> | "
  88  |     this.orderId = this.orderId.replace(/\|/g, '').trim();
  89  | 
  90  | await this.orderBtnLocator.click();
  91  |     await this.tbody.waitFor();
  92  | 
  93  |     const rows = this.tbodyTable;
  94  |     for (let i = 0; i < await rows.count(); ++i) {
  95  |         const orderIdNum = await rows.nth(i).locator("th").textContent();
  96  |         if (this.orderId.includes(orderIdNum)) {
  97  |             await rows.nth(i).locator("button").nth(0).click();
  98  |             break;
  99  |         }
  100 |     }
  101 | 
  102 |     // Wait here for the order-details page to actually render
  103 |     await this.OrderIdDetails.first().waitFor({ state: 'visible', timeout: 15000 });
  104 | }
  105 | 
  106 | async checkOrder() {
> 107 |     await expect(this.OrderIdDetails.first()).toContainText(this.orderId, { timeout: 15000 });
      |                                               ^ Error: expect(locator).toContainText(expected) failed
  108 | }
  109 | 
  110 | 
  111 | // async checkOrder (){
  112 | 
  113 |     
  114 | //     await this.orderBtnLocator.waitFor();
  115 | //     const orderIdDetailsText = await this.OrderIdDetails.textContent();
  116 | //     expect(this.orderId.includes(orderIdDetailsText)).toBeTruthy();
  117 | //     console.log(orderIdDetailsText);
  118 | // }
  119 | 
  120 | 
  121 | }
  122 | module.exports = {Checkout};
```