const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
testDataForOrder :   {
    username : "SuzyRoshdy4@gamil.com",
    password : "Dede@2020",
    productName:"ADIDAS ORIGINAL"

    }

}

)