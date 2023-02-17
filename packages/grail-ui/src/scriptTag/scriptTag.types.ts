import type { Readable } from 'svelte/store';

export type ScriptTagConfig = {
	/**
	 * Script specified url.
	 */
	url: string;

	/**
	 * Load the script immediately.
	 * @defaultValue `true`
	 */
	immediate?: boolean;

	/**
	 * Add `async` attribute to the script tag.
	 * @defaultValue `true`
	 */
	async?: boolean;

	/**
	 * Script type.
	 * @defaultValue `text/javascript`
	 */
	type?: string;

	/**
	 * Define how the element handles cross-origin requests.
	 */
	crossOrigin?: 'anonymous' | 'use-credentials';

	/**
	 * Indicates which referrer to send when fetching the script, or resources fetched by the script.
	 */
	referrerPolicy?:
		| 'no-referrer'
		| 'no-referrer-when-downgrade'
		| 'origin'
		| 'origin-when-cross-origin'
		| 'same-origin'
		| 'strict-origin'
		| 'strict-origin-when-cross-origin'
		| 'unsafe-url';

	/**
	 * This Boolean attribute is set to indicate that the script should not be executed in browsers that support ES2015 modules and can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.
	 */
	noModule?: boolean;

	/**
	 * Scripts with the defer attribute will execute in the order in which they appear in the document.
	 */
	defer?: boolean;

	/**
	 * Specify a custom `document` instance, e.g. working with iframes or in testing environments.
	 * @defaultValue `Default document`
	 */
	document?: Document;

	/**
	 * Utility function that is called when script has loaded.
	 */
	onLoaded?: (el: HTMLScriptElement) => void;

	/**
	 * Utility function that is called on abort or loading error.
	 */
	onError?: (el: HTMLScriptElement, event?: ErrorEvent | UIEvent) => void;

	/**
	 * Add custom attribute to the script tag.
	 */
	attrs?: Record<string, string>;
};

export type ScriptTagReturn = {
	/**
	 * Script tag element.
	 */
	scriptTag: Readable<HTMLScriptElement | null>;

	/**
	 * Utility function to load script tag element manually.
	 */
	load: (waitForScriptLoad?: boolean) => Promise<HTMLScriptElement | false>;

	/**
	 * Utility function to unload script tag element from the page.
	 */
	unload: () => void;
};
