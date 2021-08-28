import type { GrayMatterFile, Input } from 'gray-matter';

import type { Entry, EntryType } from './entry';

export type ClubAnnouncementMetadata = {
	title: string;
	date: Date;
};

export type ClubAnnouncement = Entry<EntryType.announcement>;

export type ClubAnnouncementGrayMatterFile = GrayMatterFile<Input> & {
	data: ClubAnnouncementMetadata;
};
