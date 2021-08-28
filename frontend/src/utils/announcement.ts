import type { ClubAnnouncementGrayMatterFile } from '~types/announcement';

export function createAnnouncementsArray(
	announcements: Record<string, ClubAnnouncementGrayMatterFile>
) {
	const announcementsArray = Object.values(announcements)
		.map(({ data, content }) => ({
			title: data.title,
			date: data.date,
			content,
		}))
		.sort((a1, a2) => {
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
