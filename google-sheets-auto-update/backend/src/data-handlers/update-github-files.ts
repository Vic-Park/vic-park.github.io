import { encode } from 'js-base64';
import { inspect } from 'util';

import { octokit } from '~/github';
import type { GithubEntryUpdate } from '~/types/github';

import { getEntryTypeFolder } from './utils';
import { getEntrySlug } from './utils/get-entry-slug';
import { stringifyEntry } from './utils/stringify-entry';

export async function updateGithubFiles(
	githubEntryUpdates: GithubEntryUpdate[]
) {
	for (let i = 0; i < githubEntryUpdates.length; i += 1) {
		const { entry, githubFileSha } = githubEntryUpdates[i];
		const slug = getEntrySlug(entry);
		const { type } = entry;

		try {
			const response = await octokit.request(
				'PUT /repos/{owner}/{repo}/contents/{path}',
				{
					path: `${getEntryTypeFolder(type)}/${slug}.md`,
					message: `Update ${slug}.md${
						i < githubEntryUpdates.length - 1 ? ' [ci skip]' : ''
					}`,
					content: encode(stringifyEntry(entry)),
					owner: 'Vic-Park',
					repo: 'vic-park.github.io',
					branch: 'dev',
					sha: githubFileSha,
				}
			);
			console.info(response);
		} catch (error) {
			console.info(`Failed to update file: ${inspect(githubEntryUpdates[i])} `);
			console.error(error);
		}
	}
}
