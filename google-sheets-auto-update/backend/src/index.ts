import 'dotenv/config';
import 'module-alias/register';
import fastify from 'fastify';
import fastifyRateLimit from 'fastify-rate-limit';
import type { Club } from '~types/club';
import type { ClubEvent } from '~types/event';
import type { ClubAnnouncement } from '~types/announcement';
import { sheets, spreadsheetId } from './google';
import handleAnnouncements from './dataHandlers/handleAnnouncements';
import handleClubs from './dataHandlers/handleClubs';
import handleEvents from './dataHandlers/handleEvents';

const app = fastify();

// Registering a rate limit plugin for fastify to prevent brute-force attacks against the secret.
app.register(fastifyRateLimit, {
  max: 3,
  // 5 second
  timeWindow: 5000,
});


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

  handleAnnouncements({ data });
  handleClubs({ data });
  handleEvents({ data });

  reply.status(200).send('');

  return;

  if (!data) {
    reply.status(400).send('Server error: metadata not found on spreadsheet.');
    return;
  }

  // Retrieving the existing club files from the repository
 

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
