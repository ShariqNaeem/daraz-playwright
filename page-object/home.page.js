exports.HomePage = class HomePage {

    constructor(page) {
        this.page = page;
        this.notInterestedAlert = page.locator('button[class="airship-btn airship-btn-deny"]');
        this.groceriesAndPets = page.locator('#Level_1_Category_No6');
    }

    async launchDaraz() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnBeverageType(name) {
        await this.page.locator('ul[data-spm="cate_1"] li[data-cate="cate_1_1"]').hover();
        let selector = `//ul[@data-spm="cate_1_1"]/li[@class="lzd-site-menu-grand-item"]/a/span[contains(text(),"${name}")]`
        await this.page.locator(selector).click();
        //await this.page.waitForTimeout(5000)

    }
}
