import { BasePage } from './basePage.js';

export class LoginPage extends BasePage {
  private get emailInput() { 
    return this.page.getByRole('textbox', { name: /email/i }); 
  }
  private get passwordInput() { 
    return this.page.getByLabel(/password/i); 
  }
  private get loginButton() { 
    return this.page.getByRole('button', { name: /login/i }); 
  }

  async login(user: string, pass: string) {
    await this.fillFields(this.emailInput, user);
    await this.fillFields(this.passwordInput, pass);
    await this.clickElement(this.loginButton);
  }
}