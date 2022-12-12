import { writable } from 'svelte/store';
import { writableCookie } from '$lib/util/cookies';

export const drawerOpen = writable(false);

export const THEME_KEY = 'theme';
export enum Theme {
	Light = 'light',
	Dark = 'dark',
}

export const theme = writableCookie<Theme>(THEME_KEY, Theme.Light);

export function toggleTheme() {
	theme.update((_theme) => (_theme === Theme.Light ? Theme.Dark : Theme.Light));
}
