import { fixtures as test } from '../fixtures.js';
import {expect} from '@playwright/test'

test('Retail Flow: Search and Add to Cart', async ({ loginPage, searchPage, addToCartPage, page }) => {
  await loginPage.navigateTo('/login');
  await loginPage.login('user@test.com', 'securePass');
  await searchPage.search('Laptop');
  await addToCartPage.addToCart('Laptop');
  await expect(page.locator('.cart-count')).toHaveText('1');
});
