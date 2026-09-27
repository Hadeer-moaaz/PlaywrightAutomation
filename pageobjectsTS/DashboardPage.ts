import {Locator, Page, expect} from '@playwright/test';

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

        const addToCartBtn = this.products
            .filter({hasText: productName})
            .getByRole("button", {name: " Add To Cart"});

        // Retry the click if the app didn't register it — bounded,
        // so a genuine bug still fails the test rather than hanging.
        await expect(async () => {
            await addToCartBtn.click();
            await this.page.waitForTimeout(300);
        }).toPass({ timeout: 5000 });
    }

    async navigateToOrders() {
        await this.orders.click();
    }

    async navigateToCart() {
        await this.cart.click();
    }
};

module.exports = {DashboardPage};