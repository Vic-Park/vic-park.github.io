import type { sheets_v4 } from 'googleapis';
import type { ClubAnnouncement } from '~types/announcement';
import { octokit } from '../github';

export default async function handleAnnouncements({ data }: { data: sheets_v4.Schema$Spreadsheet }) {
  const clubAnnouncementsSheet = data.sheets.find(
    sheet => sheet.properties.title === 'Club Announcements'
  );

  const announcements: ClubAnnouncement[] = clubAnnouncementsSheet.data[0].rowData
    .slice(1)
    .map(({ values }) => {
      const [title, date, content] = values.map(value => value.formattedValue);

      return {
        title,
        date: new Date(date),
        content,
        slug: title,
      };
    });
   
  // Retrieving the existing announcements from the GitHub repository
 await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'Vic-Park',
    repo: 'vic-park.github.io',
    path: '/data/announcements',
  });
}
