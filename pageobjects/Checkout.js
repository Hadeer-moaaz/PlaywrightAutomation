const {expect} = require ('@playwright/test');

class Checkout {


    constructor(page){

        this.page = page;
        this.quantitylocator = page.locator('[class="item__quantity"]');
        this.creditCardNum = page.locator('[type="text"]');
        this.month = page.locator('[class="input ddl"]');
        this.day = page.locator('[class="input ddl"]');
        this.csv = page.locator('[class="input txt"]');
        this.nameOnCard = page.locator('[class="input txt"]');
        this.selectCountry = page.getByPlaceholder("Select Country");
        this.countryText = page.getByRole("button", {name: "Egypt"});
        this.coupon = page.locator('[name="coupon"]');
        this.ApplycouponBtn = page.getByText("Apply Coupon").nth(1);
        this.placeOrder = page.getByText("PLACE ORDER");
        this.thankUMsg = page.getByText("Thankyou for the order.");
        this.orderIdLocator = page.locator('.em-spacer-1 .ng-star-inserted');
        this.orderBtnLocator = page.locator('button[routerlink="/dashboard/myorders"]');
        this.tbody = page.locator("tbody");
        this.tbodyTable = page.locator("tbody tr");
        this.OrderIdDetails = page.locator('.col-text');
    }
async quantity (){
    await expect(this.quantitylocator.first()).toHaveText(" Quantity: 1 ");
}

async creditCardInfo (creditCardNum, month, day, csv, nameOnCard){

    await this.creditCardNum.nth(0).fill(creditCardNum);
    await this.month.nth(0).selectOption(month);
    await this.day.nth(1).selectOption(day);
    await this.csv.first().fill(csv);
    await this.nameOnCard.last().fill(nameOnCard);

}

async searchCountryAndSelect (countryCode){

    await this.selectCountry.pressSequentially(countryCode, { delay: 150 });
    await this.countryText.click();
}

async applyCoupon (couponCode){

    await this.coupon.fill(couponCode);
    await this.ApplycouponBtn.click({ timeout: 10_000 });
}

async submitandGetOrderID()
{
    await this.placeOrder.click();
    await expect (this.thankUMsg).toHaveText(" Thankyou for the order. ");
    await expect (this.thankUMsg).toBeVisible();
    console.log(await this.thankUMsg.innerText());


    this.orderId = await this.orderIdLocator.textContent();
    console.log(await this.orderId);
    await this.orderBtnLocator.click();
    await this.tbody.waitFor(); 


    const rows = this.tbodyTable;
    for (let i = 0; i < await rows.count(); ++i){
       const orderIdNum = await rows.nth(i).locator("th").textContent();
       if (this.orderId.includes(orderIdNum))
       {
        console.log("orderID = orderIdNum");
        await rows.nth(i).locator("button").nth(0).click();
        break;
       }
    }
}

async checkOrder (){

    
    await this.orderBtnLocator.waitFor();
    const orderIdDetailsText = await this.OrderIdDetails.textContent();
    expect(this.orderId.includes(orderIdDetailsText)).toBeTruthy();
    console.log(orderIdDetailsText);
}


}
module.exports = {Checkout};