import axios from 'axios';
import type { GrayMatterFile, Input } from 'gray-matter';
import { Entry } from '~types/entry';
import matter from 'gray-matter';
import deepEqual from 'deep-equal';

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

    // If the parsed google sheet entry isn't equivalent to the parsed github entry, 
    // append the google sheet entry file to a list of entries that need to be updated
    if (!deepEqual(googleSheetEntry, githubClubEntry)) {
      alteredSheetEntries.push(googleSheetEntry);
    }
  }

  return alteredSheetEntries;
}
