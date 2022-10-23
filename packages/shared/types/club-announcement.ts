import { z } from 'zod'

export const ClubAnnouncement = z.object({
	// The title of the announcement
	title: z.string(),

	// The date the announcement is made
	date: z.string(),

	// The content of the announcement
	content: z.string(),
});

export type ClubAnnouncement = z.infer<typeof ClubAnnouncement>;
