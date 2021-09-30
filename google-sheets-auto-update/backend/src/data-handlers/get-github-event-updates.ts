import type { sheets_v4 as SheetsV4 } from 'googleapis';

import type { SheetEntry } from '~/types/sheets';
import { EntryType } from '~shared/types/entry';

import {
	getGithubEntryUpdates,
	getSheetRows,
	retrieveGithubFiles,
} from './utils';
import { normalizeSheetRow } from './utils/normalize';
import { filterValidSheetEntries } from './utils/validate-entry';

export async function getGithubEventUpdates({
	spreadsheetData,
}: {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
}) {
	const eventRows = getSheetRows(spreadsheetData, 'Club Events');

	const eventSheetEntries: SheetEntry<EntryType.event>[] = eventRows.map(
		(event) => {
			const [name, description, information, start, end, isSchoolWideEvent] =
				normalizeSheetRow(event);

			return {
				data: {
					name,
					description,
					information,
					start,
					end,
					isSchoolWideEvent: isSchoolWideEvent === 'true',
				},
				type: EntryType.event,
			};
		}
	);

	const eventEntries =
		filterValidSheetEntries<EntryType.event>(eventSheetEntries);
	const githubFiles = await retrieveGithubFiles('/data/events');
	const githubClubUpdates = await getGithubEntryUpdates<EntryType.event>({
		githubFiles,
		googleSheetEntries: eventEntries,
	});

	return githubClubUpdates;
}
