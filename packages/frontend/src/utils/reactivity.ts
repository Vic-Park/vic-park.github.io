import { customRef } from 'vue';

export function useLocalStorageRef(key: string) {
	return customRef((track, trigger) => ({
		get() {
			track();
			return window.localStorage.getItem(key) ?? undefined;
		},
		set(value: string | undefined) {
			if (value === undefined) {
				window.localStorage.removeItem(key);
			} else {
				window.localStorage.setItem(key, value);
			}

			trigger();
		},
	}));
}
