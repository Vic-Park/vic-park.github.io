import type { sheets_v4 } from 'googleapis';
import type { ClubAnnouncement } from '~types/announcement';
import { EntryType } from '~types/entry';
import {
  filterAlteredSheetEntries,
  getSheetRows,
  retrieveGithubFiles,
} from './utils';
import { paramCase } from 'param-case';

export async function retrieveAlteredSheetAnnouncements({
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
      const [title, date, content] = announcement;

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
  const alteredSheetAnnouncements =
    await filterAlteredSheetEntries<ClubAnnouncement>({
      convertMatterFileToEntry({ data, content }) {
        return { ...data, extraInformation: content };
      },
      githubFiles,
      googleSheetEntries: googleSheetAnnouncements,
    });

  return alteredSheetAnnouncements;
}
