<script lang="ts">
	import { createKeyStroke } from '@grail-ui/svelte';
	import { writable } from 'svelte/store';
	import { onDestroy } from 'svelte';

	const translateX = writable(0);
	const translateY = writable(0);

	const removeUpEvent = createKeyStroke({
		key: ['W', 'ArrowUp'],
		handler: () => translateY.update((value) => (value -= 10)),
		preventDefault: true,
	});
	const removeDownEvent = createKeyStroke({
		key: ['S', 'ArrowDown'],
		handler: () => translateY.update((value) => (value += 10)),
		preventDefault: true,
	});
	const removeLeftEvent = createKeyStroke({
		key: ['A', 'ArrowLeft'],
		handler: () => translateX.update((value) => (value -= 10)),
		preventDefault: true,
	});
	const removeRightEvent = createKeyStroke({
		key: ['D', 'ArrowRight'],
		handler: () => translateX.update((value) => (value += 10)),
		preventDefault: true,
	});

	onDestroy(() => {
		removeUpEvent();
		removeDownEvent();
		removeLeftEvent();
		removeRightEvent();
	});
</script>

<div class="bg-white w-full max-w-sm h-32 border overflow-hidden flex items-center justify-center">
	<div
		class="ball bg-slate-400 w-4 h-4 rounded-full"
		style="transform: translate({$translateX}px, {$translateY}px)"
	/>
</div>
<div class="text-center mt-4">
	Use the arrow keys or <kbd>W</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>D</kbd> to control the ball.
</div>
