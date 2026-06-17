import { fixtures as test } from '../fixtures.js';
import { expect } from '@playwright/test';

test('Retail Flow: Search and Add to Cart', async ({ loginPage, searchPage, addToCartPage, page }) => {
  // Using environment variables for URL and Credentials
  const url = process.env.UI_URL || 'https://default-url.com';
  const user = process.env.UI_USERNAME!;
  const pass = process.env.UI_PASSWORD!;

  await loginPage.navigateTo(url);
  await loginPage.login(user, pass);
  
  await searchPage.search('Laptop');
  await addToCartPage.addToCart('Laptop');
  
  await expect(page.locator('.cart-count')).toHaveText('1');
});