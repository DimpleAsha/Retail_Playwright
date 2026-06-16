
import { BasePage } from './basePage.js';

export class AddToCartPage extends BasePage {
  async addToCart(item: string) {
    await this.clickElement(this.page.locator(`text=${item} >> .. >> button`));
  }
}
