import { octokit } from '~/github';
import matter from 'gray-matter';
import { Entry } from '~types/entry';

export async function updateGithubFiles(alteredGoogleSheetEntries: Entry[]) {
  for (let i = 0; i < alteredGoogleSheetEntries.length; ++i) {
    const { metadata, slug, type, content } = alteredGoogleSheetEntries[i];

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      path: `/data/${type}/${slug}.md`,
      message: `Update ${slug}.md${
        i < alteredGoogleSheetEntries.length - 1 ? '[ci skip]' : ''
      }`,
      content: matter.stringify(content ?? '', metadata),
      owner: 'Vic-Park',
      repo: 'vic-park.github.io',
      branch: 'dev',
    });
  }
}
