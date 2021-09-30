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
