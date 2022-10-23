type IsValidDateOptions = {
	allowUndefined: boolean;
};

export function isValidDate(
	dateString: string | undefined,
	options?: IsValidDateOptions
): dateString is string | undefined {
	if (dateString === undefined) {
		return options?.allowUndefined ?? false;
	}
	const d = new Date(dateString);
	if (Number.isNaN(d.getTime())) {
		return false;
	}
	return true;
}
