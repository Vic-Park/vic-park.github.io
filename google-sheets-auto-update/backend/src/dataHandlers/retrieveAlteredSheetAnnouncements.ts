import type { sheets_v4 } from 'googleapis';
import type { ClubAnnouncement } from '~types/announcement';
import { EntryType } from '~types/entry';
import { filterAlteredSheetEntries, retrieveGithubFiles } from './utils';

export async function retrieveAlteredSheetAnnouncements({
  spreadsheetData,
}: {
  spreadsheetData: sheets_v4.Schema$Spreadsheet;
}) {
  const clubAnnouncementsSheet = spreadsheetData.sheets.find(
    (sheet) => sheet.properties.title === 'Club Announcements'
  );

  const googleSheetAnnouncements: ClubAnnouncement[] =
    clubAnnouncementsSheet.data[0].rowData.slice(1).map(({ values }) => {
      const [title, date, content] = values.map(
        (value) => value.formattedValue
      );

      return {
        metadata: {
          title,
          date: new Date(date),
        },
        content,
        slug: title,
        type: EntryType.announcement,
      };
    });

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
