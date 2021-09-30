import type { EntryType, EntryTypeData } from '~shared/types/entry';

export type SheetEntry<T extends EntryType> = {
	[T in EntryType]: {
		type: T;
		data: { [k in keyof EntryTypeData[T]]: string | undefined };
	};
}[T];
