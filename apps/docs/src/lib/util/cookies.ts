import { derived, get, writable, type Updater, type Writable } from 'svelte/store';
import Cookies from 'js-cookie';
import { browser } from '$app/environment';
import { page } from '$app/stores';

export function writableCookie<T>(
	name: string,
	defaultValue: T
): Writable<T> & { reset: () => void } {
	const cookie = derived(page, ($page) => $page.data[name]);
	const client = writable<T>();
	const merged = derived([cookie, client], ([$cookie, $client]) => {
		return $client ?? $cookie ?? defaultValue;
	});

	const set = (value: T) => {
		if (browser) {
			Cookies.set(name, JSON.stringify(value), { expires: 365 });
		}

		client.set(value);
	};

	const update = (updater: Updater<T>) => {
		set(updater(get(merged)));
	};

	const reset = () => set(defaultValue);

	return { subscribe: merged.subscribe, set, update, reset };
}
