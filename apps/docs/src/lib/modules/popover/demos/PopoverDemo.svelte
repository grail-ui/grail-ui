<script lang="ts">
	import { createPopover } from '@grail-ui/svelte';
	import { fade } from 'svelte/transition';

	const {
		usePopoverTrigger,
		triggerAttrs,
		usePopover,
		popoverAttrs,
		closeButtonAttrs,
		arrowAttrs,
		open,
	} = createPopover();
</script>

<button type="button" class="btn" use:usePopoverTrigger {...$triggerAttrs}>Click me</button>

{#if $open}
	<section
		use:usePopover
		{...$popoverAttrs}
		class="bg-base-100 z-10 w-96 border p-5 shadow-lg"
		transition:fade={{ duration: 200 }}
	>
		<div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo possimus praesentium mollitia
				vero tempore beatae modi sequi!
			</p>
			<div class="mt-4 flex justify-end gap-2">
				<button type="button" on:click={() => ($open = false)} class="btn btn-primary">Close</button
				>
			</div>
		</div>
		<button type="button" {...$closeButtonAttrs} class="btn btn-sm btn-ghost popover-close"
			>&times;</button
		>
		<div {...$arrowAttrs} />
	</section>
{/if}

<style>
	.popover-close {
		position: absolute;
		top: 5px;
		right: 5px;
		font-size: 20px;
	}
</style>
