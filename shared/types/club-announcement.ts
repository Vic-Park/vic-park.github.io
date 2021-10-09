import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';

export const ClubAnnouncement = Type.Object({
	// The title of the announcement
	title: Type.String(),

	// The date the announcement is made
	date: Type.String(),

	// The content of the announcement
	content: Type.String(),
});

export type ClubAnnouncement = Static<typeof ClubAnnouncement>;
