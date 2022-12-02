import { BeveragePage } from '../page-object/beverage.page';
import { HomePage } from '../page-object/home.page';
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');
const { parse } = require('csv-parse/sync');

const records = parse(fs.readFileSync(path.join(__dirname, '../resources/sample.csv')), {
    columns: true,
    skip_empty_lines: true
});

for (const record of records) {
    test.afterEach(async ({ page }) => {
        await page.close();
    });

    test(`Verify the brand href, category name, and filters for @${record.beverages_type} on the PLP page`, async ({ page }) => {

        const homePage = new HomePage(page);
        const beveragePage = new BeveragePage(page);

        await homePage.launchDaraz();
        await homePage.notInterestedAlert.click();
        await homePage.groceriesAndPets.click();
        await homePage.clickOnBeverageType(record.beverages_type);
        await beveragePage.verifyCategoryName(record.category);
        await beveragePage.verifyBrandHref(record.brands_href);
        await beveragePage.applyBrandFilters(record.brands);

    })
}