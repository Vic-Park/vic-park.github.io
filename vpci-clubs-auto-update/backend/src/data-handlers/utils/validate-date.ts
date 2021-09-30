type IsValidDateOptions = {
	allowTBD: boolean;
};

export function isValidDate(
	dateString: string | undefined,
	options?: IsValidDateOptions
): dateString is string {
	if (dateString === undefined) return false;
	if (options?.allowTBD && (dateString === 'TBA' || dateString === 'TBD')) {
		return true;
	}
	const d = new Date(dateString);
	if (Number.isNaN(d.getTime())) {
		return false;
	}
	return true;
}
