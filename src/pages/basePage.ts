import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path:string=''){
    await this.page.goto(path)
  }

  async fillFields(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }
}
