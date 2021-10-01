import { google } from 'googleapis';

export const authClient = new google.auth.GoogleAuth({
	keyFile: './google-credentials.json',
	scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export const sheets = google.sheets({
	version: 'v4',
	auth: authClient,
});

if (!process.env.SPREADSHEET_ID) {
	console.warn('SPREADSHEET_ID not found in environment.');
}

export const spreadsheetId = process.env.SPREADSHEET_ID;
