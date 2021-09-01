import path from 'path';
import pkgDir from 'pkg-dir';

import { createDataFileValidator, loadDataFolder } from './utils';

const rootPath = path.join(pkgDir.sync(__dirname), '..');

export default function eventsLoader() {
	return {
		name: 'events-loader',
		resolveId(source) {
			if (source === '~data/events') {
				return source;
			}
			return undefined;
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
			return undefined;
		},
	};
}
