/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");

module.exports = {
  configureWebpack(config) {
    config.resolve.alias["~"] = path.resolve(__dirname, "src");
  },
};
