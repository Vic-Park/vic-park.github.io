import path from 'path';
import pkgDir from 'pkg-dir';
import type { Plugin } from 'rollup';
import { ClubEvent } from '../../shared/types/club-event';

import { loadDataFolder } from './utils';

const projectPath = path.join(pkgDir.sync(__dirname)!, '../..');

export default function eventsLoader(): Plugin {
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
				const dataFolder = path.join(projectPath, 'data/events');
				const events = loadDataFolder({
					dataFolder,
					schema: ClubEvent,
				});

				return `export default ${JSON.stringify(events)}`;
			}
			return undefined;
		},
	};
}
