import type { sheets_v4 } from 'googleapis';
import { EntryType } from '~types/entry';
import { ClubEvent } from '~types/event';
import {
	retrieveGithubFiles,
	getGithubEntryUpdates,
	getSheetRows,
} from './utils';
import { cleanSheetRow } from './utils/cleanSheetRow';

export async function getGithubEventUpdates({
	spreadsheetData,
}: {
	spreadsheetData: sheets_v4.Schema$Spreadsheet;
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
