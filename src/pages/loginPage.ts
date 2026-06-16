import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
  private get email() { return this.page.locator('#email'); }
  async login(user: string, pass: string) {
    await this.fillFields(this.email, user);
    await this.fillFields(this.page.locator('#pwd'), pass);
    await this.clickElement(this.page.locator('#login-btn'));
  }
}