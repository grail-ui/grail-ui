export type KeyStrokeConfig = {
	/**
	 * List of key(s) or predicate that trigger `handler`.
	 */
	key: true | string | string[] | ((e: KeyboardEvent) => boolean);

	/**
	 * 	Utility function that is called when the key is being stroked.
	 */
	handler: (event: KeyboardEvent) => void;

	/**
	 * The specified event to listen.
	 *
	 * @defaultValue `keydown`
	 */
	eventName?: 'keydown' | 'keypress' | 'keyup';

	/**
	 * Target to attach the event listener.
	 *
	 * @defaultValue `document`
	 */
	target?: EventTarget;

	/**
	 * Add event listener passive parameter.
	 *
	 * @defaultValue `false`
	 */
	passive?: boolean;

	/**
	 * Whether to `preventDefault` before calling `handler`.
	 *
	 * @defaultValue `false`
	 */
	preventDefault?: boolean;
};
