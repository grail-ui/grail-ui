import type { Readable } from 'svelte/store';

export type ClipboardConfig = {
	/**
	 * Milliseconds to reset state of `copied`.
	 *
	 * @defaultValue `1500`
	 */
	copiedDuring?: number;

	/**
	 * Callback when copy is triggered.
	 */
	onCopy?: (value?: string) => void | undefined;
};

export type ClipboardReturn = {
	/**
	 * Whether Clipboard API is supported.
	 */
	isSupported: boolean;

	/**
	 * Last copied text.
	 */
	text: Readable<string>;

	/**
	 * Triggers every time a copy is happening and expires after `copiedDuring` milliseconds.
	 */
	copied: Readable<boolean>;

	/**
	 * Utility function to copy text or the contents of a `HTMLElement`.
	 */
	copy: (text: string | HTMLElement) => Promise<void>;
};
