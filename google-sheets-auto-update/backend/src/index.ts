import 'dotenv/config';
import 'module-alias/register';
import { google } from 'googleapis';
import fastify from 'fastify';
import { Octokit } from 'octokit';
import fastifyRateLimit from 'fastify-rate-limit';
import type { Club } from '~types/club';
import type { Event } from '~types/event';
import type { Announcement } from '~types/announcement';
import { content } from 'googleapis/build/src/apis/content';

const authClient = new google.auth.GoogleAuth({
  keyFile: './client_secret.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({
  version: 'v4',
  auth: authClient,
});

const spreadsheetId = process.env.SPREADSHEET_ID;

const app = fastify();

// Registering a rate limit plugin for fastify to prevent brute-force attacks against the secret.
app.register(fastifyRateLimit, {
  max: 3,
  // 5 second
  timeWindow: 5000,
});

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

type RequestBody = {
  secret: string;
};

app.post('/', async (request, reply) => {
  const { secret } = request.body as RequestBody;

  if (secret !== process.env.SECRET) {
    reply.status(403).send('Not authorized; incorrect secret provided.');
    return;
  }

  // Retrieving the metadata of the spreadsheet
  const { data } = await sheets.spreadsheets.get({
    spreadsheetId,
    includeGridData: true,
  });
  const clubsSheet = data.sheets.find(
    sheet => sheet.properties.title === 'Clubs'
  );
  const clubAnnouncementsSheet = data.sheets.find(
    sheet => sheet.properties.title === 'Club Announcements'
  );
  const clubEventsSheet = data.sheets.find(
    sheet => sheet.properties.title === 'Club Events'
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

  const announcements: Announcement[] = clubAnnouncementsSheet.data[0].rowData.slice(1).map(({ values }) => {
    const [title, date, content] = values.map((value) => value.formattedValue);

    return {
      title,
      date: new Date(date),
      content,
      slug: title,
    }
  });

  const events: Event[] = clubEventsSheet.data[0].rowData.slice(1).map(({values}) => {
    const [name, description, information, start, end] = values.map((value) => value.formattedValue);

    return {
      name,
      description,
      start: new Date(start),
      end: new Date(end),
      content: information,
      slug: name,
    }
  });

  console.log(events, announcements, clubs);

  reply.status(200).send('');

  return;

  if (!data) {
    reply.status(400).send('Server error: metadata not found on spreadsheet.');
    return;
  }

  // Retrieving the existing club files from the repository
  await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'Vic-Park',
    repo: 'vic-park.github.io',
    path: 'data/clubs',
  });

  /*
  octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    content: "",
  });
  */

  reply.send('Request successfully processed.');
});

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server listening on ${address}`);
});
