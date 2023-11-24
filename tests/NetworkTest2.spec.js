const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../Utils/ApiUtils");

const loginPayload = {
  userEmail: "sumanta@gmail.com",
  userPassword: "Sumanta123",
};

// const loginPayload = {
//   userEmail: "dip24@gmail.com",
//   userPassword: "Sumanta234",
// };

const orderPayload = {
  orders: [
    {
      country: "British Indian Ocean Territory",
      productOrderedId: "6262e9d9e26b7e1a10e89c04",
    },
  ],
};

let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);

});

test("Place an order", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("[routerlink*='myorders']").first().click();
  // await page.pause();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=649acfa07244490f956e6ab0",
  route => route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=649ada517244490f956e77a6"}))
  
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
  
});
