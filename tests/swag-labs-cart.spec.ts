import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { CartPage } from './pages/CartPage';

test.describe('cart', () => {

  test('add sauce labs backpack to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    const cartPage = new CartPage(page);
    await cartPage.addToCart('add-to-cart-sauce-labs-backpack');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('remove sauce labs backpack from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    const cartPage = new CartPage(page);
    await cartPage.addToCart('add-to-cart-sauce-labs-backpack');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await cartPage.removeFromCart('remove-sauce-labs-backpack');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeAttached();
  });

  test('full purchase flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    const cartPage = new CartPage(page);
    await cartPage.addToCart('add-to-cart-sauce-labs-backpack');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await cartPage.fillFirstnameLastnameZip('John', 'Doe', '12345');
    await page.click('[data-test="continue"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
    await page.click('[data-test="finish"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    await expect(page.locator('[data-test="back-to-products"]')).toHaveText('Back Home');
    await page.click('[data-test="back-to-products"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

})


