import { test } from "@playwright/test"

test('Playwright special locators', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    await page.getByLabel("Password").fill("sumanta");
    await page.getByRole('button', { name: 'Submit'}).click();

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", {name: 'Shop'}).click();

    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click();
    

}) 