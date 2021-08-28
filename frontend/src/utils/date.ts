import dateFormat from 'dateformat';

export function formatFullDateTime(date: Date | string) {
	const d: Date = typeof date === 'string' ? new Date(date) : date;
	return dateFormat(d, 'dddd, mmmm d, h:MM TT');
}
