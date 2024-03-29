import { derived, writable } from 'svelte/store';
import { writableCookie } from '$lib/util/cookies';
import type { PackageManager } from '$lib/demo/package-manager/packageManager.utils';

export const drawerOpen = writable(false);

export const PREFERENCES_KEY = 'preferences';

export type Preferences = {
	theme: 'light' | 'dark';
	packageManager: PackageManager;
};

export const preferences = writableCookie<Preferences>(PREFERENCES_KEY, {
	theme: 'light',
	packageManager: 'npm',
});

export const theme = derived(preferences, ({ theme }) => theme);
export const packageManager = derived(preferences, ({ packageManager }) => packageManager);

export function toggleTheme() {
	preferences.update((_preferences) => ({
		..._preferences,
		theme: _preferences.theme === 'light' ? 'dark' : 'light',
	}));
}

export function setPackageManager(packageManager: PackageManager) {
	preferences.update((_preferences) => ({
		..._preferences,
		packageManager,
	}));
}
