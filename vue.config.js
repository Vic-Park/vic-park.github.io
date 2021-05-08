/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  configureWebpack(config) {
    config.module.rules.push({
      test: /data\/announcements/,
      use: [
        {
          loader: path.resolve(__dirname, 'loaders', 'announcements-loader.js'),
        },
      ],
    });

    config.module.rules.push({
      test: /data\/clubs/,
      use: [
        {
          loader: path.resolve(__dirname, 'loaders', 'clubs-loader.js'),
        },
      ],
    });

    config.resolve.alias['~'] = path.resolve(__dirname, 'src');
    config.resolve.alias['~data'] = path.resolve(__dirname, 'data');
  },
};
