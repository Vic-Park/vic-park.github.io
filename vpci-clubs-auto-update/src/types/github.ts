import type { Entry, EntryType } from '~shared/types/entry';

export type GithubFile = {
	name: string;
	path: string;
	// eslint-disable-next-line camelcase
	download_url: string;
	sha: string;
};

export enum GithubEntryUpdateType {
	add = 'add',
	update = 'update',
	delete = 'delete',
}

export type GithubEntryUpdate<T extends EntryType = EntryType> =
	| {
			type: GithubEntryUpdateType.add;
			entry: Entry<T>;
	  }
	| {
			type: GithubEntryUpdateType.delete;
			githubFile: GithubFile;
	  }
	| {
			type: GithubEntryUpdateType.update;
			entry: Entry<T>;
			githubFile: GithubFile;
	  };
