// @ts-check
const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  retries: 2,
  workers: 3,

  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: "html",
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: false,
        screenshot: "off",
        trace: "on",
        // trace: 'retain-on-failure'
        ...devices['iPhone 13 Pro']
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "retain-on-failure",
        video: "retain-on-failure",
        trace: "on",
        ignoreHttpsErrors: true,
        Permissions: ['geolocation'],
        // viewport: {width: 720, height:720}
      }
    }
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
};

module.exports = config;
