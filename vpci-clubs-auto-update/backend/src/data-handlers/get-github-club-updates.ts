import type { sheets_v4 as SheetsV4 } from 'googleapis';

import { EntryType } from '~shared/types/entry';

import {
	getGithubEntryUpdates,
	getSheetRows,
	retrieveGithubFiles,
} from './utils';
import { normalizeSheetRow } from './utils/normalize';
import { parseSheetRows } from './utils/parse-sheet-rows';
import { filterValidSheetEntries } from './utils/validate-entry';

export async function getGithubClubUpdates({
	spreadsheetData,
}: {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
}) {
	const clubRows = getSheetRows(spreadsheetData, 'Clubs');
	const clubSheetEntries = parseSheetRows<EntryType.club>(clubRows, (club) => {
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
		] = normalizeSheetRow(club);

		return {
			data: {
				slug,
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
			type: EntryType.club,
		};
	});

	const clubsEntries =
		filterValidSheetEntries<EntryType.club>(clubSheetEntries);
	const githubFiles = await retrieveGithubFiles('/data/clubs');
	const githubClubUpdates = await getGithubEntryUpdates<EntryType.club>({
		githubFiles,
		googleSheetEntries: clubsEntries,
	});

	return githubClubUpdates;
}
