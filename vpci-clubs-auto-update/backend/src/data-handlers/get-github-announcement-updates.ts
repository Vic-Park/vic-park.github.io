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

export async function getGithubAnnouncementUpdates({
	spreadsheetData,
}: {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
}) {
	const announcementRows = getSheetRows(spreadsheetData, 'Club Announcements');

	const announcementSheetEntries = parseSheetRows<EntryType.announcement>(
		announcementRows,
		(announcement) => {
			const [title, date, content] = normalizeSheetRow(announcement);

			if (!isValidDate(date)) {
				return { failure: true, reason: 'Invalid date.' };
			}

			return {
				data: { date: new Date(date).toISOString(), content, title },
				type: EntryType.announcement,
			};
		}
	);

	const announcementEntries = filterValidSheetEntries<EntryType.announcement>(
		announcementSheetEntries
	);
	const githubFiles = await retrieveGithubFiles('/data/announcements');
	const githubAnnouncementUpdates =
		await getGithubEntryUpdates<EntryType.announcement>({
			githubFiles,
			googleSheetEntries: announcementEntries,
		});

	return githubAnnouncementUpdates;
}
