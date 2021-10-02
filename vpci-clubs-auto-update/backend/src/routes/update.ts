import dayjs from 'dayjs';
import type { FastifyInstance } from 'fastify';

import { isValidDate } from '~/utils/date';
import { getGithubEntryUpdates } from '~/utils/github';
import { updateGithubFiles } from '~/utils/github/update-github-files';
import { sheets, spreadsheetId } from '~/utils/google';
import { normalizeSheetRow } from '~/utils/sheets';
import * as AutoUpdate from '~shared/types/auto-update';
import { EntryType } from '~shared/types/entry';

type RequestBody = {
	secret: string;
};

export default async function updateRoute(app: FastifyInstance) {
	app.post<{ Reply: AutoUpdate.Reply }>('/update', async (request, reply) => {
		const { secret } = request.body as RequestBody;

		if (secret !== process.env.SECRET) {
			reply.status(403).send({
				code: AutoUpdate.ReplyCode.INCORRECT_SECRET,
			});
			return;
		}

		// Retrieving the data from the Google Sheets
		const { data: spreadsheetData } = await sheets.spreadsheets.get({
			spreadsheetId,
			includeGridData: true,
		});

		console.info('Retrieving GitHub entry updates...');
		const githubEntryUpdates = [
			...(await getGithubEntryUpdates({
				spreadsheetData,
				entryType: EntryType.announcement,
				sheetRowParser(announcementRow) {
					const [title, date, content] = normalizeSheetRow(announcementRow);

					if (!isValidDate(date)) {
						return { failure: true, reason: 'Invalid date.' };
					}

					return {
						data: { date: dayjs.tz(date!).toISOString(), content, title },
						type: EntryType.announcement,
					};
				},
			})),
			...(await getGithubEntryUpdates({
				spreadsheetData,
				entryType: EntryType.club,
				sheetRowParser(clubRow) {
					const [
						_timestamp,
						name,
						staffSupervisor,
						clubLeaders,
						shortDescription,
						categories,
						meetingTimes,
						joinInstructions,
						onlinePlatforms,
						extraInformation,
						timeCommitment,
						_accessToSourceCode,
						equityStatement,
						slug,
					] = normalizeSheetRow(clubRow);

					return {
						data: {
							slug,
							categories,
							clubLeaders,
							extraInformation,
							joinInstructions,
							meetingTimes,
							name,
							onlinePlatforms,
							shortDescription,
							staffSupervisor,
							timeCommitment,
							equityStatement,
						},
						type: EntryType.club,
					};
				},
			})),
			...(await getGithubEntryUpdates({
				spreadsheetData,
				entryType: EntryType.event,
				sheetRowParser(eventRow) {
					const [
						name,
						description,
						information,
						start,
						end,
						isSchoolWideEvent,
					] = normalizeSheetRow(eventRow);

					if (!isValidDate(start, { allowUndefined: true })) {
						return { failure: true, reason: 'Invalid start date' };
					}

					if (!isValidDate(end, { allowUndefined: true })) {
						return { failure: true, reason: 'Invalid end date' };
					}

					return {
						data: {
							name,
							description,
							information,
							start:
								start === undefined ? undefined : dayjs.tz(start).toISOString(),
							end: end === undefined ? undefined : dayjs.tz(end).toISOString(),
							isSchoolWideEvent: isSchoolWideEvent?.toLowerCase() === 'yes',
						},
						type: EntryType.event,
					};
				},
			})),
		];

		console.log(githubEntryUpdates);
		if (githubEntryUpdates.length === 0) {
			reply.status(200).send({
				code: AutoUpdate.ReplyCode.NO_CHANGE,
			});
			return;
		}

		console.info('Updating GitHub files...');
		const updateCommitSha = await updateGithubFiles(githubEntryUpdates);

		reply.send({
			code: AutoUpdate.ReplyCode.SUCCESS,
			data: {
				commitSha: updateCommitSha,
			},
		});
	});
}
