import {Locator, Page} from '@playwright/test';

export class LoginPage {

    page : Page;
    userName : Locator;
    password : Locator;
    signInbutton : Locator;

    constructor(page: Page)
    {
        this.page = page;
    
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInbutton= page.locator("[value='Login']");
    
    }
    
    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
    
    async validLogin(username: string ,password: any)
    {
         await  this.userName.fill(username);
         await this.password.fill(password);
         await this.signInbutton.click();
         await this.page.waitForLoadState('networkidle');
         
    
    }
    
    }
module.exports = {LoginPage};