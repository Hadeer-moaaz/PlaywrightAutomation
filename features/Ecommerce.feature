Feature: Ecommerce Validations

   Background:
   Given user go to "https://rahulshettyacademy.com/client/"


   @Regression
   Scenario Outline: Placing the Order
   When user login to Ecommerce application with "<username>" and "<password>"
   Then Title has "<title>" text 
   When add "<productName>" to Cart
   Then Verify "<productName>" is displayed in the Cart
   When Enter valid details and place the Order
   Then Verify Order is present in the OrderHistory

    Examples:
   | username              | password    | productName | title |
   | SuzyRoshdy6@gamil.com | Dede@2020   | ZARA COAT 3 | Let's Shop |


   @Validation
   Scenario Outline: Placing the Order
   When user login to with invalid credentials to the application with "<username>" and "<password>"
   Then Verify error message is displayed

    Examples:
    | username              | password    |
    | SuzyRoshdy2@gamil.com | wrongpassword |


