/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const pkgDir = require('pkg-dir');
const { loadDataFolder, createDataFileValidator } = require('./utils');

const rootPath = pkgDir.sync(__dirname);

module.exports = function eventsLoader() {
  const eventsFolder = path.join(rootPath, 'data', 'events');
  const events = loadDataFolder({
    dataFolder: eventsFolder,
    validateDataFile: createDataFileValidator([
      'name',
      'description',
      'information',
      { key: 'start', type: Date },
      { key: 'end', type: Date },
      'slug',
    ]),
  });

  return `export default ${JSON.stringify(events)}`;
};
