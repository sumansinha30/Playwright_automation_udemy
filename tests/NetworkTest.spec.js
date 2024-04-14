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
      productOrderedId: "6581cade9fd99c85e8ee7ff5",
    },
  ],
};

let response;
const fakePayloadOrders = {data:[],message:"No Orders"};

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

  
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6491c7cd7244490f9567ce9f",
  async route => {
    const response = await page.request.fetch(route.request());
    let body = fakePayloadOrders;
    route.fulfill({
      response,
      body,
    })
  });

  await page.locator("[routerlink*='myorders']").first().click();
  // await page.pause();
  await page.locator(".mt-4").waitFor();
  console.log(await page.locator(".mt-4").textContent());
  
});
