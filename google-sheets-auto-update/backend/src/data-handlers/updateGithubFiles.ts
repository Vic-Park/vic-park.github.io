import { GithubEntryUpdate, octokit } from '~/github';
import { encode } from 'js-base64';
import { getEntryTypeFolder } from './utils';
import util from 'util';
import { stringifyEntry } from './utils/stringifyEntry';

export async function updateGithubFiles(
	githubEntryUpdates: GithubEntryUpdate[]
) {
	for (let i = 0; i < githubEntryUpdates.length; ++i) {
		const { entry, githubFileSha } = githubEntryUpdates[i];
		const { slug, type } = entry;

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
		} catch (e) {
			console.info(
				`Failed to update file: ${util.inspect(githubEntryUpdates[i])} `
			);
			console.error(e);
		}
	}
}
