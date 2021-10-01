import type { Club } from '~shared/types/club';

export function getClubThumbnailUrl(clubSlug: string) {
	return `/images/club-thumbnails/${clubSlug}.jpg`;
}

export function getClubIconUrl(clubSlug: string) {
	return `/images/club-icons/${clubSlug}.png`;
}

export function getClubPageUrl(clubSlug: string) {
	return `/club/${clubSlug}`;
}

export function getClubsArray(clubs: Record<string, Club>) {
	// Sort the clubs alphabetically
	return Object.values(clubs).sort((c1, c2) => {
		const c1Name = c1.name.toLowerCase();
		const c2Name = c2.name.toLowerCase();
		if (c1Name < c2Name) {
			return -1;
		} else if (c1Name > c2Name) {
			return 1;
		} else {
			return 0;
		}
	});
}
