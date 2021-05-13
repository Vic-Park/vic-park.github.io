import type { sheets_v4 } from 'googleapis';
import { octokit } from '~/github';
import { ClubEvent } from '~types/event';

export default async function handleEvents({ data }: { data: sheets_v4.Schema$Spreadsheet }) {
  const clubEventsSheet = data.sheets.find(
    sheet => sheet.properties.title === 'Club Events'
  );

  const events: ClubEvent[] = clubEventsSheet.data[0].rowData
    .slice(1)
    .map(({ values }) => {
      const [name, description, information, start, end] = values.map(
        value => value.formattedValue
      );

      return {
        name,
        description,
        start: new Date(start),
        end: new Date(end),
        content: information,
        slug: name,
      };
    });

  // Retrieving the existing announcements from the GitHub repository
 await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'Vic-Park',
    repo: 'vic-park.github.io',
    path: '/data/events',
  });
}
