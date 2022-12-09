<script lang="ts">
	import { createKeyStroke } from '@grail-ui/svelte';
	import { writable } from 'svelte/store';

	const translate = writable([0, 0]);

	createKeyStroke({
		key: ['W', 'ArrowUp'],
		handler: () => translate.update(([x, y]) => [x, y - 10]),
		preventDefault: true,
	});
	createKeyStroke({
		key: ['S', 'ArrowDown'],
		handler: () => translate.update(([x, y]) => [x, y + 10]),
		preventDefault: true,
	});
	createKeyStroke({
		key: ['A', 'ArrowLeft'],
		handler: () => translate.update(([x, y]) => [x - 10, y]),
		preventDefault: true,
	});
	createKeyStroke({
		key: ['D', 'ArrowRight'],
		handler: () => translate.update(([x, y]) => [x + 10, y]),
		preventDefault: true,
	});
</script>

<div class="bg-white w-full max-w-sm h-32 border overflow-hidden flex items-center justify-center">
	<div
		class="ball bg-slate-400 w-4 h-4 rounded-full"
		style="transform: translate({$translate[0]}px, {$translate[1]}px)"
	/>
</div>
<div class="text-center mt-4">
	Use the arrow keys or <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd> to control the ball.
</div>
