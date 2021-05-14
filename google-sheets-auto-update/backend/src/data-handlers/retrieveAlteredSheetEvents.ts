import type { sheets_v4 } from 'googleapis';
import { EntryType } from '~types/entry';
import { ClubEvent } from '~types/event';
import {
  retrieveGithubFiles,
  filterAlteredSheetEntries,
  getSheetRows,
} from './utils';

export async function retrieveAlteredSheetEvents({
  spreadsheetData,
}: {
  spreadsheetData: sheets_v4.Schema$Spreadsheet;
}) {
  const eventsEntries = getSheetRows(spreadsheetData, 'Club Events');

  const googleSheetEvents: ClubEvent[] = eventsEntries.map((event) => {
    const [name, description, information, start, end] = event;

    return {
      metadata: {
        name,
        description,
        start: new Date(start),
        end: new Date(end),
      },
      content: information,
      slug: name,
      type: EntryType.event,
    };
  });

  const githubFiles = await retrieveGithubFiles('/data/events');
  const alteredSheetEvents = await filterAlteredSheetEntries<ClubEvent>({
    convertMatterFileToEntry({ data, content }) {
      return { ...data, information: content };
    },
    githubFiles,
    googleSheetEntries: googleSheetEvents,
  });

  return alteredSheetEvents;
}
