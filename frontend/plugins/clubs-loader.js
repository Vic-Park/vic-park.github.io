/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const pkgDir = require('pkg-dir');
const { loadDataFolder, createDataFileValidator } = require('./utils');

const rootPath = path.join(pkgDir.sync(__dirname), '..');

export default function clubsLoader() {
  return {
    name: 'clubs-loader',
    resolveId(source) {
      if (source === '~data/clubs') {
        return source;
      }
      return null;
    },
    load(id) {
      if (id === '~data/clubs') {
        const clubsFolder = path.join(rootPath, 'data', 'clubs');
        const clubs = loadDataFolder({
          dataFolder: clubsFolder,
          validateDataFile: createDataFileValidator([
            'name',
            'staffSupervisor',
            'clubLeaders',
            'shortDescription',
            'extraInformation',
            'categories',
            'meetingTimes',
            'joinInstructions',
            'onlinePlatforms',
            'timeCommitment',
            'equityStatement'
          ]),
        });

        return `export default ${JSON.stringify(clubs)}`;
      }
      return null;
    },
  };
}
