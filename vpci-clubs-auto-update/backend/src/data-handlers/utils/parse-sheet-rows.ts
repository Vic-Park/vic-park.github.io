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
	return rows
		.map((row) => cb(row))
		.filter((result) => {
			if ('failure' in result && result.reason !== undefined) {
				console.error(
					`Failed to parse row for reason ${result.reason}: ${JSON.stringify(
						result
					)}`
				);
				return false;
			}
			return true;
		}) as SheetEntry<T>[];
}
