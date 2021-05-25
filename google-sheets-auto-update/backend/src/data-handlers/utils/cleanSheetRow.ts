export function cleanSheetRow(row: string[]): string[] {
  return row.map((entry) => entry?.trim() ?? '');
}
