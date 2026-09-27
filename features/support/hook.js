const {After, Before, AfterStep, BeforeStep, Status} = require('@cucumber/cucumber');
const {POmanager} = require('../../pageobjects/POmanager');
const { chromium } = require('playwright');

Before(async function () {

        this.browser = await chromium.launch({ headless: process.env.CI ? true : false });
        this.context = await this.browser.newContext();
        this.page =  await  this.context.newPage();
        this.pomanager = new POmanager(this.page);

});


After(function () {

    // console.log("Execution is done succesfully")
  });


BeforeStep({tags: "@foo"}, function () {
});

AfterStep( async function ({result}) {

  if (result.status === Status.FAILED) {
    await this.page.takeScreenshot({path: 'screenshoot1.png'});
  }
});