import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test.describe('Accessibility tests', () => {

  test.beforeEach('Console logs', async ({ page }, testInfo) => {

      page.on('console', async msg => {
      const values = [];
      for (const arg of msg.args())
        values.push(await arg.jsonValue());
      console.log(...values);

      if (values.length > 0) {

        await testInfo.attach('Console Logs', { body: JSON.stringify(values, null, 2),
        contentType: 'application/json' });

      }
    });

  });

  test('Home page: Should not have any automatically detectable accessibility issues', async ({ page }, testInfo) => {
    await page.goto('https://www.saucedemo.com/'); 

    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json'
    });

    expect(accessibilityScanResults.violations).toEqual([]); 

    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
  });

  test('Inventory page: Should not have any automatically detectable accessibility issues', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

    expect.soft(accessibilityScanResults.violations).toEqual([]); 
  });

  test('Cart page: Should not have any automatically detectable accessibility issues', async ({ page }) => {

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

    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();

    expect.soft(accessibilityScanResults.violations).toEqual([]); 
  });
});


