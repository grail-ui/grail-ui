import type { Handle } from '@sveltejs/kit';
import { PREFERENCES_KEY } from '$lib/layout/layout.store';

export const handle: Handle = ({ event, resolve }) => {
	const preferences = event.cookies.get(PREFERENCES_KEY);
	try {
		event.locals[PREFERENCES_KEY] = JSON.parse(preferences as string);
	} catch {
		event.locals[PREFERENCES_KEY] = undefined;
	}
	return resolve(event);
};
