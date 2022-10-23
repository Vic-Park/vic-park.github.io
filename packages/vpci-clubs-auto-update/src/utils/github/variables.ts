import { Octokit } from 'octokit';

if (!process.env.GH_TOKEN) {
	console.warn('GH_TOKEN was not found in environment.');
}

export const octokit = new Octokit({
	auth: process.env.GH_TOKEN,
});

export const branchToUpdate = process.env.BRANCH_TO_UPDATE ?? 'dev';
