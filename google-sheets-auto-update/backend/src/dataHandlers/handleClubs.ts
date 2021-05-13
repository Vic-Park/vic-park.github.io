import type { sheets_v4 } from 'googleapis';
import type { Club } from '~types/club';
import { octokit } from '~/github';
import axios from 'axios';
import matter from 'gray-matter';

export default async function handleClubs({ data }: { data: sheets_v4.Schema$Spreadsheet }) {
  const clubsSheet = data.sheets.find(
    sheet => sheet.properties.title === 'Clubs'
  );

  const clubs: Club[] = clubsSheet.data[0].rowData.slice(1).map(({ values }) => {
    const [slug, name, staffSupervisor, clubLeaders, shortDescription, categories, meetingTimes, joinInstructions, onlinePlatforms, extraInformation, timeCommitment] = values.map((value) => value.formattedValue);

    return {
      categories: categories.split(','),
      clubLeaders,
      extraInformation,
      joinInstructions,
      meetingTimes,
      name,
      onlinePlatforms,
      shortDescription,
      slug,
      staffSupervisor,
      timeCommitment
    }
  });

  // TODO: strongly type
  // Retrieving the existing announcements from the GitHub repository
  const octokitResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'Vic-Park',
    repo: 'vic-park.github.io',
    path: '/data/clubs',
  });

  const repoFiles = octokitResponse.data as { name: string, download_url: string }[];

  const mdFiles = [];
  for (const repoFile of repoFiles) {
    if (repoFile.name === 'index.ts') continue;

    const response = await axios.get(repoFile.download_url);
    const fileContents = response.data;

    const { data, content } = matter(fileContents);
    const { } =  data as Club;
  }
}
