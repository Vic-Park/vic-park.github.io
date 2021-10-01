import type { GithubEntryUpdate} from '~/types/github';
import { GithubEntryUpdateType } from '~/types/github';

import { getEntrySlug, getEntryTypeFolder, stringifyEntry } from '../entry';
import { octokit } from './variables';

type TreeItem = {
	path?: string;
	mode?: '100644' | '100755' | '040000' | '160000' | '120000';
	type?: 'blob' | 'tree' | 'commit';
	sha?: string | null;
	content?: string;
};

export async function updateGithubFiles(
	githubEntryUpdates: GithubEntryUpdate[]
) {
	const getRefResponse = await octokit.rest.git.getRef({
		owner: 'Vic-Park',
		repo: 'vic-park.github.io',
		ref: `heads/${process.env.UPDATE_BRANCH}`,
	});
	const baseTree = getRefResponse.data.ref;
	const treeItems: TreeItem[] = [];

	for (const githubEntryUpdate of githubEntryUpdates) {
		if (githubEntryUpdate.type === GithubEntryUpdateType.delete) {
			treeItems.push({
				path: githubEntryUpdate.githubFile.path,
				sha: undefined,
				mode: '100644',
				type: 'commit',
			});
		} else if (
			githubEntryUpdate.type === GithubEntryUpdateType.add ||
			githubEntryUpdate.type === GithubEntryUpdateType.update
		) {
			const slug = getEntrySlug(githubEntryUpdate.entry);
			const blobResponse = await octokit.rest.git.createBlob({
				owner: 'Vic-Park',
				repo: 'vic-park.github.io',
				content: Buffer.from(stringifyEntry(githubEntryUpdate.entry)).toString(
					'base64'
				),
			});
			const path = `${getEntryTypeFolder(
				githubEntryUpdate.entry.type
			)}/${slug}.yaml`;
			treeItems.push({
				path,
				type: 'blob',
				sha: blobResponse.data.sha,
				mode: '100644',
			});
		}
	}

	const createTreeResponse = await octokit.rest.git.createTree({
		owner: 'Vic-Park',
		repo: 'vic-park.github.io',
		tree: treeItems,
		base_tree: baseTree,
	});

	const tree = createTreeResponse.data;

	await octokit.rest.git.createCommit({
		owner: 'Vic-Park',
		repo: 'vic-park.github.io',
		message: 'Update data',
		tree: tree.sha,
		parents: [baseTree],
	});

	await octokit.rest.git.updateRef({
		owner: 'Vic-Park',
		repo: 'vic-park.github.io',
		force: true,
		ref: `heads/${process.env.UPDATE_BRANCH}`,
		sha: baseTree,
	});
}
