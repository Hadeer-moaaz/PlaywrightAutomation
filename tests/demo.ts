import { Locator, Page } from "@playwright/test";

let message1 : string = "Hello" ;
message1 = "Bye";
console.log(message1);

let age1 : number = 20;
console.log(age1);

let isActive1 : boolean = false;

let numbers1 : number[] = [1,2,3];

let data : any = "this could be any data type"
data = 33;

function add1 (a: number,b: number){

    return a+b;

}
add1 (2,3);

let user1: {name: string, age: number, location: string} = {name: "Ahmed", age: 6, location: "Alex"};
console.log(user1);
console.log(user1.location);
user1.location = "cairo";
console.log(user1.location);


class OrderHistoryPage {


    page: Page;
    checkout: any;
    OrderIdDetails: Locator;
    orderBtnLocator: Locator;

    constructor(page: any, checkout: any){

        this.page = page;
        this.checkout = checkout;
        this.OrderIdDetails = page.locator('.col-text');
        this.orderBtnLocator = page.locator('button[routerlink="/dashboard/myorders"]');

    }
}