import { z } from 'zod'

export const Club = z.object({
	/**
	 * A unique identifier for the club
	 */
	slug: z.string(),

	/**
	 * The name of the club
	 */
	name: z.string(),

	/**
	 * The supervisors of the club
	 */
	staffSupervisor: z.string(),

	/**
	 * The leaders of the club
	 */
	clubLeaders: z.string(),

	/**
	 * A short description of the club
	 */
	shortDescription: z.string(),

	/**
	 * The meeting times of the club
	 */
	meetingTimes: z.string(),

	/**
	 * Instructions about how to join the club
	 */
	joinInstructions: z.string(),

	/**
	 * The row number of the club's Google Sheet entry
	 */
	sheetRow: z.number(),

	/**
	 * A comma-separated list of categories the club belongs to
	 */
	categories: z.string().optional(),

	/**
	 * Extra information about the club
	 */
	extraInformation: z.string().optional(),

	/**
	 * Online platforms to find more information about the club (e.g. Instagram, Discord, etc.)
	 */
	onlinePlatforms: z.string().optional(),

	/**
	 * The time commitment members need to participate in the club
	 */
	timeCommitment: z.string().optional(),

	/**
	 * The club's equity statement
	 * Equity statement is optional because clubs might need time to prepare one
	 */
	equityStatement: z.string().optional(),
});

export type Club = z.infer<typeof Club>