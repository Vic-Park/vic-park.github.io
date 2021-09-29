import dayjs from 'dayjs';

import type { ClubEventMetadata } from '~types/event';
import type { StringifiedValues } from '~types/utils';

export function isEventMetadataValid(
	eventMetadata: StringifiedValues<ClubEventMetadata>
) {
	function logInvalidEvent(reason: string) {
		console.error(
			`Invalid event (reason: "${reason}"): ${JSON.stringify(eventMetadata)}`
		);
		return false;
	}

	const { name, isSchoolEvent, start, end } = eventMetadata;
	if (name === '') {
		return logInvalidEvent('Invalid event name.');
	}

	if (isSchoolEvent === '') {
		return logInvalidEvent(
			'Whether the event is a school event must be specified.'
		);
	}

	if (start !== 'TBA' && !dayjs(start).isValid()) {
		return logInvalidEvent('Invalid start date.');
	}

	if (!dayjs(end).isValid()) {
		return logInvalidEvent('Invalid end date.');
	}
}
