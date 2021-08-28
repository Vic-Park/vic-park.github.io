import { EntryType } from '~types/entry';

const entryTypeToFolder = {
	[EntryType.announcement]: 'announcements',
	[EntryType.club]: 'clubs',
	[EntryType.event]: 'events',
};

export function getEntryTypeFolder(entryType: EntryType) {
	return `data/${entryTypeToFolder[entryType]}`;
}
