import dayjs from 'dayjs';
import type { sheets_v4 as SheetsV4 } from 'googleapis';

import { EntryType } from '~shared/types/entry';

import {
	getGithubEntryUpdates,
	getSheetRows,
	retrieveGithubFiles,
} from './utils';
import { normalizeSheetRow } from './utils/normalize';
import { parseSheetRows } from './utils/parse-sheet-rows';
import { isValidDate } from './utils/validate-date';
import { filterValidSheetEntries } from './utils/validate-entry';

export async function getGithubEventUpdates({
	spreadsheetData,
}: {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
}) {
	const eventRows = getSheetRows(spreadsheetData, 'Club Events');

	const eventSheetEntries = parseSheetRows<EntryType.event>(
		eventRows,
		(event) => {
			const [name, description, information, start, end, isSchoolWideEvent] =
				normalizeSheetRow(event);

			if (!isValidDate(start, { allowUndefined: true })) {
				return { failure: true, reason: 'Invalid start date' };
			}

			if (!isValidDate(end, { allowUndefined: true })) {
				return { failure: true, reason: 'Invalid end date' };
			}

			return {
				data: {
					name,
					description,
					information,
					start:
						start === undefined ? undefined : dayjs.tz(start).toISOString(),
					end: end === undefined ? undefined : dayjs.tz(end).toISOString(),
					isSchoolWideEvent: isSchoolWideEvent?.toLowerCase() === 'yes',
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
