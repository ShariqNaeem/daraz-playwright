const { expect } = require('@playwright/test');
exports.BeveragePage = class BeveragePage {

    constructor(page) {
        this.page = page;
        this.categoryName = page.locator('div[data-spm="filter"] div.filter-panel--ghwYA:first-child a');
        this.brandViewMore = page.locator('//div[@data-spm="filter"]/div[2]//div[contains(text(),"View More")]')
        this.clearAllFilter = page.locator('//div/span[contains(text(),"CLEAR ALL")]');
        this.filterTitle = page.locator('h1.title--Xj2oo');
    }

    async verifyCategoryName(exp_category) {
        await this.page.waitForLoadState('networkidle');
        await expect(this.categoryName).toContainText(exp_category)
    }

    async verifyBrandHref(expected_brands) {
        if (expected_brands.includes(':')) {
            let brands = expected_brands.split(':')
            for (let i = 0; i < brands.length; i++) {
                const selector = this.page.locator(`div[data-spm="card"] a[href*="${brands[i]}"]`);
                await expect.soft(selector).toBeVisible();

            }
        }
    }

    async applyBrandFilters(brandList) {
        let brands = brandList.split(':')
        //for (let i = 0; i < brands.length; i++) {
        for (let i = 0; i < 5; i++) {
            const selector = this.page.locator(`//span[contains(text(),"${brands[i]}")]`);
            await this.page.waitForTimeout(3000)
            await this.brandViewMore.click();
            await selector.click();
            await expect(this.filterTitle).toContainText(brands[i])
            await this.clearAllFilter.click();
        }
    }
}
