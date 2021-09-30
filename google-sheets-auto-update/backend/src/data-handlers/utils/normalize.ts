export function normalizeSheetRow(row: string[]): (string | undefined)[] {
	return row.map((entry) => (entry === '' ? undefined : entry.trim()));
}
