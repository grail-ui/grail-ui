import type { ClipboardConfig, ClipboardReturn } from './clipboard.types';
import { writable } from 'svelte/store';
import { isClient } from '../util/is';

export const createClipboard = ({
	onCopy,
	copiedDuring = 1500,
}: ClipboardConfig = {}): ClipboardReturn => {
	const isSupported = isClient && Boolean(navigator && 'clipboard' in navigator);

	const { subscribe: subscribeText, set: setText } = writable<string>('');
	const { subscribe: subscribeCopied, set: setCopied } = writable<boolean>(false);

	let copiedTimeout: ReturnType<typeof setTimeout>;

	async function copy(text: string | HTMLElement): Promise<void> {
		clearTimeout(copiedTimeout);

		if (isSupported && text != null) {
			if (typeof text !== 'string') {
				text = text.innerText;
			}
			await navigator.clipboard.writeText(text);
			setText(text);
			setCopied(true);

			copiedTimeout = setTimeout(() => {
				setCopied(false);
			}, copiedDuring);

			if (onCopy) {
				onCopy(text);
			}
		}
	}

	return {
		copy,
		text: { subscribe: subscribeText },
		copied: { subscribe: subscribeCopied },
		isSupported,
	};
};
