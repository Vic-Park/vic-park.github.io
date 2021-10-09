import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export const Club = Type.Object({
	/**
	 * A unique identifier for the club
	 */
	slug: Type.String(),

	/**
	 * The name of the club
	 */
	name: Type.String(),

	/**
	 * The supervisors of the club
	 */
	staffSupervisor: Type.String(),

	/**
	 * The leaders of the club
	 */
	clubLeaders: Type.String(),

	/**
	 * A short description of the club
	 */
	shortDescription: Type.String(),

	/**
	 * The meeting times of the club
	 */
	meetingTimes: Type.String(),

	/**
	 * Instructions about how to join the club
	 */
	joinInstructions: Type.String(),

	/**
	 * The row number of the club's Google Sheet entry
	 */
	sheetRow: Type.Number(),

	/**
	 * A comma-separated list of categories the club belongs to
	 */
	categories: Type.Optional(Type.String()),

	/**
	 * Extra information about the club
	 */
	extraInformation: Type.Optional(Type.String()),

	/**
	 * Online platforms to find more information about the club (e.g. Instagram, Discord, etc.)
	 */
	onlinePlatforms: Type.Optional(Type.String()),

	/**
	 * The time commitment members need to participate in the club
	 */
	timeCommitment: Type.Optional(Type.String()),

	/**
	 * The club's equity statement
	 * Equity statement is optional because clubs might need time to prepare one
	 */
	equityStatement: Type.Optional(Type.String()),
});

export type Club = Static<typeof Club>;