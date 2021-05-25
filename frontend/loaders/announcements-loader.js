/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const pkgDir = require('pkg-dir');
const { loadDataFolder, createDataFileValidator } = require('./utils');

const rootPath = path.join(pkgDir.sync(__dirname), '..');

module.exports = function announcementsLoader() {
  const announcementsFolder = path.join(rootPath, 'data', 'announcements');
  const announcements = loadDataFolder({
    dataFolder: announcementsFolder,
    validateDataFile: createDataFileValidator(['title', { key: 'date', type: Date }]),
  });

  return `export default ${JSON.stringify(announcements)}`;
};
