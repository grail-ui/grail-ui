import type { Action } from 'svelte/action';
import type { Readable, Writable } from 'svelte/store';

export type ModalConfig = {
	/**
	 * The open state of the dialog when it is initially rendered.
	 *
	 * @defaultValue `true`
	 */
	open?: boolean;

	/**
	 * Where to "portal" the modal element outside it's initial DOM position.
	 * It can be a `HTMLElement` or a CSS selector that points to an already existing element.
	 *
	 * @defaultValue `"body"`
	 */
	portal?: string | HTMLElement | null;

	/**
	 * Specify an element to receive focus when the dialog is opened.
	 * You can set this option to `false` (or to a function that returns `false`) to prevent any initial focus.
	 */
	initialFocus?:
		| HTMLElement
		| SVGElement
		| string
		| false
		| (() => HTMLElement | SVGElement | string | false);

	/**
	 * Event handler called when the open state changes.
	 */
	onOpenChange?: (value: boolean) => void | undefined;

	/**
	 * Whether to close the modal when the user interacts outside it.
	 *
	 * @defaultValue `false`
	 */
	dismissible?: boolean;

	/**
	 * Whether pressing the Escape key to close the modal should be disabled.
	 *
	 * @defaultValue `true`
	 */
	keyboardDismissible?: boolean;

	/**
	 * Event handler called when a pointer event occurs outside the bounds of the dialog. Closing can be prevented by calling `event.preventDefault()` or by returning `false`.
	 */
	onInteractOutside?: (e?: PointerEvent) => void | boolean;
};

export type ModalReturn = {
	/**
	 * Action for the container element.
	 */
	useModal: Action<HTMLElement, void>;

	/**
	 * The controlled open state of the modal.
	 */
	open: Writable<boolean>;

	/**
	 * HTML attributes for the content element.
	 */
	modalAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the title element.
	 */
	titleAttrs: Readable<Record<string, string>>;

	/**
	 * HTML attributes for the trigger element.
	 */
	triggerAttrs: Readable<Record<string, string>>;

	/**
	 * The controlled state of the dismissible property.
	 */
	dismissible: Writable<boolean>;

	/**
	 * The controlled state of the keyboardDismissible property.
	 */
	keyboardDismissible: Writable<boolean>;
};
