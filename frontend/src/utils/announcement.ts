import type { ClubAnnouncement } from '~shared/types/announcement';

/**
 * Takes the announcements data and returns an array of announcements sorted by most recent to
 * least recent
 */
export function createAnnouncementsArray(
	announcements: Record<string, ClubAnnouncement>
) {
	const announcementsArray = Object.values(announcements).sort((a1, a2) => {
		const a1Date = new Date(a1.date);
		const a2Date = new Date(a2.date);
		if (a1Date > a2Date) {
			return -1;
		}
		if (a1Date < a2Date) {
			return 1;
		}
		return 0;
	});

	return announcementsArray;
}
