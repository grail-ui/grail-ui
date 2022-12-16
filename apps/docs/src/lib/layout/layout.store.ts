import { derived, writable } from 'svelte/store';
import { writableCookie } from '$lib/util/cookies';
import { PackageManager } from '$lib/demo/package-manager/packageManager.utils';

export const drawerOpen = writable(false);

export const PREFERENCES_KEY = 'preferences';
export enum Theme {
	Light = 'light',
	Dark = 'dark',
}

export type Preferences = {
	theme: Theme;
	packageManager: PackageManager;
};

export const preferences = writableCookie<Preferences>(PREFERENCES_KEY, {
	theme: Theme.Light,
	packageManager: PackageManager.NPM,
});

export const theme = derived(preferences, ({ theme }) => theme);
export const packageManager = derived(preferences, ({ packageManager }) => packageManager);

export function toggleTheme() {
	preferences.update((_preferences) => ({
		..._preferences,
		theme: _preferences.theme === Theme.Light ? Theme.Dark : Theme.Light,
	}));
}

export function setPackageManager(packageManager: PackageManager) {
	preferences.update((_preferences) => ({
		..._preferences,
		packageManager,
	}));
}
