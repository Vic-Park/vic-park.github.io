import dateFormat from 'dateformat';

export function formatFullDateTime(date: Date | string) {
	if (date === 'TBA' || date === 'TBD') return date;
	const d: Date = typeof date === 'string' ? new Date(date) : date;
	return dateFormat(d, 'dddd, mmmm d, h:MM TT');
}
