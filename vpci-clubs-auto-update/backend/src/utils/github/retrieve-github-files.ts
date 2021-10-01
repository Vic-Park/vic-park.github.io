import type { GithubFile } from '~/types/github';

import { octokit } from './variables';

export async function retrieveGithubFiles(path: string): Promise<GithubFile[]> {
	// Retrieving the existing announcements from the GitHub repository
	const octokitResponse = await octokit.request(
		'GET /repos/{owner}/{repo}/contents/{path}',
		{
			owner: 'Vic-Park',
			repo: 'vic-park.github.io',
			path,
			ref: process.env.UPDATE_BRANCH ?? 'dev',
		}
	);

	const githubFiles = octokitResponse.data as GithubFile[];

	return githubFiles;
}
