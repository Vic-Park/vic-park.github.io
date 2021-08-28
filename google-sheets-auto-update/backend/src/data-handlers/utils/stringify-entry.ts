import matter from 'gray-matter';

import { Entry } from '~types/entry';

export function stringifyEntry(entry: Entry) {
	const { content, metadata } = entry;
	return matter.stringify(content ?? '', metadata);
}
