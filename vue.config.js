/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

module.exports = {
  configureWebpack(config) {
    const dataFolders = ['announcements', 'clubs', 'events'];

    for (const dataFolder of dataFolders) {
      config.module.rules.push({
        test: new RegExp(`data/${dataFolder}`),
        use: [
          {
            loader: path.resolve(__dirname, 'loaders', `${dataFolder}-loader.js`),
          },
        ],
      });
    }

    config.resolve.alias['~'] = path.resolve(__dirname, 'src');
    config.resolve.alias['~data'] = path.resolve(__dirname, 'data');
  },
};
