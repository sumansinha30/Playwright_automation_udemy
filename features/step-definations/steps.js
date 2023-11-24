const { When, Then, Given, And } = require("@cucumber/cucumber");
const { POManager } = require("../../pageObject/POManager");
const { expect } = require("@playwright/test");

Given(
  "Login to Ecommerce application using {string} and {string}",
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    this.username = username;
    await loginPage.ValidLogin(this.username, password);
  }
);

When("Product {string} is added to cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const dashboardPage = this.poManager.getDashBoardPage();
  await dashboardPage.getProductsTitles();
  await dashboardPage.searchProductAddCart(productName);
  await dashboardPage.navigateToCart();
});

Then(
  "Verify {string} product is displayed in the cart",
  async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.WaitForCartItemsToLoad();
    await cartPage.checkProductInCart(productName);
    await cartPage.clickCheckout();
  }
);

Then(
  "Enter the valid countryInitials {string} country {string} and place the order",
  { timeout: 10 * 1000 },
  async function (countryInitials, country) {
    // Write code here that turns the phrase above into concrete actions
    const orderReviewPage = this.poManager.getOrderReviewPage();
    await orderReviewPage.enterCountry(countryInitials, country);

    await orderReviewPage.validateUserEmailInOrderReviewPage(this.username);
    await orderReviewPage.clickPlaceOder();
    await orderReviewPage.validateOrderIsPlaced();

    this.orderId = await orderReviewPage.getOrderId();
    await orderReviewPage.clickOrdersHistoryBtn();
  }
);

Then("Validate order is present in the order history", async function () {
  // Write code here that turns the phrase above into concrete actions
  const ordrerHistoryPage = this.poManager.getOrderHistoryPage();
  await ordrerHistoryPage.loadLastOrder();
  await ordrerHistoryPage.viewOrderDetails(this.orderId);
  await ordrerHistoryPage.waitForOrderSummaryToLoad();
  const orderIdDetails = await ordrerHistoryPage.getOrderId();
  console.log(orderIdDetails);
  expect(this.orderId.includes(orderIdDetails)).toBeTruthy();
});

Given(
  "Login to Ecommerce2 application using {string} and {string}",
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const user = this.page.locator("#username");
    const pwd = this.page.locator("#password");
    const signin = this.page.locator("#signInBtn");
    await user.type(username);
    await pwd.type(password);
    await signin.click();
  }
);

Then("Verify error message is displayed", async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect"
  );
});
