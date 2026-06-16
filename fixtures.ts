import { test as base } from '@playwright/test';
import { LoginPage } from './src/pages/loginPage.js';
import { AddToCartPage } from './src/pages/addToCartPage.js';
import { SearchPage } from './src/pages/searchPage.js';
import { setupNetworkInterception } from './utils/network.js';

export const fixtures = base.extend<{ loginPage: LoginPage; addToCartPage: AddToCartPage; searchPage: SearchPage }>({
  page: async ({ page }, use) => {
    await setupNetworkInterception(page);
    await use(page);
  },
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  addToCartPage: async ({ page }, use) => await use(new AddToCartPage(page)),
  searchPage: async ({ page }, use) => await use(new SearchPage(page)),
});
