import type { sheets_v4 as SheetsV4 } from 'googleapis';

import { EntryType } from '~types/entry';
import type { ClubEvent } from '~types/event';

import {
	getGithubEntryUpdates,
	getSheetRows,
	retrieveGithubFiles,
} from './utils';
import { cleanSheetRow } from './utils/clean-sheet-row';

export async function getGithubEventUpdates({
	spreadsheetData,
}: {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
}) {
	const eventsEntries = getSheetRows(spreadsheetData, 'Club Events');

	const googleSheetEvents: ClubEvent[] = eventsEntries.map((event) => {
		const [name, description, information, start, end] = cleanSheetRow(event);

		return {
			metadata: {
				name,
				description,
				start: new Date(start),
				end: new Date(end),
				// TODO: move isSchoolEvent into the google sheets
				isSchoolEvent: false,
			},
			content: information,
			slug: name,
			type: EntryType.event,
		};
	});

	const githubFiles = await retrieveGithubFiles('/data/events');
	const githubClubUpdates = await getGithubEntryUpdates<ClubEvent>({
		githubFiles,
		googleSheetEntries: googleSheetEvents,
	});

	return githubClubUpdates;
}
