import { test, expect } from '@playwright/test';

const ExcelJs = require('exceljs');

async function WriteExcel(searchText, replaceText , change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = readExcel(worksheet, searchText); //not async


const cell = worksheet.getCell(output.row, output.column + change.colChange);
cell.value = replaceText; // replace the value
await workbook.xlsx.writeFile(filePath); // save file
}


function readExcel(worksheet, searchText){   //independent funtion 
    let output = {row:-1 , column:-1};
    worksheet.eachRow((row, rowNumber) =>
        {
                row.eachCell((cell, colNumber)   => {
                    //console.log(cell.value);
                    if (cell.value === searchText)
                    {      
                        output.row = rowNumber;
                        output.column = colNumber;
                        console.log(rowNumber);
                        console.log(colNumber);
                        console.log(cell.value);
                    }
                })
        })
        return output;
}

test('Upload Download excel Validations', async ({page})=> 
{

    const TextSearch = 'Mango';
    const updateValue = '350';
    const filePath = "C:/Users/Hp/Downloads/download";

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    const download = await downloadPromise;
    await download.saveAs(filePath); // <-- explicitly save it to your chosen path

    // await downloadPromise;
    await WriteExcel(TextSearch, updateValue, {rowChange:0,colChange:2} ,filePath);
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles("C:/Users/Hp/Downloads/download");
    const textLocator = page.getByText(TextSearch);
    const desierdRow = page.getByRole('row').filter({has: textLocator});
    expect(desierdRow.locator('#cell-4-undefined')).toContainText(updateValue);
})
