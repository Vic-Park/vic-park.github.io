import path from 'path';
import pkgDir from 'pkg-dir';
import type { Plugin } from 'rollup';

import { createDataFileValidator, loadDataFolder } from './utils';

const rootPath = path.join(pkgDir.sync(__dirname), '..');

export default function announcementsLoader(): Plugin {
	return {
		name: 'announcements-loader',
		resolveId(source) {
			if (source === '~data/announcements') {
				return source;
			}
			return undefined;
		},
		load(id) {
			if (id === '~data/announcements') {
				const announcementsFolder = path.join(
					rootPath,
					'data',
					'announcements'
				);
				const announcements = loadDataFolder({
					dataFolder: announcementsFolder,
					validateDataFile: createDataFileValidator([
						'title',
						{ key: 'date', type: Date },
					]),
				});

				return `export default ${JSON.stringify(announcements)}`;
			}
			return undefined;
		},
	};
}
