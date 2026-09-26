import {Locator, Page} from '@playwright/test';

export class DashboardPage {

    page : Page;
    products : Locator;
    cart : Locator;
    productsText : Locator;
    orders : Locator;

    constructor(page: Page){

        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart =  page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        
        
    }

async searchProductAddCart(productName: string){
        await this.products.first().waitFor();
        console.log(await this.products.first().textContent());
        console.log(await this.products.allTextContents());
        
        
            await this.products
                        .filter({hasText: productName})
                        .getByRole("button", {name: " Add To Cart"})
                        .click();               
    }

async navigateToOrders()
{
    await this.orders.click();
}


async navigateToCart ()
    {
        await this.cart.click();
    }
};

module.exports = {DashboardPage};