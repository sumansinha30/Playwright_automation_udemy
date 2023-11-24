const { LoginPage } = require("../pageObject/LoginPage");
const { DashBoardPage } = require("../pageObject/DashBoardPage");
const { CartPage } = require("../pageObject/CartPage");
const { OrderReviewPage } = require("../pageObject/OrderReviewPage");
const { OrdrerHistoryPage } = require("../pageObject/OrdrerHistoryPage");


class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashBoardPage(page);
    this.cartPage = new CartPage(page);
    this.orderReviewPage = new OrderReviewPage(page);
    this.ordrerHistoryPage = new OrdrerHistoryPage(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDashBoardPage() {
    return this.dashboardPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getOrderReviewPage() {
    return this.orderReviewPage;
  }

  getOrderHistoryPage() {
    return this.ordrerHistoryPage;
  }
}

module.exports = { POManager };
