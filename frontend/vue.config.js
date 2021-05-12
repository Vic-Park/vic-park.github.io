/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  chainWebpack(config) {
    config.module.rule('vue').uses.delete('cache-loader');
    config.module.rule('js').uses.delete('cache-loader');
    config.module.rule('ts').uses.delete('cache-loader');
  },
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
    config.resolve.alias['~data'] = path.resolve(__dirname, '../data');

    config.cache = false;
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [autoprefixer, tailwindcss],
      },
    },
  },
};
