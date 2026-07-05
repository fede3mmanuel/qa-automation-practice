import { Page } from "@playwright/test";

export class CartPage {

    constructor(private page: Page) {}

    async addToCart(dataTestId: string) {
        await this.page.click(`[data-test="${dataTestId}"]`);
    }

    async removeFromCart(dataTestId: string) {
        await this.page.click(`[data-test="${dataTestId}"]`);
    }

    async fillFirstnameLastnameZip(firstName: string, lastName: string, zipCode: string) {
        await this.page.fill('[data-test="firstName"]', firstName);
        await this.page.fill('[data-test="lastName"]', lastName);
        await this.page.fill('[data-test="postalCode"]', zipCode);
    }
}