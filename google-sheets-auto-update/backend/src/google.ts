import { google } from 'googleapis';

export const authClient = new google.auth.GoogleAuth({
  keyFile: './client_secret.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export const sheets = google.sheets({
  version: 'v4',
  auth: authClient,
});

export const spreadsheetId = process.env.SPREADSHEET_ID;
