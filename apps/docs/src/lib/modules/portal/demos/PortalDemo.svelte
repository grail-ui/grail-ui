<script lang="ts">
	import { createPortal } from '@grail-ui/svelte';

	let visible = true;

	let counter = 0;
	setInterval(() => counter++, 1000);

	const { usePortal, target } = createPortal({ target: '#c1' });
</script>

<div class="flex w-full max-w-sm flex-col gap-5 rounded bg-white p-10">
	<div id="c1" class="container">
		<div class="font-bold">Container 1</div>
	</div>
	<div class="divider" />
	<div id="c2" class="container">
		<div class="font-bold">Container 2</div>
	</div>

	{#if visible}
		<div use:usePortal>
			Counter: {counter}
		</div>
	{/if}
</div>

<div class="mt-4 flex gap-2">
	<button class="btn" type="button" on:click={() => ($target = $target === `#c1` ? `#c2` : `#c1`)}
		>Move</button
	>
	<button class="btn" type="button" on:click={() => (visible = !visible)}>Toggle</button>
</div>

<style lang="postcss">
	.container {
		@apply h-16 border-2 p-2;
	}
</style>
