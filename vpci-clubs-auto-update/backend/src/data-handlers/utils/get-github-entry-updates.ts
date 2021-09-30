import got from 'got';
import yaml from 'js-yaml';

import type { GithubEntryUpdate, GithubFile } from '~/types/github';
import type { Entry, EntryType } from '~shared/types/entry';

import { getEntrySlug } from './get-entry-slug';

type FilterAlteredSheetEntriesParams<T extends EntryType> = {
	githubFiles: GithubFile[];
	googleSheetEntries: Entry<T>[];
};

export async function getGithubEntryUpdates<T extends EntryType>({
	githubFiles,
	googleSheetEntries,
}: FilterAlteredSheetEntriesParams<T>): Promise<GithubEntryUpdate<T>[]> {
	const alteredSheetEntries: GithubEntryUpdate<T>[] = [];

	for (const googleSheetEntry of googleSheetEntries) {
		const githubFile = githubFiles.find(
			({ name }) => name === `${getEntrySlug(googleSheetEntry)}.yaml`
		);

		// If the parsed google sheet entry isn't found in an existing GitHub file
		if (githubFile === undefined) {
			alteredSheetEntries.push({
				entry: googleSheetEntry,
			});
			continue;
		}

		// Otherwise, compare the google sheet entry with the GitHub file
		const response = await got.get(githubFile.download_url);
		const fileContents = response.body;

		// If the parsed google sheet entry isn't equivalent to the parsed github entry,
		// append the google sheet entry file to a list of entries that need to be updated
		if (fileContents !== yaml.dump(googleSheetEntry)) {
			alteredSheetEntries.push({
				entry: googleSheetEntry,
				githubFileSha: githubFile.sha,
			});
		}
	}

	return alteredSheetEntries;
}
