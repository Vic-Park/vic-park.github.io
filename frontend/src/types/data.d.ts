declare module '~data/clubs' {
	import type { Club } from '~shared/types/club';

	/**
	 * Map from club slug to club data
	 */
	const clubsMap: Record<string, Club>;
	export = clubsMap;
}

declare module '~data/announcements' {
	import type { Announcement } from '~shared/types/announcement';

	/**
	 * Map from the name of the announcement's file to the announcement data
	 */
	const announcementsMap: Record<string, Announcement>;
	export = announcementsMap;
}

declare module '~data/events' {
	import type { ClubEvent } from '~shared/types/event';

	/**
	 * Map from the name of the event's file to the event data
	 */
	const eventsMap: Record<string, ClubEvent>;
	export = eventsMap;
}
