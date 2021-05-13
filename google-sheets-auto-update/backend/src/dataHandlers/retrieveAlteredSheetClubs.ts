import type { sheets_v4 } from 'googleapis';
import type { Club } from '~types/club';
import { EntryType } from '~types/entry';
import { filterAlteredSheetEntries, retrieveGithubFiles } from './utils';

export async function retrieveAlteredSheetClubs({
  spreadsheetData,
}: {
  spreadsheetData: sheets_v4.Schema$Spreadsheet;
}) {
  const clubsSheet = spreadsheetData.sheets.find(
    (sheet) => sheet.properties.title === 'Clubs'
  );

  const googleSheetClubs: Club[] = clubsSheet.data[0].rowData
    .slice(1)
    .map(({ values }) => {
      const [
        slug,
        name,
        staffSupervisor,
        clubLeaders,
        shortDescription,
        categories,
        meetingTimes,
        joinInstructions,
        onlinePlatforms,
        extraInformation,
        timeCommitment,
      ] = values.map((value) => value.formattedValue);

      return {
        content: extraInformation,
        metadata: {
          categories: categories.split(','),
          clubLeaders,
          extraInformation,
          joinInstructions,
          meetingTimes,
          name,
          onlinePlatforms,
          shortDescription,
          staffSupervisor,
          timeCommitment,
        },
        slug,
        type: EntryType.club,
      };
    });

  const githubFiles = await retrieveGithubFiles('/data/clubs');
  const alteredSheetClubs = await filterAlteredSheetEntries<Club>({
    convertMatterFileToEntry({ data, content }) {
      return { ...data, extraInformation: content };
    },
    githubFiles,
    googleSheetEntries: googleSheetClubs,
  });

  return alteredSheetClubs;
}
