import { Page } from "@playwright/test";

export class CartPage {

    constructor(private page: Page) {}

    async addToCart(dataTestId: string) {
        await this.page.click(`[data-test="${dataTestId}"]`);
    }

    async removeFromCart(dataTestId: string) {
        await this.page.click(`[data-test="${dataTestId}"]`);
    }
}