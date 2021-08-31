import type { sheets_v4 as SheetsV4 } from 'googleapis';

import type { Club } from '~types/club';
import { EntryType } from '~types/entry';

import {
	getGithubEntryUpdates,
	getSheetRows,
	retrieveGithubFiles,
} from './utils';
import { cleanSheetRow } from './utils/clean-sheet-row';

export async function getGithubClubUpdates({
	spreadsheetData,
}: {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
}) {
	const clubEntries = getSheetRows(spreadsheetData, 'Clubs');
	const googleSheetClubs: Club[] = clubEntries.map((club) => {
		const [
			_timestamp,
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
			_accessToSourceCode,
			equityStatement,
			slug,
		] = cleanSheetRow(club);

		if (slug.length > 20) throw new Error('Slug is too long.');

		return {
			metadata: {
				categories,
				clubLeaders,
				extraInformation,
				joinInstructions,
				meetingTimes,
				name,
				onlinePlatforms,
				shortDescription,
				staffSupervisor,
				timeCommitment,
				equityStatement,
			},
			slug,
			type: EntryType.club,
		};
	});

	const githubFiles = await retrieveGithubFiles('/data/clubs');
	const githubClubUpdates = await getGithubEntryUpdates<Club>({
		githubFiles,
		googleSheetEntries: googleSheetClubs,
	});

	return githubClubUpdates;
}
