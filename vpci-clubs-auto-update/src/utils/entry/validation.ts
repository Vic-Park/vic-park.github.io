import type { SheetEntry } from '~/types/sheets';
import { Club } from '~shared/types/club';
import { ClubAnnouncement } from '~shared/types/club-announcement';
import { ClubEvent } from '~shared/types/club-event';
import type { Entry } from '~shared/types/entry';
import { EntryType } from '~shared/types/entry';

export function validateSheetEntry<T extends EntryType>(
	sheetEntry: SheetEntry<T>
): Entry<T> | false {
	function logValidationError(errors: unknown): false {
		console.error(
			`Validation error(s): ${JSON.stringify(
				errors
			)}. Skipping entry ${JSON.stringify(sheetEntry)}`
		);
		return false;
	}

	switch (sheetEntry.type) {
		case EntryType.event: {
			const parseResult =  ClubEvent.safeParse(sheetEntry.data)
			if (parseResult.success) {
				return {
					type: EntryType.event,
					data: sheetEntry.data,
				} as Entry<T>;
			} else {
				return logValidationError(parseResult.error);
			}
		}
		case EntryType.announcement: {
			const parseResult = ClubAnnouncement.safeParse(sheetEntry.data)
			if (parseResult.success) {
				return {
					type: EntryType.announcement,
					data: sheetEntry.data,
				} as Entry<T>;
			} else {
				return logValidationError(parseResult.error);
			}
		}
		case EntryType.club: {
			const parseResult = Club.safeParse(sheetEntry.data)
			if (parseResult.success) {
				return {
					type: EntryType.club,
					data: sheetEntry.data,
				} as Entry<T>;
			} else {
				return logValidationError(parseResult.error);
			}
		}
		default:
			throw new Error(`Unknown entry type: ${sheetEntry.type}`)
	}
}

export function filterValidSheetEntries<T extends EntryType>(
	sheetEntries: SheetEntry<T>[]
): Entry<T>[] {
	const validEntries: Entry<T>[] = [];
	for (const sheetEntry of sheetEntries) {
		const result = validateSheetEntry(sheetEntry);
		if (result) {
			validEntries.push(result);
		}
	}
	return validEntries;
}
