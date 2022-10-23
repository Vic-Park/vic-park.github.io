import Ajv from 'ajv';

import type { SheetEntry } from '~/types/sheets';
import { Club } from '~shared/types/club';
import { ClubAnnouncement } from '~shared/types/club-announcement';
import { ClubEvent } from '~shared/types/club-event';
import type { Entry } from '~shared/types/entry';
import { EntryType } from '~shared/types/entry';

const ajv = new Ajv({ strict: false });
const validateClubSchema = ajv.compile<Club>(Club);
const validateClubAnnouncementSchema =
	ajv.compile<ClubAnnouncement>(ClubAnnouncement);
const validateClubEventSchema = ajv.compile<ClubEvent>(ClubEvent);

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
		case EntryType.event:
			if (validateClubEventSchema(sheetEntry.data)) {
				return {
					type: EntryType.event,
					data: sheetEntry.data,
				} as Entry<T>;
			} else {
				return logValidationError(validateClubEventSchema.errors);
			}
		case EntryType.announcement:
			if (validateClubAnnouncementSchema(sheetEntry.data)) {
				return {
					type: EntryType.announcement,
					data: sheetEntry.data,
				} as Entry<T>;
			} else {
				return logValidationError(validateClubAnnouncementSchema.errors);
			}
		case EntryType.club:
			if (validateClubSchema(sheetEntry.data)) {
				return {
					type: EntryType.club,
					data: sheetEntry.data,
				} as Entry<T>;
			} else {
				return logValidationError(validateClubSchema.errors);
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
