const {expect} = require('@playwright/test');

class CartPage {
    constructor(page){
        this.page = page;
        this.allItems = page.locator('div li');
        this.checkoutBtn = page.getByRole("button", {name: "Checkout"});
    }

    async VerifyProductIsDisplayed(productName){
        await expect(this.allItems.first()).toBeVisible({ timeout: 10000 });
        await expect(this.getProductLocator(productName)).toBeVisible();
    }

    async Checkout(){
        await this.checkoutBtn.click();
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('"+productName+"')");
    }
}
module.exports = {CartPage};