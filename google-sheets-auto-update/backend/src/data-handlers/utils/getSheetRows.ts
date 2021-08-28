import type { sheets_v4 } from 'googleapis';

export function getSheetRows(
	spreadsheetData: sheets_v4.Schema$Spreadsheet,
	sheetName: string
): string[][] {
	const sheet = spreadsheetData.sheets.find(
		(sheet) => sheet.properties.title === sheetName
	);

	if (sheet === undefined) return [];

	return sheet.data[0].rowData
		.slice(1)
		.filter(({ values }) => {
			const name = values[0]?.formattedValue ?? '';
			return name.trim() !== '';
		})
		.map(({ values }) => values.map((value) => value.formattedValue));
}
