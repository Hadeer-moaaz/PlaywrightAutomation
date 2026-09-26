# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_Testing\fixturesDemo.spec.js >> @API Fixtures Demo
- Location: tests\API_Testing\fixturesDemo.spec.js:4:1

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[value=\'Login\']')
    - locator resolved to <input id="login" name="login" type="submit" value="Login" _ngcontent-ntx-c43="" class="btn btn-block login-btn"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable

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
            - textbox "email@example.com" [ref=e36]: SuzyRoshdy5@gamil.com
          - generic [ref=e37]:
            - generic [ref=e38]: Password
            - textbox "enter your passsword" [active] [ref=e39]: Dede@2020
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
  1  | const base = require('@playwright/test');
  2  | const {request} = require('@playwright/test');
  3  | 
  4  | const {APiUtils} = require ('../utils/APiUtils');
  5  | const loginPayLoad = {userEmail:"SuzyRoshdy5@gamil.com",userPassword:"Dede@2020"};
  6  | const orderPayLoad  = {orders:[{"country":"Turkey",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
  7  | 
  8  | exports.customtest = base.test.extend(
  9  |     {
  10 |     authenticationPage : async({browser}, use)=>{
  11 | 
  12 |         const context = await browser.newContext();
  13 |         const page = await context.newPage();
  14 |         await page.goto("https://rahulshettyacademy.com/client");
  15 |         await page.locator("#userEmail").fill("SuzyRoshdy5@gamil.com");
  16 |         await page.locator("#userPassword").fill("Dede@2020");
> 17 |         await page.locator("[value='Login']").click();
     |                                               ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  18 |         await page.waitForLoadState('networkidle');
  19 |         await use(page);
  20 |     },
  21 | 
  22 |     createOrder : async({}, use )=> {
  23 |         const apiContext = await request.newContext();
  24 |         const apiUtils = new APiUtils(apiContext,loginPayLoad);
  25 |         const response =  await apiUtils.createOrder(orderPayLoad);
  26 |         await use(response);  //teardown
  27 |     },
  28 | 
  29 |     testDataForOrder : {
  30 |         productName : 'ADIDAS ORIGINAL'
  31 |     }
  32 | 
  33 | });
```