import type { Handle } from '@sveltejs/kit';
import { THEME_KEY } from '$lib/layout/layout.store';

export const handle: Handle = ({ event, resolve }) => {
	event.locals[THEME_KEY] = event.cookies.get(THEME_KEY);
	return resolve(event);
};
