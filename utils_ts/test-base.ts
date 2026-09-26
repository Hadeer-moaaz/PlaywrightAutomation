import {test as baseTest} from '@playwright/test';


interface testDataForOrder {
    username: string;
    password: string;
    productName: string;
}; 

export const customTest = baseTest.extend <{testDataForOrder: testDataForOrder}>(
{
testDataForOrder :   {
    username : "SuzyRoshdy4@gamil.com",
    password : "Dede@2020",
    productName:"ADIDAS ORIGINAL"
    
    }

}

)