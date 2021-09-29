import { ClubEvent } from '~types/event';

export function convertEventMetadataToEvent(
	eventMetadata: StringifiedValues<ClubEventMetadata>
): ClubEvent {
	const { } = eventMetadata;

	return {
		metadata,
		slug,
		type,
	}
}
