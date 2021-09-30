import Ajv from 'ajv/dist/jtd';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import type { SheetEntry } from '~/types/sheets';
import { projectPath } from '~/utils/project-path';
import type { Entry, EntryTypeData } from '~shared/types/entry';
import { EntryType } from '~shared/types/entry';

const ajv = new Ajv();
ajv.addKeyword('description');
function compileSchema<T extends EntryType>(schemaName: string) {
	return ajv.compile<EntryTypeData[T]>(
		yaml.load(
			fs
				.readFileSync(
					path.join(projectPath, `shared/typedefs/${schemaName}.yaml`)
				)
				.toString()
		) as EntryTypeData[T]
	);
}
const validateClubSchema = compileSchema<EntryType.club>('club');
const validateClubAnnouncementSchema =
	compileSchema<EntryType.announcement>('club-announcement');
const validateClubEventSchema = compileSchema<EntryType.event>('club-event');

export function validateSheetEntry<T extends EntryType>(
	sheetEntry: SheetEntry<T>
): Entry<T> | false {
	function logValidationError(errors: unknown): false {
		console.error(
			`Validation error(s): ${errors}. Skipping entry ${JSON.stringify(
				sheetEntry
			)}`
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
