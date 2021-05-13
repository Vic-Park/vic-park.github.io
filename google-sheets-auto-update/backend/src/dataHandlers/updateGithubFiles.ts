import { octokit } from '~/github';
import matter from 'gray-matter';
import { Entry } from '~types/entry';
import { encode } from 'js-base64';

export async function updateGithubFiles(alteredGoogleSheetEntries: Entry[]) {
  for (let i = 0; i < alteredGoogleSheetEntries.length; ++i) {
    const { metadata, slug, type, content } = alteredGoogleSheetEntries[i];

    try {
      const response = await octokit.request(
        'PUT /repos/{owner}/{repo}/contents/{path}',
        {
          path: `data/${type}/${slug}.md`,
          message: `Update ${slug}.md${
            i < alteredGoogleSheetEntries.length - 1 ? '[ci skip]' : ''
          }`,
          content: encode(matter.stringify(content ?? '', metadata)),
          owner: 'Vic-Park',
          repo: 'vic-park.github.io',
          branch: 'dev',
        }
      );
      console.info(response);
    } catch (e) {
      console.error(e);
    }
  }
}
