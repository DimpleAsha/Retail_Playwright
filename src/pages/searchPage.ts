
import { BasePage } from './basePage.js';

export class SearchPage extends BasePage {
  private get searchInput() { 
    return this.page.getByRole('searchbox', { name: /search/i }); 
  }
  async search(item: string) {
    await this.fillFields(this.searchInput, item);
    await this.page.keyboard.press('Enter');
  }
}
