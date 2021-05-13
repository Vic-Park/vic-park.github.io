import { AlteredSheetEntry } from '~/types';
import { octokit } from '~/github';
import matter from 'gray-matter';

export async function updateGithubFiles(
  alteredGoogleSheetEntries: AlteredSheetEntry[]
) {
  for (let i = 0; i < alteredGoogleSheetEntries.length; ++i) {
    const { entry, entryType } = alteredGoogleSheetEntries[i];

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      path: `/data/${entryType}/${entry.slug}.md`,
      message: `Update ${entry.slug}.md${
        i < alteredGoogleSheetEntries.length - 1 ? '[ci skip]' : ''
      }`,
      content: matter.stringify(entry.content ?? '', entry),
      owner: 'Vic-Park',
      repo: 'vic-park.github.io',
      branch: 'dev',
    });
  }
}
