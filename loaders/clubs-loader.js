/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const pkgDir = require('pkg-dir');
const { loadDataFolder } = require('./utils');

const rootPath = pkgDir.sync(__dirname);

module.exports = function clubsLoader() {
  const clubsFolder = path.join(rootPath, 'data', 'clubs');
  const clubs = loadDataFolder({
    dataFolder: clubsFolder,
    validateDataFile(frontMatterData) {
      const validKeys = [
        'name',
        'shortDescription',
        'longDescription',
        'prerequisites',
        'meetingTimes',
        'meetingPlatform',
        'moreInfo',
      ];

      const keys = Object.keys(frontMatterData);
      for (const key of keys) {
        if (!validKeys.includes(key)) {
          return { valid: false, reason: `Invalid front matter key: ${key}` };
        }
      }
      return { valid: true };
    },
  });

  return `export default ${JSON.stringify(clubs)}`;
};
