import { writable } from 'svelte/store';

export default function typeahead({ debounceInterval = 200 } = {}) {
	const { subscribe, set } = writable<string>('');

	let debounceTimeout: ReturnType<typeof setTimeout>;

	let pressedLetters: string[] = [];

	function reset() {
		pressedLetters = [];
		set('');
	}

	function _add(letter: string) {
		pressedLetters.push(letter);

		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			set(pressedLetters.join(''));
			reset();
		}, debounceInterval);
	}

	return {
		subscribe,
		add: _add,
		reset,
	};
}
