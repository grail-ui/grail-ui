import type { Action } from 'svelte/action';

export type TextareaAutosizeReturn = {
	/**
	 * Action for the textarea that needs to be resized.
	 */
	useTextareaAutosize: Action<HTMLTextAreaElement, void>;
};
