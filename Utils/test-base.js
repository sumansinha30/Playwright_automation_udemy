const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "dip24@gmail.com",
    password: "Sumanta234",
    productName: "ADIDAS ORIGINAL",
    countryInitials: "New",
    country: "New Zealand",
  },
});
