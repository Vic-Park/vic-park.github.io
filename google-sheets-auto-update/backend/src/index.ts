import 'dotenv/config';
import 'module-alias/register';
import fastify from 'fastify';
import fastifyRateLimit from 'fastify-rate-limit';
import { sheets, spreadsheetId } from './google';
import {
  retrieveAlteredSheetAnnouncements,
  retrieveAlteredSheetClubs,
  retrieveAlteredSheetEvents,
} from './dataHandlers';
import { updateGithubFiles } from './dataHandlers/updateGithubFiles';

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

  // Retrieving the data from the Google Sheets
  const { data: spreadsheetData } = await sheets.spreadsheets.get({
    spreadsheetId,
    includeGridData: true,
  });

  const alteredSheetEntries = [
    ...(await retrieveAlteredSheetEvents({ spreadsheetData })),
    ...(await retrieveAlteredSheetClubs({ spreadsheetData })),
    ...(await retrieveAlteredSheetAnnouncements({ spreadsheetData })),
  ];

  if (alteredSheetEntries.length === 0) {
    reply.status(200).send('No entries were altered; nothing changed.');
    return;
  }

  updateGithubFiles(alteredSheetEntries);

  reply.send('Request successfully processed.');
});

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server listening on ${address}`);
});
