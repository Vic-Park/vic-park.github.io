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

	const nonEmptyRows: SheetRow[] = [];

	const sheetRows = sheet.data![0].rowData!;
	for (
		let rowIndex = 1;
		rowIndex < sheet.data![0].rowData!.length;
		rowIndex += 1
	) {
		const row = sheetRows[rowIndex];
		if (!isRowEmpty(row)) {
			nonEmptyRows.push({
				cells: row.values!.map((value) => value.formattedValue!),
				rowIndex: rowIndex + 1,
			});
		}
	}

	return nonEmptyRows;
}

type FailStatus = {
	failure: true;
	reason?: string;
};

export type SheetRowParser<T extends EntryType> = (
	cells: string[],
	rowIndex: number
) => SheetEntry<T> | FailStatus;

export function parseSheetRows<T extends EntryType>(
	rows: SheetRow[],
	sheetRowParser: SheetRowParser<T>
): SheetEntry<T>[] {
	const parsedRows: SheetEntry<T>[] = [];
	for (const { cells, rowIndex } of rows) {
		const result = sheetRowParser(cells, rowIndex);
		if ('failure' in result && result.reason !== undefined) {
			console.error(
				`Failed to parse row. Reason: ${result.reason}. Row: ${JSON.stringify(
					cells
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
