import yaml from 'js-yaml';

import type { Entry } from '~shared/types/entry';

export function stringifyEntry(entry: Entry) {
	return yaml.dump(entry.data);
}
