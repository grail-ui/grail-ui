<script lang="ts">
	import { createTabs } from '@grail-ui/svelte';
	import { fly } from 'svelte/transition';

	const { active, useTabs, rootAttrs, listAttrs, triggerAttrs, contentAttrs } = createTabs();
</script>

<div
	use:useTabs
	{...$rootAttrs}
	class="flex flex-col max-w-sm w-full bg-slate-100 p-4 rounded-lg"
	style="min-height: 150px"
>
	<div {...$listAttrs} class="flex flex-wrap border-b-2 border-gray-300">
		<button {...$triggerAttrs('tab1')}>Recent</button>

		<button {...$triggerAttrs('tab2')}>Popular</button>
		<button {...$triggerAttrs('tab3')}>Trending</button>
	</div>
	<div {...$contentAttrs('tab1')} class="py-3 text-sm">Recent tab content</div>
	<div {...$contentAttrs('tab2')} class="py-3 text-sm">Popular tab content</div>
	<div {...$contentAttrs('tab3')} class="py-3 text-sm">
		{#if $active === 'tab3'}
			<p in:fly={{ duration: 500, x: 200 }}>Trending tab content</p>
		{/if}
	</div>
</div>

<style lang="postcss">
	button {
		@apply h-8 px-4 text-gray-500;
	}

	button:global([data-state='active']) {
		color: #000;
		box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor;
	}
</style>
