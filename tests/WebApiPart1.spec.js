const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../Utils/ApiUtils");
const loginPayload = {
  userEmail: "sumanta@gmail.com",
  userPassword: "Sumanta123",
};

const orderPayload = {
  orders: [
    {
      country: "British Indian Ocean Territory",
      productOrderedId: "6581ca399fd99c85e8ee7f45",
    },
  ],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);

});

test("@API Place an order", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("[routerlink*='myorders']").first().click();
  await page.locator("tr.ng-star-inserted").last().waitFor();

  const order_counts = await page.locator("tr.ng-star-inserted").count();
  console.log(order_counts);
  for (let i = 0; i < order_counts; ++i) {
    if (
      (
        await page
          .locator("tr.ng-star-inserted")
          .nth(i)
          .locator("th")
          .textContent()
      ).includes(response.orderId)
    ) {
      page
        .locator("tr.ng-star-inserted")
        .nth(i)
        .locator("button")
        .first()
        .click();
      break;
    }
  }

  await page.locator(".email-container .row").last().waitFor();

  const orderIdDetails = await page
    .locator("[class='col-text -main']")
    .textContent();
  console.log(orderIdDetails);
  // await page.pause();
  expect(orderIdDetails.includes(response.orderId)).toBeTruthy();
});
