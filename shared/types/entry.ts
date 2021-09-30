import type { Club } from './club';
import type { ClubAnnouncement } from './club-announcement';
import type { ClubEvent } from './club-event';

export enum EntryType {
	club = 'club',
	announcement = 'announcement',
	event = 'event',
}

export type EntryTypeData = {
	[EntryType.club]: Club;
	[EntryType.announcement]: ClubAnnouncement;
	[EntryType.event]: ClubEvent;
};

export type Entry<T extends EntryType | void = void> = T extends EntryType
	? {
			type: T;
			data: EntryTypeData[T];
	  }
	: {
			[T in EntryType]: {
				type: T;
				data: EntryTypeData[T];
			};
	  }[EntryType];