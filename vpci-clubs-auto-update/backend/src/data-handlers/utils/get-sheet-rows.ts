import type { sheets_v4 as SheetsV4 } from 'googleapis';

export function getSheetRows(
	spreadsheet: SheetsV4.Schema$Spreadsheet,
	sheetName: string
): string[][] {
	const sheet = spreadsheet.sheets!.find(
		(sheet) => sheet.properties?.title === sheetName
	);

	if (sheet === undefined) return [];

	return sheet
		.data![0]!.rowData!.slice(1)
		.map(({ values }) => values!.map((value) => value.formattedValue!));
}
