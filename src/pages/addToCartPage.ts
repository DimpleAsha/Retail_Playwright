import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage.js';

export class AddToCartPage extends BasePage {
  
  async addToCart(item: string) {
    const productCard = this.page.locator('.product-card', { hasText: item });
    const addToCartBtn = productCard.getByRole('button', { name: /add to cart/i });
    await this.clickElement(addToCartBtn);
  }
}