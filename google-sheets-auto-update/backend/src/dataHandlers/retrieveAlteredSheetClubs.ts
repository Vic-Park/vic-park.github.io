import type { sheets_v4 } from 'googleapis';
import type { Club } from '~types/club';
import { EntryType } from '~types/entry';
import {
  filterAlteredSheetEntries,
  getSheetRows,
  retrieveGithubFiles,
} from './utils';

export async function retrieveAlteredSheetClubs({
  spreadsheetData,
}: {
  spreadsheetData: sheets_v4.Schema$Spreadsheet;
}) {
  const clubEntries = getSheetRows(spreadsheetData, 'Clubs');
  const googleSheetEntries: Club[] = clubEntries.map((club) => {
    const [
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
      slug,
    ] = club;

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
    googleSheetEntries,
  });

  return alteredSheetClubs;
}
