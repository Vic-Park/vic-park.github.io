import type { EntryType, EntryTypeData } from '~shared/types/entry';

export type SheetEntry<T extends EntryType> = {
	[T in EntryType]: {
		type: T;
		data: { [K in keyof EntryTypeData[T]]: string | EntryTypeData[T][K] };
	};
}[T];
