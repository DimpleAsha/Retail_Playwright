import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByRole('textbox', { name: /email/i });
    this.password = page.getByLabel(/password/i);
    this.loginBtn = page.getByRole('button', { name: /login/i });
  }

  async login(user: string, pass: string) {
    await this.fillFields(this.username, user);
    await this.fillFields(this.password, pass);
    await this.clickElement(this.loginBtn);
  }
}