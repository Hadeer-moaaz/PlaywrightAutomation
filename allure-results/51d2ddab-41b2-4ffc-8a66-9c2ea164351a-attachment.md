# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI_Testing\letsShop\Register.spec.js >> Register to website with valid data
- Location: tests\UI_Testing\letsShop\Register.spec.js:5:1

# Error details

```
TimeoutError: locator.textContent: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[class="headcolor"]')

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
    - generic [ref=e29]:
      - heading "Register" [level=1] [ref=e30]
      - generic [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e34]:
            - generic [ref=e35]: First Name
            - textbox "First Name" [ref=e36]: Suzy
          - generic [ref=e38]:
            - generic [ref=e39]: Last Name
            - textbox "Last Name" [ref=e40]: Roshdy
        - generic [ref=e41]:
          - generic [ref=e42]:
            - generic [ref=e43]: Email
            - textbox "email@example.com" [ref=e44]: SuzyRoshdy6@gamil.com
          - generic [ref=e45]:
            - generic [ref=e46]: Phone Number
            - textbox "enter your number" [ref=e47]: "1234567890"
        - generic [ref=e48]:
          - generic [ref=e49]:
            - generic [ref=e50]: Occupation
            - combobox [ref=e51]:
              - option "Choose your occupation" [disabled] [selected]
              - option "Doctor"
              - option "Student"
              - option "Engineer"
              - option "Scientist"
          - generic [ref=e52]:
            - generic [ref=e53]: Gender
            - generic [ref=e54]:
              - radio "Male" [ref=e55]
              - text: Male
            - generic [ref=e56]:
              - radio "Female" [checked] [ref=e57]
              - text: Female
        - generic [ref=e58]:
          - generic [ref=e59]:
            - generic [ref=e60]: Password
            - textbox "Passsword" [ref=e61]: Dede@2020
          - generic [ref=e62]:
            - generic [ref=e63]: Confirm Password
            - textbox "Confirm Password" [ref=e64]:
              - /placeholder: Confirm Passsword
              - text: Dede@2020
        - generic [ref=e65]:
          - checkbox [checked] [ref=e67]
          - generic [ref=e68]: I am 18 year or Older
        - button "Register" [active] [ref=e69] [cursor=pointer]
      - paragraph [ref=e70] [cursor=pointer]: Already have an account? Login here
  - generic [ref=e71]:
    - heading "Why People Choose Us?" [level=1] [ref=e74]
    - generic [ref=e75]:
      - generic [ref=e76]:
        - generic [ref=e77]: 
        - generic [ref=e79]:
          - heading "3546540" [level=1]
          - paragraph [ref=e80]: Successfull Orders
      - generic [ref=e81]:
        - generic [ref=e82]: 
        - generic [ref=e84]:
          - heading "37653" [level=1]
          - paragraph [ref=e85]: Customers
      - generic [ref=e86]:
        - generic [ref=e87]: 
        - generic [ref=e89]:
          - heading "3243" [level=1]
          - paragraph [ref=e90]: Sellers
    - generic [ref=e91]:
      - generic [ref=e92]:
        - generic [ref=e93]: 
        - generic [ref=e95]:
          - heading "4500+" [level=1]
          - paragraph [ref=e96]: Daily Orders
      - generic [ref=e97]:
        - generic [ref=e98]: 
        - generic [ref=e100]:
          - heading "500+" [level=1]
          - paragraph [ref=e101]: Daily New Customer Joining
```

# Test source

```ts
  1  | const {test, expect} = require ('@playwright/test');
  2  | 
  3  | 
  4  | 
  5  | test('Register to website with valid data', async({page})=>
  6  | {
  7  |     const registerBtn = page.locator('a.btn1');
  8  |     const firstname = page.locator('#firstName');
  9  |     const lastname = page.locator('#lastName');
  10 |     const email = page.locator('#userEmail');
  11 |     const mobile = page.locator('#userMobile');
  12 |     const gender = page.locator('[value="Female"]');
  13 |     const password = page.locator('#userPassword');
  14 |     const confirmPassword = page.locator('#confirmPassword');
  15 |     const older = page.locator('[formcontrolname="required"]');
  16 |     const registerBtn2 = page.locator('#login');
  17 |     const RegsuccessMsg = page.locator('[class="headcolor"]');
  18 |     const loginBtn = page.locator('[class="btn btn-primary"]');
  19 |     const login = page.locator('#login');
  20 |     const adidasLocator = page.locator('.card-body b');
  21 | 
  22 |     
  23 | await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  24 | console.log(await page.title());
  25 | await expect(page).toHaveTitle("Let's Shop");
  26 | 
  27 | await registerBtn.click();
  28 | await firstname.fill("Suzy");
  29 | await lastname.fill("Roshdy");
  30 | await email.fill("SuzyRoshdy6@gamil.com");
  31 | await mobile.fill("1234567890");
  32 | await gender.click();
  33 | await password.fill("Dede@2020");
  34 | await confirmPassword.fill("Dede@2020");
  35 | await older.click();
  36 | await registerBtn2.click();
  37 | 
> 38 | console.log(await RegsuccessMsg.textContent());
     |                                 ^ TimeoutError: locator.textContent: Timeout 10000ms exceeded.
  39 | await expect(RegsuccessMsg).toContainText('Account Created Successfully');
  40 | 
  41 | await loginBtn.click();
  42 | await email.fill("SuzyRoshdy6@gamil.com");
  43 | await password.fill("Dede@2020");
  44 | await login.click();
  45 | console.log(await adidasLocator.first().textContent());
  46 | console.log(await adidasLocator.allTextContents());
  47 | await expect(adidasLocator).toContainText('ADIDAS ORIGINAL');
  48 | 
  49 | // await page.pause();
  50 | 
  51 | });
```