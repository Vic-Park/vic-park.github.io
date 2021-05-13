import { Octokit } from 'octokit';

if (!process.env.GITHUB_TOKEN) {
  console.warn('GITHUB_TOKEN was not found in environment.');
}

export const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export type GithubFile = {
  name: string;
  download_url: string;
};
