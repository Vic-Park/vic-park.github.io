import path from 'path';
import pkgDir from 'pkg-dir';
import type { Plugin } from 'rollup';

import { loadDataFolder } from './utils';

const projectPath = path.join(pkgDir.sync(__dirname)!, '..');

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
					projectPath,
					'data/announcements'
				);
				const announcements = loadDataFolder({
					dataFolder: announcementsFolder,
				});

				return `export default ${JSON.stringify(announcements)}`;
			}
			return undefined;
		},
	};
}
