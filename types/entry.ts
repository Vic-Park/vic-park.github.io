import { ClubAnnouncementMetadata } from './announcement';
import { ClubMetadata } from './club';
import { ClubEventMetadata } from './event';

type EntryMetadata = {
  [EntryType.club]: ClubMetadata;
  [EntryType.announcement]: ClubAnnouncementMetadata;
  [EntryType.event]: ClubEventMetadata;
};

export type Entry<T extends EntryType | unknown = unknown> = {
  slug: string;
  metadata: T extends EntryType ? EntryMetadata[T] : Record<string, unknown>;
  content?: string;
  type: T extends EntryType ? T : EntryType;
};

export enum EntryType {
  club = 'club',
  announcement = 'announcement',
  event = 'event',
}
