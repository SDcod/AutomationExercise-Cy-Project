const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://gorest.co.in",
  },
  setupNodeEvents(on, config) {},
  env: {
    API_KEY: "d33377d3bcd2cf16ac64772fc83f5dddcceda596f2d8d09d94785c0d8eec9202",
  },
});
