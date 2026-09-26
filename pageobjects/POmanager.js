const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {Checkout} = require('./Checkout');
const {OrderHistoryPage} = require('./OrderHistoryPage');



class POmanager {

    constructor(page){
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