import { Page } from "@playwright/test";

export class CartPage {
    
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://www.saucedemo.com/cart.html');
    }
}