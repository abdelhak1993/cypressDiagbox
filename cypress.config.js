const { defineConfig } = require("cypress")

module.exports = defineConfig({
  projectId: 'ojc49z',
  e2e: {
    defaultCommandTimeout:40000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportHeight:720,
    viewportWidth:1280
  },


});
