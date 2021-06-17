/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  chainWebpack(config) {
    // config.module.rule('vue').uses.delete('cache-loader');
    // config.module.rule('js').uses.delete('cache-loader');
    // config.module.rule('ts').uses.delete('cache-loader');
    config.module.rule('md').uses.delete('cache-loader');
  },
  configureWebpack(config) {
    const dataFolders = ['announcements', 'clubs', 'events'];

    for (const dataFolder of dataFolders) {
      config.resolve.alias[`~data/${dataFolder}`] = path.resolve(
        __dirname,
        'loaders',
        `${dataFolder}-loader.js`
      );
      config.module.rules.push({
        test: new RegExp(`/loaders/${dataFolder}-loader.js$`),
        use: [
          {
            loader: path.resolve(__dirname, 'loaders', `${dataFolder}-loader.js`),
          },
        ],
      });
    }

    config.resolve.alias['~'] = path.resolve(__dirname, 'src');

    // config.cache = false;
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [autoprefixer, tailwindcss],
      },
    },
  },
};
