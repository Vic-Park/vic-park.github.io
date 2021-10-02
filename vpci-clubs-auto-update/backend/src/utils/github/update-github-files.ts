import got from 'got';

import type { GithubEntryUpdate } from '~/types/github';
import { GithubEntryUpdateType } from '~/types/github';

import { getEntrySlug, getEntryTypeFolder, stringifyEntry } from '../entry';
import { branchToUpdate, octokit } from './variables';

type TreeItem = {
	path?: string;
	mode?: '100644' | '100755' | '040000' | '160000' | '120000';
	type?: 'blob' | 'tree' | 'commit';
	sha?: string | null;
	content?: string;
};

const owner = 'Vic-Park';
const repo = 'vic-park.github.io';

export async function updateGithubFiles(
	githubEntryUpdates: GithubEntryUpdate[]
) {
	console.info('Retrieving the current branch ref...');
	const getRefResponse = await octokit.rest.git.getRef({
		owner,
		repo,
		ref: `heads/${branchToUpdate}`,
	});
	const baseTree = getRefResponse.data.ref;
	const treeItems: TreeItem[] = [];

	console.info('Processing the entry updates...');
	for (const githubEntryUpdate of githubEntryUpdates) {
		if (githubEntryUpdate.type === GithubEntryUpdateType.delete) {
			treeItems.push({
				path: githubEntryUpdate.githubFile.path,
				// eslint-disable-next-line unicorn/no-null
				sha: null,
				mode: '100644',
				type: 'commit',
			});
		} else if (
			githubEntryUpdate.type === GithubEntryUpdateType.add ||
			githubEntryUpdate.type === GithubEntryUpdateType.update
		) {
			const slug = getEntrySlug(githubEntryUpdate.entry);
			const blobResponse = await octokit.rest.git.createBlob({
				owner,
				repo,
				content: Buffer.from(stringifyEntry(githubEntryUpdate.entry)).toString(
					'base64'
				),
				encoding: 'base64',
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

	console.log(treeItems);

	console.info('Creating the tree...');
	const createTreeResponse = await octokit.rest.git.createTree({
		owner,
		repo,
		tree: treeItems,
		base_tree: baseTree,
	});

	const tree = createTreeResponse.data;

	console.log(tree);
	console.info('Creating the commit...');
	const commitResponse = await octokit.rest.git.createCommit({
		message: 'Update data',
		owner,
		repo,
		tree: tree.sha,
		parents: [baseTree],
	});

	console.info('Updating the ref...');
	await octokit.rest.git.updateRef({
		owner,
		repo,
		force: true,
		ref: `heads/${branchToUpdate}`,
		sha: commitResponse.data.sha,
	});
}
