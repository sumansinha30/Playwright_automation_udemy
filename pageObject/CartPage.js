const { test, expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.firstCartProduct = page.locator("div li").first();
    this.checkoutBtn = page.locator("text=Checkout");
    this.cartProduct = page.locator(".cartSection h3");
  }

  async WaitForCartItemsToLoad() {
    await this.firstCartProduct.waitFor();
  }

  async checkProductInCart(product) {
    const bool = await this.cartProduct.isVisible();
    expect(bool).toBeTruthy();
    await expect(this.cartProduct).toHaveText(product);
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }
}

module.exports = { CartPage };
