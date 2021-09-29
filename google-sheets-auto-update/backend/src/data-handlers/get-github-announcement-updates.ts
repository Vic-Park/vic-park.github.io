import type { sheets_v4 as SheetsV4 } from 'googleapis';
import { paramCase } from 'param-case';

import {
	getGithubEntryUpdates,
	getSheetRows,
	retrieveGithubFiles,
} from './utils';
import { cleanSheetRow } from './utils/clean-sheet-row';

export async function getGithubAnnouncementUpdates({
	spreadsheetData,
}: {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
}) {
	const announcementEntries = getSheetRows(
		spreadsheetData,
		'Club Announcements'
	);



	const googleSheetAnnouncements: ClubAnnouncement[] = announcementEntries.map(
		(announcement) => {
			const [title, date, content] = cleanSheetRow(announcement);

			return {
				metadata: {
					title,
					date: new Date(date),
				},
				content,
				slug: paramCase(title),
				type: EntryType.announcement,
			};
		}
	);

	const githubFiles = await retrieveGithubFiles('/data/announcements');
	const githubAnnouncementUpdates =
		await getGithubEntryUpdates<ClubAnnouncement>({
			githubFiles,
			googleSheetEntries: googleSheetAnnouncements,
		});

	return githubAnnouncementUpdates;
}
