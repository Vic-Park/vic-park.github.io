import Ajv from 'ajv';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import type { SheetEntry } from '~/types/sheets';
import { projectPath } from '~/utils/project-path';
import type { Entry, EntryTypeData } from '~shared/types/entry';
import { EntryType } from '~shared/types/entry';

const ajv = new Ajv();
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
	compileSchema<EntryType.announcement>('announcement');
const validateClubEventSchema = compileSchema<EntryType.event>('event');

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
		case EntryType.announcement:
			if (validateClubAnnouncementSchema(sheetEntry.data)) {
				return {
					type: EntryType.announcement,
					data: sheetEntry.data,
				} as Entry<T>;
			} else {
				return logValidationError(validateClubAnnouncementSchema.errors);
			}
		case EntryType.event:
			if (validateClubEventSchema(sheetEntry.data)) {
				sheetEntry.data
				return {
					type: EntryType.event,
					data: sheetEntry.data,
				} as Entry<T>;
			} else {
				return logValidationError(validateClubEventSchema.errors);
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
