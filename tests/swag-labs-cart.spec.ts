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

})
