import { test, expect } from '@playwright/test';
import { randomString } from './utils/fake-data';
import { LoginPage } from './pages/LoginPage';

test.describe('Sign in', () => {

  test('successful login with valid credentials redirects to inventory', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
  });

  test('unsuccessful login with invalid credentials shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
  });

  test('empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', '');
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
  });

  test('random username and password', async ({ page }) => {

    const randomUsername = randomString();
    const randomPassword = randomString(25);

    await test.info().attach('credentials', {
      body: JSON.stringify({ username: randomUsername, password: randomPassword }),
      contentType: 'application/json',
    });

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(randomUsername, randomPassword);
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });
})

test.describe('cart', () => {

  test('add sauce labs backpack to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });

  test('remove sauce labs backpack from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeAttached();
  });

})
