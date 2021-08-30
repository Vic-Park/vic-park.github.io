export function getClubThumbnailUrl(clubSlug: string) {
	return `/img/club-thumbnails/${clubSlug}.jpg`;
}

export function getClubIconUrl(clubSlug: string) {
	return `/img/club-icons/${clubSlug}.png`;
}

export function getClubPageUrl(clubSlug: string) {
	return `/club/${clubSlug}`;
}
