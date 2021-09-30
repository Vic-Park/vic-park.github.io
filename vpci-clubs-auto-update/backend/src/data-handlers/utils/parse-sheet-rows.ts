import type { SheetEntry } from '~/types/sheets';
import type { EntryType } from '~shared/types/entry';

type FailStatus = {
	failure: true;
	reason?: string;
};

export function parseSheetRows<T extends EntryType>(
	rows: string[][],
	cb: (row: string[]) => SheetEntry<T> | FailStatus
): SheetEntry<T>[] {
	const parsedRows: SheetEntry<T>[] = [];
	for (const row of rows) {
		const result = cb(row);
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
