const { test, expect, request } = require("@playwright/test");

test("@Web Browser Context Playwright automation", async ({ browser }) => {
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/angularpractice/shop");
  console.log(await page.title());

  const cardTitles = page.locator(".card-body h4 a");

  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(1).textContent());
  // console.log(await cardTitles.last().textContent());

  await page.waitForLoadState("networkidle");
  // await Promise.all([page.waitForNavigation()]);
  console.log(await cardTitles.allTextContents());
});

test("Page Playwright automation", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  // await expect(page).toHaveTitle('Google');

  const username = page.locator("#username");
  const password = page.locator("#password");
  const signin = page.locator("#signInBtn");
  await username.type("Suman");
  await password.type("98765");
  await signin.click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await username.fill("");
  await username.fill("rahulshettyacademy");
  await password.fill("");
  await password.type("learning");

  //race condition
  await Promise.all([page.waitForNavigation(), signin.click()]);
  // await signin.click();

  const cardTitles = page.locator(".card-body h4 a");

  // console.log(await cardTitles.first().textContent());
  // console.log(await cardTitles.nth(1).textContent());
  // console.log(await cardTitles.last().textContent());

  console.log(await cardTitles.allTextContents());
});

test("@Web UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const username = page.locator("#username");
  const password = page.locator("#password");
  const signin = page.locator("#signInBtn");
  const doc_link = page.locator("[href*='documents-request']");

  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("Consultant");

  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  // await page.pause();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  const termCheckBox = page.locator("#terms");
  await termCheckBox.click();
  await expect(termCheckBox).toBeChecked();
  await termCheckBox.uncheck();
  expect(await termCheckBox.isChecked()).toBeFalsy();

  await expect(doc_link).toHaveAttribute("class", "blinkingText");
});

test("child window handle", async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const doc_link = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    doc_link.click()
  ]);

  const text = await newPage.locator('.red').textContent();
  console.log(text);

  const email_id = text.split("@")[1].split(" ")[0];
  console.log(email_id);

  await page.locator("#username").type(email_id);
  // await page.pause();
  console.log(await page.locator("#username").textContent());
});

test("Abort network calls", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // await page.route('**/*.css', route=> route.abort());
  await page.route('**/*.{jpg,png,jpeg}', route=> route.abort());

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  

  const username = page.locator("#username");
  const password = page.locator("#password");
  const signin = page.locator("#signInBtn");
  page.on('request', request => console.log(request.url()));
  page.on('response', response => console.log(response.url(), response.status()));
  await username.type('rahulshettyacademy');
  await password.type('learning');
  await signin.click();

  await page.pause();

  
});