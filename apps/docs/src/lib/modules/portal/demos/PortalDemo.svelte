<script lang="ts">
	import { createPortal } from '@grail-ui/svelte';

	let visible = true;

	let counter = 0;
	setInterval(() => counter++, 1000);

	const { usePortal, target } = createPortal({ target: '#c1' });
</script>

<div class="bg-base-100 border-base-content/20 flex w-full max-w-sm flex-col rounded border p-8">
	<div id="c1" class="border-base-content/20 h-16 border p-2">
		<div>Container 1</div>
	</div>
	<div class="divider" />
	<div id="c2" class="border-base-content/20 h-16 border p-2">
		<div>Container 2</div>
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
