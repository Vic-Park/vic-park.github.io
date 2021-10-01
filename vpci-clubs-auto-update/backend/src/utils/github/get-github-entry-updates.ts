import type { sheets_v4 as SheetsV4 } from 'googleapis';
import got from 'got';

import type { GithubEntryUpdate } from '~/types/github';
import { GithubEntryUpdateType } from '~/types/github';
import { EntryType } from '~shared/types/entry';

import {
	filterValidSheetEntries,
	getEntrySlug,
	stringifyEntry,
} from '../entry';
import type { SheetRowParser } from '../sheets';
import { getSheetRows, parseSheetRows } from '../sheets';
import { retrieveGithubFiles } from './retrieve-github-files';

type GetGithubEntryUpdatesProps<T extends EntryType> = {
	spreadsheetData: SheetsV4.Schema$Spreadsheet;
	sheetRowParser: SheetRowParser<T>;
	entryType: T;
};

const entryTypeToSheetRow = {
	[EntryType.club]: 'Clubs',
	[EntryType.event]: 'Club Events',
	[EntryType.announcement]: 'Club Announcements',
};

const entryTypeToDataFolder = {
	[EntryType.club]: '/data/clubs',
	[EntryType.event]: '/data/event',
	[EntryType.announcement]: '/data/announcements',
};

/**
 * Returns an array containing all the necessary changes to be made to the current GitHub files (add, update, or delete)
 * based on the current google sheet entries. The github files should be the current GitHub files located inside a data
 * folder (/data/<data type>) and the google sheet entries should be an array of parsed entries retrieved
 * from the google sheet.
 */
export async function getGithubEntryUpdates<T extends EntryType>({
	spreadsheetData,
	sheetRowParser,
	entryType,
}: GetGithubEntryUpdatesProps<T>): Promise<GithubEntryUpdate<T>[]> {
	const entryRows = getSheetRows(
		spreadsheetData,
		entryTypeToSheetRow[entryType]
	);

	const sheetEntries = filterValidSheetEntries(
		parseSheetRows<T>(entryRows, sheetRowParser)
	);

	const githubFiles = await retrieveGithubFiles(
		entryTypeToDataFolder[entryType]
	);

	const githubEntryUpdates: GithubEntryUpdate<T>[] = [];

	// Looping through all the google sheet entries and then trying to find the
	// corresponding GitHub file. If the corresponding GitHub file is not found, the
	// entry needs to be created. If the contents of the corresponding GitHub file
	// does not match the contents of the Google Sheet file, then the GitHub file needs
	// to be updated.
	for (const googleSheetEntry of sheetEntries) {
		// Attempting to find the corresponding GitHub file
		const githubFile = githubFiles.find(
			({ name }) => name === `${getEntrySlug(googleSheetEntry)}.yaml`
		);

		// If the parsed google sheet entry isn't found in an existing GitHub file, the GitHub
		// file needs to be added
		if (githubFile === undefined) {
			githubEntryUpdates.push({
				type: GithubEntryUpdateType.add,
				entry: googleSheetEntry,
			});
		} else {
			// Otherwise, retrieve the current contents of the GitHub file to compare the google sheet
			// entry
			const response = await got.get(githubFile.download_url);
			const fileContents = response.body;

			// If the stringified google sheet entry isn't equivalent to the stringify github entry,
			// the GitHub file needs to be updated
			if (fileContents !== stringifyEntry(googleSheetEntry)) {
				githubEntryUpdates.push({
					type: GithubEntryUpdateType.update,
					entry: googleSheetEntry,
					githubFile,
				});
			}
		}
	}

	// Loop through the existing GitHub files and find the corresponding google sheet entry for each one.
	// If the corresponding google sheet entry cannot be found, it means that the GitHub file needs to be
	// deleted
	for (const githubFile of githubFiles) {
		// Attempting to find the corresponding google sheet entry
		const correspondingGoogleSheetFile = sheetEntries.find(
			(sheetEntry) => getEntrySlug(sheetEntry) === githubFile.name
		);

		// If the corresponding google sheet entry cannot be found, the GitHub file needs to be deleted
		if (correspondingGoogleSheetFile === undefined) {
			githubEntryUpdates.push({
				type: GithubEntryUpdateType.delete,
				githubFile,
			});
		}
	}

	return githubEntryUpdates;
}
