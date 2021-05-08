/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const pkgDir = require('pkg-dir');
const { loadDataFolder } = require('./utils');

const rootPath = pkgDir.sync(__dirname);

module.exports = function announcementsLoader() {
  const announcementsFolder = path.join(rootPath, 'data', 'announcements');
  const announcements = loadDataFolder({
    dataFolder: announcementsFolder,
    validateDataFile(frontMatterData) {
      const validKeys = ['title', 'date', 'slug'];

      const keys = Object.keys(frontMatterData);
      for (const key of keys) {
        if (!validKeys.includes(key)) {
          return { valid: false, reason: `Invalid front matter key: ${key}` };
        }
      }
      return { valid: true };
    },
  });

  return `export default ${JSON.stringify(announcements)}`;
};
