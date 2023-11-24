class OrdrerHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersList = page.locator("tr.ng-star-inserted");
    this.orderSummary = page.locator(".email-container .row");
    this.odrerId = page.locator("[class='col-text -main']");
  }

  async loadLastOrder() {
    await this.ordersList.last().waitFor();
  }

  async viewOrderDetails(orderId) {
    const order_counts = await this.ordersList.count();
    console.log(order_counts);
    for (let i = 0; i < order_counts; ++i) {
      if (orderId.includes(await this.ordersList.nth(i).locator("th").textContent())) {
        this.ordersList.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async waitForOrderSummaryToLoad() {
    await this.orderSummary.last().waitFor();
  }

  async getOrderId() {
    return await this.odrerId.textContent();
  }

}

module.exports = { OrdrerHistoryPage };
