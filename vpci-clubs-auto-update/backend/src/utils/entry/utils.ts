import yaml from 'js-yaml';

import type { Entry } from '~shared/types/entry';
import { EntryType } from '~shared/types/entry';

export function getEntrySlug(entry: Entry): string {
	switch (entry.type) {
		case EntryType.club: {
			return entry.data.slug;
		}
		case EntryType.announcement: {
			return entry.data.title;
		}
		case EntryType.event: {
			return entry.data.name;
		}
		default: {
			throw new Error('Unknown entry type.');
		}
	}
}

const entryTypeToFolder = {
	[EntryType.announcement]: 'announcements',
	[EntryType.club]: 'clubs',
	[EntryType.event]: 'events',
};

export function getEntryTypeFolder(entryType: EntryType) {
	return `data/${entryTypeToFolder[entryType]}`;
}

export function stringifyEntry(entry: Entry) {
	return yaml.dump(entry.data);
}
