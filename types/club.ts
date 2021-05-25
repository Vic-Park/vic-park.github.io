import type { Entry, EntryType } from './entry';
import type { GrayMatterFile, Input } from 'gray-matter';

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
};

export type Club = Entry<EntryType.club>;

export type ClubGrayMatterFile = GrayMatterFile<Input> & {
  data: ClubMetadata;
};
