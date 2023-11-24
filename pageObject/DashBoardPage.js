class DashBoardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productTitles = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async getProductsTitles() {
    const titles = await this.productTitles.allTextContents();
    console.log(titles);
  }

  async searchProductAddCart(productName) {
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      if (await this.products.nth(i).locator("b").textContent() === productName) {
        await this.products.nth(i).locator("text='Add To Cart'").click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }
}

module.exports = { DashBoardPage };
