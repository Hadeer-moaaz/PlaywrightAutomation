import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import {Checkout} from './Checkout';
import {OrderHistoryPage} from './OrderHistoryPage';
import { Page } from '@playwright/test';

export class POmanager {

        page : Page;
        loginPage : LoginPage;
        dashboardPage : DashboardPage;
        cartPage : CartPage;
        checkout :  Checkout;
        orderHistoryPage :  OrderHistoryPage;

    constructor(page: Page){
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkout = new Checkout(this.page);
        this.orderHistoryPage = new OrderHistoryPage(this.page, this.checkout);

    }

getLoginPage ()
    {return this.loginPage;}

getDashboardPage ()
    {return this.dashboardPage;}

getCartPage ()
    {return this.cartPage;}

getCheckoutPage ()
    {return this.checkout;}
getOrderHistoryPage ()
    {return this.orderHistoryPage;}
    
}
module.exports = {POmanager};