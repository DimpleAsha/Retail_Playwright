import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage.js';

export class SearchPage extends BasePage {
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByRole('searchbox', { name: /search/i });
  }

  async search(item: string) {
    await this.fillFields(this.searchInput, item);
    await this.page.keyboard.press('Enter');
  }
}