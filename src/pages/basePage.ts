import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path: string = '') {
    console.log(`Navigating to: ${path}`);
    await this.page.goto(path);
  }

  async fillFields(locator: Locator, text: string) {
    // locator assertion
    await locator.waitFor({ state: 'attached' }); 
    await locator.scrollIntoViewIfNeeded(); // hidden or out-of view elements
    await locator.fill(text);
  }

  async clickElement(locator: Locator) {
    // locator assertion
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }
}