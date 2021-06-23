/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const pkgDir = require('pkg-dir');
const { loadDataFolder, createDataFileValidator } = require('./utils');

const rootPath = path.join(pkgDir.sync(__dirname), '..');

export default function eventsLoader() {
  return {
    name: 'events-loader',
    resolveId(source) {
      if (source === '~data/events') {
        return source;
      }
      return null;
    },
    load(id) {
      if (id === '~data/events') {
        const eventsFolder = path.join(rootPath, 'data', 'events');
        const events = loadDataFolder({
          dataFolder: eventsFolder,
          validateDataFile: createDataFileValidator([
            'name',
            'description',
            'information',
            { key: 'start', type: Date },
            { key: 'end', type: Date },
          ]),
        });

        return `export default ${JSON.stringify(events)}`;
      }
      return null;
    },
  };
}
