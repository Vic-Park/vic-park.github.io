import dayjs from 'dayjs';

type IsValidDateOptions = {
	allowTBD: boolean;
};

export function isValidDate(
	dateString: string | undefined,
	options?: IsValidDateOptions
) {
	if (dateString === undefined) return false;
	if (options?.allowTBD && (dateString === 'TBA' || dateString === 'TBD')) {
		return true;
	}
	if (!dayjs(dateString).isValid()) {
		return false;
	}
	return true;
}
