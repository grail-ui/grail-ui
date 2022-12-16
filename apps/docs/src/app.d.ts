/// <reference types="unplugin-icons/types/svelte" />

declare namespace App {
	interface Locals {
		preferences?: import('$lib/layout/layout.store').Preferences;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare const __APP_ENV__;
declare const __NOW__;
