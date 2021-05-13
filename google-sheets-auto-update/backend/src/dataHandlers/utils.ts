import type { GrayMatterFile, Input } from 'gray-matter';
import matter from 'gray-matter';
import axios from 'axios';
import deepEqual from 'deep-equal';
import { GithubFile, octokit } from '~/github';

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

  for (const googleSheetEntry of googleSheetEntries) {
    const githubFile = githubFiles.find(
      ({ name }) => name === `${googleSheetEntry.slug}.md`
    );

    // If the parsed google sheet entry isn't found in an existing GitHub file
    if (githubFile === undefined) {
      alteredSheetEntries.push(googleSheetEntry);
      continue;
    }

    // Otherwise, compare the google sheet entry with the GitHub file
    const response = await axios.get(githubFile.download_url);
    const fileContents = response.data;
    const matterFile = matter(fileContents) as GrayMatterFile<Input> & {
      data: T;
    };
    const githubClubEntry = convertMatterFileToEntry(matterFile);

    // If parsed google sheet entry isn't equivalent to the parsed github entry, then
    // append the google sheet entry file to a list of entries that need to be updated
    if (!deepEqual(googleSheetEntry, githubClubEntry)) {
      alteredSheetEntries.push(googleSheetEntry);
    }
  }

  return alteredSheetEntries;
}

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
