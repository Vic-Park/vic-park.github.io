import type { GrayMatterFile, Input } from 'gray-matter';
import { Entry, EntryType } from './entry';

export type ClubEventMetadata = {
  name: string;
  description: string;
  start: Date;
  end: Date;
};

export type ClubEvent = Entry<EntryType.event>;

export type ClubEventGrayMatterFile = GrayMatterFile<Input> & {
  data: ClubEventMetadata;
};
