import type { GrayMatterFile, Input } from 'gray-matter';

import type { Entry, EntryType } from './entry';

export type ClubEventMetadata = {
	name: string;
	description: string;
	start: Date;
	end: Date;
	isSchoolEvent: boolean;
};

export type ClubEvent = Entry<EntryType.event>;

export type ClubEventGrayMatterFile = Omit<GrayMatterFile<Input>, 'data'> & {
	data: ClubEventMetadata;
};
