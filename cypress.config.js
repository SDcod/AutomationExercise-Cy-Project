const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      charts: true,
      reportPageTitle: "custom-title",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://www.automationexercise.com/",
    video: false,
    videoCompression: 35,
    watchForFileChanges: false,
  },
});
