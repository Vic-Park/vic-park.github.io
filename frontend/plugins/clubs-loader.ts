import path from 'path';
import pkgDir from 'pkg-dir';
import type { Plugin } from 'rollup';
import { Club } from '../../shared/types/club';

import { loadDataFolder } from './utils';

const projectPath = path.join(pkgDir.sync(__dirname)!, '..');

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
				const dataFolder = path.join(projectPath, 'data/clubs');
				const clubs = loadDataFolder({
					dataFolder,
					schema: Club,
				});

				return `export default ${JSON.stringify(clubs)}`;
			}
			return undefined;
		},
	};
}
