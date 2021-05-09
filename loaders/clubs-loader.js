/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const pkgDir = require('pkg-dir');
const { loadDataFolder, createDataFileValidator } = require('./utils');

const rootPath = pkgDir.sync(__dirname);

module.exports = function clubsLoader() {
  const clubsFolder = path.join(rootPath, 'data', 'clubs');
  const clubs = loadDataFolder({
    dataFolder: clubsFolder,
    validateDataFile: createDataFileValidator([
      'name',
      'shortDescription',
      'longDescription',
      'prerequisites',
      'meetingTimes',
      'meetingPlatform',
      'moreInfo',
      'slug',
    ]),
  });

  return `export default ${JSON.stringify(clubs)}`;
};
