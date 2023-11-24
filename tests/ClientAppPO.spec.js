const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageObject/POManager");
const dataset = JSON.parse(
  JSON.stringify(require("../Utils/PlaceOrderTestdata.json"))
);
const { customtest } = require("../Utils/test-base");

for (const data of dataset) {
  test(`@Web Client app login to order ${data.productName}`, async ({ page }) => {
    // const username = "sumanta@gmail.com";
    // const password = "Sumanta123";
    // const productName = "adidas original";

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.ValidLogin(data.username, data.password);

    const dashboardPage = poManager.getDashBoardPage();
    await dashboardPage.getProductsTitles();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.WaitForCartItemsToLoad();
    await cartPage.checkProductInCart(data.productName);
    await cartPage.clickCheckout();

    const orderReviewPage = poManager.getOrderReviewPage();
    await orderReviewPage.enterCountry(data.countryInitials, data.country);

    await orderReviewPage.validateUserEmailInOrderReviewPage(data.username);
    await orderReviewPage.clickPlaceOder();
    await orderReviewPage.validateOrderIsPlaced();

    const orderId = await orderReviewPage.getOrderId();
    await orderReviewPage.clickOrdersHistoryBtn();

    const ordrerHistoryPage = poManager.getOrderHistoryPage();
    await ordrerHistoryPage.loadLastOrder();
    await ordrerHistoryPage.viewOrderDetails(orderId);
    await ordrerHistoryPage.waitForOrderSummaryToLoad();
    const orderIdDetails = await ordrerHistoryPage.getOrderId();
    console.log(orderIdDetails);
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  });
}

customtest.only("Client app login", async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.ValidLogin(
    testDataForOrder.username,
    testDataForOrder.password
  );

  const dashboardPage = poManager.getDashBoardPage();
  await dashboardPage.getProductsTitles();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.WaitForCartItemsToLoad();
  await cartPage.checkProductInCart(testDataForOrder.productName);
  await cartPage.clickCheckout();

  const orderReviewPage = poManager.getOrderReviewPage();
  await orderReviewPage.enterCountry(testDataForOrder.countryInitials, testDataForOrder.country);

  await orderReviewPage.validateUserEmailInOrderReviewPage(testDataForOrder.username);
  await orderReviewPage.clickPlaceOder();
  await orderReviewPage.validateOrderIsPlaced();

  const orderId = await orderReviewPage.getOrderId();
  await orderReviewPage.clickOrdersHistoryBtn();

  const ordrerHistoryPage = poManager.getOrderHistoryPage();
  await ordrerHistoryPage.loadLastOrder();
  await ordrerHistoryPage.viewOrderDetails(orderId);
  await ordrerHistoryPage.waitForOrderSummaryToLoad();
  const orderIdDetails = await ordrerHistoryPage.getOrderId();
  console.log(orderIdDetails);
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
