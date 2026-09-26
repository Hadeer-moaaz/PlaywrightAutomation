class DashboardPage {

    constructor(page){

        this.page = page; 
        this.products = page.locator('.card-body');
        this.productsText = page.locator(".card-body b");
        this.cart = page.getByRole("listitem").getByRole('button', {name: "Cart"})
        this.orders = page.locator("button[routerlink*='myorders']");

        
        
    }

async searchProductAddCart(productName){
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
}

module.exports = {DashboardPage};