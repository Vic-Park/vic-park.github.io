import { z } from 'zod'

export const ClubEvent = z.object({
	/**
	 * The name of the club
	 */
	name: z.string(),

	/**
	 * A short description of the event
	 */
	description: z.string(),

	/**
	 * More information about the event (e.g. location, requirements, etc.)
	 */
	information: z.string(),

	/**
	 * Whether the event is schoolwide (i.e. not associated with a particular set of clubs)
	 */
	isSchoolWideEvent: z.boolean(),

	/**
	 * The start date and time of the event
	 * If the event is not yet known, the start/end date is TBD
	 */
	start: z.string().optional(),

	/**
	 * The end time of the event
	 */
	end: z.string().optional()
});

export type ClubEvent = z.infer<typeof ClubEvent>;
