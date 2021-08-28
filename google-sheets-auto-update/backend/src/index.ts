import 'dotenv/config';
import 'module-alias/register';
import fastify from 'fastify';
import fastifyRateLimit from 'fastify-rate-limit';
import { sheets, spreadsheetId } from './google';
import {
	getGithubClubUpdates,
	getGithubAnnouncementUpdates,
	getGithubEventUpdates,
} from './data-handlers';
import { updateGithubFiles } from './data-handlers/updateGithubFiles';
import fastifyStatic from 'fastify-static';
import path from 'path';

const app = fastify();

// Registering a rate limit plugin for fastify to prevent brute-force attacks against the secret.
app.register(fastifyRateLimit, {
	// Maximum 3 requests within 5 seconds
	max: 3,
	timeWindow: 5000,
});

// Registering a fastify plugin to serve files in /public
app.register(fastifyStatic, {
	root: path.join(__dirname, 'public'),
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
