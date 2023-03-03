<script lang="ts">
	import { useClickOutside } from '@grail-ui/svelte';

	let count = 0;
	let ignoreRef: HTMLElement;
</script>

<div use:useClickOutside={{ handler: () => count++, ignore: [ignoreRef] }} class="box">
	<div>Clicks out of the box:<br />{count}</div>
</div>

<button type="button" bind:this={ignoreRef} class="btn btn-outline mt-10"
	>Clicks here will be ignored</button
>

<style lang="postcss">
	.box {
		@apply flex h-44 w-64 items-center justify-center whitespace-nowrap rounded border border-black bg-white p-2 text-center;
	}
</style>
