const {expect} = require ('@playwright/test');

class CartPage {
constructor (page){

    this.page = page;
    this.allItems = page.locator('div li');
    this.checkoutBtn = page.getByRole("button", {name: "Checkout"});

}

async VerifyProductIsDisplayed (productName){
    await this.allItems.first().waitFor(); 
    const bool =await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
}
async Checkout (){
    await this.checkoutBtn.click();
}
getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}
}
module.exports = {CartPage};