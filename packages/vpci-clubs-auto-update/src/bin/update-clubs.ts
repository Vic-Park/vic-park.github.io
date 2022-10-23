import 'dotenv/config';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import fs from 'fs'
import path from 'path'

import { isValidDate } from '~/utils/date';
import { getGithubEntryUpdates } from '~/utils/github';
import { updateGithubFiles } from '~/utils/github/update-github-files';
import { getGoogleSheetsClient, spreadsheetId } from '~/utils/google';
import { projectPath } from '~/utils/project-path';
import { normalizeSheetRow } from '~/utils/sheets';
import { EntryType } from '~shared/types/entry';

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Toronto')

async function update() {
	if (!process.env.GH_TOKEN) {
		throw new Error('GH_TOKEN was not found in environment.')
	}

	if (!process.env.SPREADSHEET_ID) {
		throw new Error('SPREADSHEET_ID was not found in environment.')
	}

	if (process.env.GOOGLE_CREDENTIALS) {
		await fs.promises.writeFile(
			path.join(projectPath, 'google-credentials.json'),
			process.env.GOOGLE_CREDENTIALS
		)
	}

	const sheets = getGoogleSheetsClient()
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
			sheetRowParser(clubRow, rowIndex) {
				const [
					_timestamp,
					_studentEmail,
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
						sheetRow: rowIndex
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
		return;
	}

	console.info('Updating GitHub files...');
	await updateGithubFiles(githubEntryUpdates);

	console.info('GitHub files updated!')
}

update().then(() => {
	process.exit(0)
}).catch((error) => {
	console.error(error)
	process.exit(1)
})