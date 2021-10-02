import { throttling } from '@octokit/plugin-throttling';
import { Octokit } from 'octokit';

if (!process.env.GITHUB_TOKEN) {
	console.warn('GITHUB_TOKEN was not found in environment.');
}

const ThrottledOctokit = Octokit.plugin(throttling);
export const octokit = new ThrottledOctokit({
	auth: process.env.GITHUB_TOKEN,
	onRateLimit: (
		retryAfter: number,
		options: { method: string; url: string; request: { retryCount: number } }
	) => {
		octokit.log.warn(
			`Request quota exhausted for request ${options.method} ${options.url}`
		);

		if (options.request.retryCount === 0) {
			// only retries once
			octokit.log.info(`Retrying after ${retryAfter} seconds!`);
			return true;
		}
	},
	onAbuseLimit: (
		_retryAfter: number,
		options: { method: string; url: string }
	) => {
		// does not retry, only logs a warning
		octokit.log.warn(
			`Abuse detected for request ${options.method} ${options.url}`
		);
	},
});

export const branchToUpdate = process.env.BRANCH_TO_UPDATE ?? 'dev';
