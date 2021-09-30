import type { Entry, EntryType } from '~shared/types/entry';

export type GithubFile = {
	name: string;
	// eslint-disable-next-line camelcase
	download_url: string;
	sha: string;
};

export type GithubEntryUpdate<T extends EntryType = EntryType> = {
	entry: Entry<T>;
	githubFileSha?: string;
};
