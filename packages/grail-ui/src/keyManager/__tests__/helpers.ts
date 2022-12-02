export interface ModifierKeys {
	control?: boolean;
	alt?: boolean;
	shift?: boolean;
	meta?: boolean;
}

/**
 * Creates a keyboard event with the specified key and modifiers.
 */
export function createKeyboardEvent({
	type = 'keydown',
	keyCode = 0,
	key = '',
	modifiers = {} as ModifierKeys,
}) {
	return new KeyboardEvent(type, {
		bubbles: true,
		cancelable: true,
		composed: true, // Required for shadow DOM events.
		keyCode: keyCode,
		key: key,
		shiftKey: modifiers.shift,
		metaKey: modifiers.meta,
		altKey: modifiers.alt,
		ctrlKey: modifiers.control,
	});
}
