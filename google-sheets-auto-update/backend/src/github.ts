import { Octokit } from 'octokit';
import { Entry } from '~types/entry';

if (!process.env.GITHUB_TOKEN) {
	console.warn('GITHUB_TOKEN was not found in environment.');
}

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export type GithubFile = {
	name: string;
	download_url: string;
	sha: string;
};

export type GithubEntryUpdate<T extends Entry = Entry> = {
	entry: T;
	githubFileSha?: string;
};
