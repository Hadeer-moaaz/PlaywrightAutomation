const {expect} = require('@playwright/test');

class OrderHistoryPage {

    constructor(page, checkout){

        this.page = page;
        this.checkout = checkout;
        this.OrderIdDetails = page.locator('.col-text');
        this.orderBtnLocator = page.locator('button[routerlink="/dashboard/myorders"]');

    }

    async getOrderId(){

        await this.orderBtnLocator.waitFor();
        const orderIdDetailsText = await this.OrderIdDetails.textContent();
        expect(this.checkout.orderId.includes(orderIdDetailsText)).toBeTruthy();
        console.log(orderIdDetailsText);

    }

    async searchProductAddCart(productName)
{
   
    const titles= await this.productsText.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for(let i =0; i < count; ++i)
    {
    if(await this.products.nth(i).locator("b").textContent() === productName)
    {
        //add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
     }
    }
}

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart()
{
    await this.cart.click();
}

}
module.exports = {OrderHistoryPage};