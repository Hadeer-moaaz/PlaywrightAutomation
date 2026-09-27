# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI_Testing\letsShop\Login&CreateOrderPO.spec.js >> @web Client APP login ZARA COAT 3
- Location: tests\UI_Testing\letsShop\Login&CreateOrderPO.spec.js:11:1

# Error details

```
TimeoutError: page.goto: Timeout 30000ms exceeded.
Call log:
  - navigating to "https://rahulshettyacademy.com/client", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - generic: Ecom
      - generic [ref=e9]:
        - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
          - /url: emailto:dummywebsite@rahulshettyacademy.com
          - generic [ref=e12]: 
          - text: dummywebsite@rahulshettyacademy.com
        - generic [ref=e13]:
          - link "" [ref=e14] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e16] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e18] [cursor=pointer]:
            - /url: "#"
          - link "" [ref=e20] [cursor=pointer]:
            - /url: "#"
  - generic [ref=e22]:
    - generic [ref=e23]:
      - heading "We Make Your Shopping Simple" [level=3]
      - heading [level=1] [ref=e24]:
        - text: Practice Website for
        - emphasis [ref=e25]: Rahul Shetty Academy
        - text: Students
      - link "Register" [ref=e26] [cursor=pointer]:
        - /url: "#/auth/register"
    - generic [ref=e28]:
      - paragraph [ref=e29]:
        - generic [ref=e30]: Register to sign in with your personal account
      - generic [ref=e31]:
        - heading "Log in" [level=1] [ref=e32]
        - generic [ref=e33]:
          - generic [ref=e34]:
            - generic [ref=e35]: Email
            - textbox "email@example.com" [ref=e36]
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [ref=e39]
          - button "Login" [ref=e40] [cursor=pointer]
        - link "Forgot password?" [ref=e41] [cursor=pointer]:
          - /url: "#/auth/password-new"
        - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
  - generic [ref=e43]:
    - heading "Why People Choose Us?" [level=1] [ref=e46]
    - generic [ref=e47]:
      - generic [ref=e48]:
        - generic [ref=e49]: 
        - generic [ref=e51]:
          - heading "3546540" [level=1]
          - paragraph [ref=e52]: Successfull Orders
      - generic [ref=e53]:
        - generic [ref=e54]: 
        - generic [ref=e56]:
          - heading "37653" [level=1]
          - paragraph [ref=e57]: Customers
      - generic [ref=e58]:
        - generic [ref=e59]: 
        - generic [ref=e61]:
          - heading "3243" [level=1]
          - paragraph [ref=e62]: Sellers
    - generic [ref=e63]:
      - generic [ref=e64]:
        - generic [ref=e65]: 
        - generic [ref=e67]:
          - heading "4500+" [level=1]
          - paragraph [ref=e68]: Daily Orders
      - generic [ref=e69]:
        - generic [ref=e70]: 
        - generic [ref=e72]:
          - heading "500+" [level=1]
          - paragraph [ref=e73]: Daily New Customer Joining
```

# Test source

```ts
  1  | class LoginPage {
  2  | 
  3  |     constructor(page)
  4  |     {
  5  |         this.page = page;
  6  |     
  7  |         this.userName = page.locator("#userEmail");
  8  |         this.password = page.locator("#userPassword");
  9  |         this.signInbutton= page.locator("[value='Login']");
  10 |     }
  11 |     
  12 |     async goTo()
  13 |     {
> 14 |         await this.page.goto("https://rahulshettyacademy.com/client");
     |                         ^ TimeoutError: page.goto: Timeout 30000ms exceeded.
  15 |     }
  16 |     
  17 |     async validLogin(username,password)
  18 |     {
  19 |          await this.userName.fill(username);
  20 |          await this.password.fill(password);
  21 |          await this.signInbutton.click();
  22 |         // await this.page.waitForLoadState('networkidle');
  23 |          await this.page.waitForSelector('.card-body', { state: 'visible', timeout: 15000 }); // confirm dashboard actually rendered
  24 |     
  25 |     }
  26 | 
  27 | async invalidLogin(username, password)
  28 | {
  29 |     await this.userName.fill(username);
  30 |     await this.password.fill(password);
  31 |     const toast = this.page.getByText("Incorrect email or password").first();
  32 |     const toastShown = toast.waitFor({ state: 'visible', timeout: 10000 });
  33 |     const [response] = await Promise.all([
  34 |         this.page.waitForResponse(r => r.request().method() === 'POST'),
  35 |         this.signInbutton.click()
  36 |     ]);
  37 | 
  38 |     await toastShown;
  39 |     await this.page.screenshot({ path: 'after-click.png', fullPage: true });
  40 |     return { status: response.status(), message: await toast.textContent() };
  41 | }
  42 | 
  43 |     }
  44 | module.exports = {LoginPage};
```