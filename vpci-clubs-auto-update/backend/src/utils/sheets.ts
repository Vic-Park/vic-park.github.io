import type { sheets_v4 as SheetsV4 } from 'googleapis';

import type { SheetEntry, SheetRow } from '~/types/sheets';
import type { EntryType } from '~shared/types/entry';

export function getSheetRows(
	spreadsheet: SheetsV4.Schema$Spreadsheet,
	sheetName: string
): SheetRow[] {
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

type FailStatus = {
	failure: true;
	reason?: string;
};

export type SheetRowParser<T extends EntryType> = (
	row: string[]
) => SheetEntry<T> | FailStatus;

export function parseSheetRows<T extends EntryType>(
	rows: SheetRow[],
	sheetRowParser: SheetRowParser<T>
): SheetEntry<T>[] {
	const parsedRows: SheetEntry<T>[] = [];
	for (const row of rows) {
		const result = sheetRowParser(row);
		if ('failure' in result && result.reason !== undefined) {
			console.error(
				`Failed to parse row. Reason: ${result.reason}. Row: ${JSON.stringify(
					row
				)}`
			);
		} else {
			parsedRows.push(result as SheetEntry<T>);
		}
	}
	return parsedRows;
}

export function normalizeSheetRow(row: string[]): (string | undefined)[] {
	return row.map((entry) => (entry === '' ? undefined : entry?.trim()));
}
