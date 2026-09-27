const {expect} = require('@playwright/test');

class OrderHistoryPage {

    constructor(page, checkout){
        this.page = page;
        this.checkout = checkout;
        this.OrderIdDetails = page.locator('.col-text');
        this.orderBtnLocator = page.locator('button[routerlink="/dashboard/myorders"]');
    }

    async getOrderId(){
        await this.OrderIdDetails.first().waitFor({ state: 'visible', timeout: 15000 });
        await expect(this.OrderIdDetails.first()).toContainText(this.checkout.orderId, { timeout: 15000 });
    }
}
module.exports = {OrderHistoryPage};