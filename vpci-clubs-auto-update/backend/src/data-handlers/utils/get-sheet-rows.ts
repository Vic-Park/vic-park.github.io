import type { sheets_v4 as SheetsV4 } from 'googleapis';

export function getSheetRows(
	spreadsheet: SheetsV4.Schema$Spreadsheet,
	sheetName: string
): string[][] {
	const sheet = spreadsheet.sheets!.find(
		(sheet) => sheet.properties?.title === sheetName
	);

	if (sheet === undefined) return [];

	function isRowEmpty(row: SheetsV4.Schema$RowData) {
		const rowValues = row.values;
		if (rowValues === undefined) return true;
		return rowValues.every(
			(value) =>
				value.formattedValue === '' || value.formattedValue === undefined
		);
	}

	return (
		sheet
			.data![0]!.rowData!.slice(1)
			// filter out empty rows
			.filter((row) => !isRowEmpty(row))
			.map(({ values }) => values!.map((value) => value.formattedValue!))
	);
}
