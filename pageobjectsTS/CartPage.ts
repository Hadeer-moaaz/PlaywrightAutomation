import {Locator, Page, expect} from '@playwright/test';

export class CartPage {

    page :Page;
    allItems : Locator;
    checkoutBtn : Locator;

constructor (page: Page){

    this.page = page;
    this.allItems = page.locator('div li');
    this.checkoutBtn = page.getByRole("button", {name: "Checkout"});

}

async VerifyProductIsDisplayed (productName: string){
    await this.allItems.first().waitFor(); 
    const bool =await this.getProductLocator(productName).isVisible();
    expect(bool).toBeTruthy();
}
async Checkout (){
    await this.checkoutBtn.click();
}
getProductLocator(productName: string)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}
}
module.exports = {CartPage};