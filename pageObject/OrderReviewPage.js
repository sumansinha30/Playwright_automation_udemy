const { test, expect } = require("@playwright/test");

class OrderReviewPage {
  constructor(page) {
    this.page = page;
    this.countryBox = page.locator("[placeholder*='Country']");
    this.countryDropdown = page.locator(".ta-results");
    this.shippingEmail = page.locator(".details__user label[type='text']");
    this.placeOderBtn = page.locator(".action__submit");
    this.orderPlacedMsg = page.locator(".hero-primary");
    this.odrerId = page.locator("label[class='ng-star-inserted']");
    this.ordersHistoryBtn = page.locator("[routerlink*='myorders']").first();
    
  }

  async enterCountry(countryInitials, country) {
    await this.countryBox.type(countryInitials, { delay: 100 });

    await this.countryDropdown.waitFor();
    const optionsCount = await this.countryDropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
      // console.log(dropdown.locator("button").nth(i).textContent());

      if ((await this.countryDropdown.locator("button").nth(i).textContent()).includes(country)) {
        await this.countryDropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async validateUserEmailInOrderReviewPage(username) {
    await expect(this.shippingEmail).toHaveText(username);
  }

  async clickPlaceOder() {
    await this.placeOderBtn.click();
  }

  async validateOrderIsPlaced() {
    await expect(this.orderPlacedMsg).toHaveText(" Thankyou for the order. ");
  }

  async getOrderId() {
    return await this.odrerId.textContent();
  }

  async clickOrdersHistoryBtn() {
    await this.ordersHistoryBtn.click();
  }

  
}

module.exports = { OrderReviewPage };
