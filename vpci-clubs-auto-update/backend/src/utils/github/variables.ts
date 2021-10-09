import { Octokit } from 'octokit';

if (!process.env.GITHUB_TOKEN) {
	console.warn('GITHUB_TOKEN was not found in environment.');
}

export const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

export const branchToUpdate = process.env.BRANCH_TO_UPDATE ?? 'dev';
