import type { GrayMatterFile, Input } from 'gray-matter';

import type { Entry, EntryType } from './entry';

export type ClubMetadata = {
	name: string;
	staffSupervisor: string;
	clubLeaders: string;
	shortDescription: string;
	extraInformation: string;
	categories: string;
	meetingTimes: string;
	joinInstructions: string;
	onlinePlatforms: string;
	timeCommitment: string;
	equityStatement: string;
};

export type Club = Entry<EntryType.club>;

export type ClubGrayMatterFile = Omit<GrayMatterFile<Input>, 'data'> & {
	data: ClubMetadata;
};
