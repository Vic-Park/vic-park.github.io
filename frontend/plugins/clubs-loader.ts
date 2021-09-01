import path from 'path';
import pkgDir from 'pkg-dir';
import type { Plugin } from 'rollup';

import { createDataFileValidator, loadDataFolder } from './utils';

const rootPath = path.join(pkgDir.sync(__dirname), '..');

export default function clubsLoader(): Plugin {
	return {
		name: 'clubs-loader',
		resolveId(source) {
			if (source === '~data/clubs') {
				return source;
			}
			return undefined;
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
						'equityStatement',
					]),
				});

				return `export default ${JSON.stringify(clubs)}`;
			}
			return undefined;
		},
	};
}
