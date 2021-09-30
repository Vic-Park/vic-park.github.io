import path from 'path';
import pkgDir from 'pkg-dir';
import type { Plugin } from 'rollup';

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
				const schemaFilePath = path.join(
					projectPath,
					'shared/typedefs/club.yaml'
				);
				const clubs = loadDataFolder({
					dataFolder,
					schemaFilePath,
				});

				return `export default ${JSON.stringify(clubs)}`;
			}
			return undefined;
		},
	};
}
