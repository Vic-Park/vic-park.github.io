import type { sheets_v4 } from 'googleapis';
import type { ClubAnnouncement } from '~types/announcement';
import { EntryType } from '~types/entry';
import {
  getGithubEntryUpdates,
  getSheetRows,
  retrieveGithubFiles,
} from './utils';
import { paramCase } from 'param-case';
import { cleanSheetRow } from './utils/cleanSheetRow';

export async function getGithubAnnouncementUpdates({
  spreadsheetData,
}: {
  spreadsheetData: sheets_v4.Schema$Spreadsheet;
}) {
  const announcementEntries = getSheetRows(
    spreadsheetData,
    'Club Announcements'
  );

  const googleSheetAnnouncements: ClubAnnouncement[] = announcementEntries.map(
    (announcement) => {
      const [title, date, content] = cleanSheetRow(announcement);

      return {
        metadata: {
          title,
          date: new Date(date),
        },
        content,
        slug: paramCase(title),
        type: EntryType.announcement,
      };
    }
  );

  const githubFiles = await retrieveGithubFiles('/data/announcements');
  const githubAnnouncementUpdates =
    await getGithubEntryUpdates<ClubAnnouncement>({
      githubFiles,
      googleSheetEntries: googleSheetAnnouncements,
    });

  return githubAnnouncementUpdates;
}
