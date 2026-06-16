
import { BasePage } from './basePage.js';

export class SearchPage extends BasePage {
  async search(item: string) {
    await this.fillFields(this.page.locator('input[name="q"]'), item);
    await this.page.keyboard.press('Enter');
  }
}
