import { google } from 'googleapis';
import path from 'path'
import { projectPath } from '~/utils/project-path';
import onetime from 'onetime'

export const getGoogleAuthClient = onetime(() =>
	new google.auth.GoogleAuth({
		keyFile: path.join(projectPath, 'google-credentials.json'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
	})
)

export const getGoogleSheetsClient = onetime(() =>
	google.sheets({
		version: 'v4',
		auth: getGoogleAuthClient(),
	})
);

export const spreadsheetId = process.env.SPREADSHEET_ID;
