class LoginPage {

    constructor(page)
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
    
    async validLogin(username,password)
    {
         await this.userName.fill(username);
         await this.password.fill(password);
         await this.signInbutton.click();
        // await this.page.waitForLoadState('networkidle');
         await this.page.waitForSelector('.card-body', { state: 'visible', timeout: 15000 }); // confirm dashboard actually rendered
    
    }

async invalidLogin(username, password)
{
    await this.userName.fill(username);
    await this.password.fill(password);
    const toast = this.page.getByText("Incorrect email or password").first();
    const toastShown = toast.waitFor({ state: 'visible', timeout: 10000 });
    const [response] = await Promise.all([
        this.page.waitForResponse(r => r.request().method() === 'POST'),
        this.signInbutton.click()
    ]);

    await toastShown;
    await this.page.screenshot({ path: 'after-click.png', fullPage: true });
    return { status: response.status(), message: await toast.textContent() };
}

    }
module.exports = {LoginPage};