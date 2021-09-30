import type { sheets_v4 as SheetsV4 } from 'googleapis';

import {
	getGithubEntryUpdates,
	getSheetRows,
	retrieveGithubFiles,
} from './utils';
import { cleanSheetRow } from './utils/normalize';
import { getEventsFromSheetRows } from './utils/validation/get-events-from-sheet-rows';

export async function getGithubEventUpdates({
	spreadsheetData,
}: {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
}) {
	const eventSheetRows = getSheetRows(spreadsheetData, 'Club Events');

	const events = getEventsFromSheetRows(eventSheetRows);

	const githubFiles = await retrieveGithubFiles('/data/events');
	const githubClubUpdates = await getGithubEntryUpdates<ClubEvent>({
		githubFiles,
		googleSheetEntries: googleSheetEvents,
	});

	return githubClubUpdates;
}
