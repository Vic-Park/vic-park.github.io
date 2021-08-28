import axios from 'axios';

import { GithubEntryUpdate, GithubFile } from '~/github';
import { Entry } from '~types/entry';

import { stringifyEntry } from './stringify-entry';

type FilterAlteredSheetEntriesParams<T> = {
	githubFiles: GithubFile[];
	googleSheetEntries: T[];
};

export async function getGithubEntryUpdates<T extends Entry>({
	githubFiles,
	googleSheetEntries,
}: FilterAlteredSheetEntriesParams<T>): Promise<GithubEntryUpdate<T>[]> {
	const alteredSheetEntries: GithubEntryUpdate<T>[] = [];

	for (const googleSheetEntry of googleSheetEntries) {
		const githubFile = githubFiles.find(
			({ name }) => name === `${googleSheetEntry.slug}.md`
		);

		// If the parsed google sheet entry isn't found in an existing GitHub file
		if (githubFile === undefined) {
			alteredSheetEntries.push({
				entry: googleSheetEntry,
			});
			continue;
		}

		// Otherwise, compare the google sheet entry with the GitHub file
		const response = await axios.get(githubFile.download_url);
		const fileContents = response.data;

		// If the parsed google sheet entry isn't equivalent to the parsed github entry,
		// append the google sheet entry file to a list of entries that need to be updated
		if (fileContents !== stringifyEntry(googleSheetEntry)) {
			alteredSheetEntries.push({
				entry: googleSheetEntry,
				githubFileSha: githubFile.sha,
			});
		}
	}

	return alteredSheetEntries;
}
