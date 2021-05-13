import type { GrayMatterFile, Input } from 'gray-matter';
import matter from 'gray-matter';
import axios from 'axios';
import deepEqual from 'deep-equal';
import { octokit } from '~/github';

type Entry = {
  slug: string;
};

type FilterAlteredSheetEntriesParams<T> = {
  githubFiles: { name: string; download_url: string }[];
  googleSheetEntries: T[];
  convertMatterFileToEntry: (
    matterFile: GrayMatterFile<Input> & { data: T }
  ) => T;
};

export async function filterAlteredSheetEntries<T extends Entry>({
  githubFiles,
  googleSheetEntries,
  convertMatterFileToEntry,
}: FilterAlteredSheetEntriesParams<T>): Promise<T[]> {
  const alteredSheetEntries: T[] = [];

  for (const githubFile of githubFiles) {
    if (githubFile.name === 'index.ts') continue;

    // Retrieving the club file from GitHub and parsing it into a `Club` object
    const response = await axios.get(githubFile.download_url);
    const fileContents = response.data;

    const matterFile = matter(fileContents) as GrayMatterFile<Input> & {
      data: T;
    };
    const githubClubEntry = convertMatterFileToEntry(matterFile);

    // Retrieving the corresponding club entry on the Google Sheets (based on the slug)
    const googleSheetEntry = googleSheetEntries.find(
      ({ slug }) => githubClubEntry.slug === slug
    );

    // If the parsed google sheet entry isn't found in an existing GitHub file, or if the
    // parsed google sheet entry isn't equivalent to the parsed github entry, then
    // append the google sheet entry file to a list of entries that need to be updated
    if (
      googleSheetEntry === undefined ||
      deepEqual(googleSheetEntry, githubClubEntry)
    ) {
      alteredSheetEntries.push(googleSheetEntry);
    }
  }

  return alteredSheetEntries;
}

type GithubFile = {
  name: string;
  download_url: string;
};

export async function retrieveGithubFiles(path: string): Promise<GithubFile[]> {
  // Retrieving the existing announcements from the GitHub repository
  const octokitResponse = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: 'Vic-Park',
      repo: 'vic-park.github.io',
      path: path,
    }
  );

  const githubFiles = octokitResponse.data as GithubFile[];

  return githubFiles;
}
