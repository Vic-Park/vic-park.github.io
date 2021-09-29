import type { sheets_v4 as SheetsV4 } from 'googleapis';

import type { ClubEvent, ClubEventMetadata } from '~types/event';
import type { StringifiedValues } from '~types/utils';

import { cleanSheetRow } from '../clean-sheet-row';
import { convertEventMetadataToEvent } from '../convert/event';
import { getSheetRows } from '../get-sheet-rows';
import { isEventMetadataValid } from '../validation/event';

export function getEventsFromSpreadsheet(
	spreadsheet: SheetsV4.Schema$Spreadsheet
): ClubEvent[] {
	const eventSheetRows = getSheetRows(spreadsheet, 'Club Events');

	const eventsMetadata: StringifiedValues<ClubEventMetadata>[] =
		eventSheetRows.map((event) => {
			const [name, description, information, start, end, isSchoolEvent] =
				cleanSheetRow(event);

			return {
				name,
				description,
				information,
				start,
				end,
				isSchoolEvent,
			};
		});

	const validEvents = eventsMetadata
		.filter((eventMetadata) => isEventMetadataValid(eventMetadata))
		.map((eventMetadata) => convertEventMetadataToEvent(eventMetadata));

	return validEvents;
}
