// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './src/pages/loginPage.js';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // in case of missing environment variables
  const user = process.env.USER;
  const pass = process.env.PASS;
  if (!user || !pass) {
    throw new Error('Environment variables USER and PASS must be defined');
  }
  //once env variables are correct then proceed with login-aseert and save storage state
  await page.goto('/login');
  await loginPage.login(user, pass);
  await expect(page).toHaveURL(/.*dashboard/);
  await expect(page.getByText(/welcome/i)).toBeVisible();
  await page.context().storageState({ path: authFile });
});