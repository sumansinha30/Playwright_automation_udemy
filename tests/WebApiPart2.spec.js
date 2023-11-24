const { test, expect } = require("@playwright/test");
let webContext;
const email = "sumanta@gmail.com";

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").type("Sumanta123");

  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });

  webContext = await browser.newContext({ storageState: "state.json" });
});

test("Client app login", async () => {
  const productName = "adidas original";
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  const products = page.locator(".card-body");
  // const titles = await page.locator('.card-body b').allTextContents();
  // console.log(titles);
  // console.log(titles.length);

  const count = await products.count();
  for (let i = 0; i < count; i++) {
    // await page.pause();
    // console.log(await products.nth(i).locator("b").textContent());
    // console.log(productName);

    if ((await products.nth(i).locator("b").textContent()) === productName) {
      await products.nth(i).locator("text='Add To Cart'").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  page.locator("div li").first().waitFor();

  //   await page.pause();
  const bool = await page.locator("h3:has-text('adidas original')").isVisible();
  // console.log(bool);
  expect(bool).toBeTruthy();

  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });

  const dropdown = await page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; i++) {
    // console.log(dropdown.locator("button").nth(i).textContent());

    if ((await dropdown.locator("button").nth(i).textContent()) === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  //   await page.pause();

  await expect(page.locator(".details__user label[type='text']")).toHaveText(
    email
  );
  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );

  const order = await page
    .locator("label[class='ng-star-inserted']")
    .textContent();
  console.log(order);
  // const order_id = order.split(" ")[1].split(" ")[1].split(" ")[0];
  // console.log(order_id);

  await page.locator("[routerlink*='myorders']").first().click();
  await page.locator("tr.ng-star-inserted").last().waitFor();

  const order_counts = await page.locator("tr.ng-star-inserted").count();
  console.log(order_counts);
  for (let i = 0; i < order_counts; ++i) {
    // await page.pause();
    if (
      order.includes(
        await page
          .locator("tr.ng-star-inserted")
          .nth(i)
          .locator("th")
          .textContent()
      )
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
  expect(order.includes(orderIdDetails)).toBeTruthy();
});

test("@API Products List names", async () => {
  const productName = "adidas original";
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  console.log(titles.length);
});
