<script lang="ts">
	import { useClickOutside } from '@grail-ui/svelte';

	let count = 0;
	let ignoreRef: HTMLElement;
</script>

<div
	use:useClickOutside={{ handler: () => count++, ignore: [ignoreRef] }}
	class="border-base-content/20 bg-base-100 flex h-44 w-64 items-center justify-center whitespace-nowrap rounded border p-2 text-center"
>
	<div>Clicks out of the box:<br />{count}</div>
</div>

<button type="button" bind:this={ignoreRef} class="btn mt-10">Clicks here will be ignored</button>
