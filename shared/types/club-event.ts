import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export const ClubEvent = Type.Object({
	/**
	 * The name of the club
	 */
	name: Type.String(),

	/**
	 * A short description of the event
	 */
	description: Type.String(),

	/**
	 * More information about the event (e.g. location, requirements, etc.)
	 */
	information: Type.String(),

	/**
	 * Whether the event is schoolwide (i.e. not associated with a particular set of clubs)
	 */
	isSchoolWideEvent: Type.Boolean(),

	/**
	 * The start date and time of the event
	 * If the event is not yet known, the start/end date is TBD
	 */
	start: Type.Optional(Type.String({ format: 'date-time' })),

	/**
	 * The end time of the event
	 */
	end: Type.Optional(Type.String({ format: 'date-time' })),
});

export type ClubEvent = Static<typeof ClubEvent>;
