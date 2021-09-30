import 'dotenv/config';
import 'tsconfig-paths/register';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import fastify from 'fastify';
import fastifyRateLimit from 'fastify-rate-limit';
import fastifyStatic from 'fastify-static';
import path from 'path';

import {
	getGithubAnnouncementUpdates,
	getGithubClubUpdates,
	getGithubEventUpdates,
} from './data-handlers';
import { updateGithubFiles } from './data-handlers/update-github-files';
import { sheets, spreadsheetId } from './google';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Toronto');

const app = fastify();

// Registering a rate limit plugin for fastify to prevent brute-force attacks against the secret.
app.register(fastifyRateLimit, {
	// Maximum 3 requests within 5 seconds
	max: 3,
	timeWindow: 5000,
});

// Registering a fastify plugin to serve files in /public
app.register(fastifyStatic, {
	root: path.join(__dirname, '../public'),
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

	console.info('Retrieving GitHub entry updates...');
	const githubEntryUpdates = [
		...(await getGithubAnnouncementUpdates({ spreadsheetData })),
		...(await getGithubClubUpdates({ spreadsheetData })),
		...(await getGithubEventUpdates({ spreadsheetData })),
	];

	if (githubEntryUpdates.length === 0) {
		reply.status(200).send('No entries were altered; nothing changed.');
		return;
	}

	console.info('Updating GitHub files...');
	await updateGithubFiles(githubEntryUpdates);

	reply.send('Request successfully processed.');
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', (err, address) => {
	if (err) {
		console.error(err);
	}
	console.info(`Server listening on ${address}`);
});
