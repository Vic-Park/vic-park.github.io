import type { sheets_v4 as SheetsV4 } from 'googleapis';

import type { ClubEvent } from '~shared/types/club-event';

import { convertEventMetadataToEvent } from '../convert/event';
import { getSheetRows } from '../get-sheet-rows';
import { normalizeSheetRow } from '../normalize';

export function getEventsFromSpreadsheet(
	spreadsheet: SheetsV4.Schema$Spreadsheet
): ClubEvent[] {
	const eventSheetRows = getSheetRows(spreadsheet, 'Club Events');

	const eventsMetadata: StringifiedValues<ClubEvent>[] = eventSheetRows.map(
		(event) => {
			const [name, description, information, start, end, isSchoolEvent] =
				normalizeSheetRow(event);

			return {
				name,
				description,
				information,
				start,
				end,
				isSchoolEvent,
			};
		}
	);

	const validEvents = eventsMetadata
		.filter((eventMetadata) => isEventMetadataValid(eventMetadata))
		.map((eventMetadata) => convertEventMetadataToEvent(eventMetadata));

	return validEvents;
}
