<script lang="ts">
	import { createTooltip } from '@grail-ui/svelte';
	import { fade } from 'svelte/transition';

	const { useTooltipTrigger, triggerAttrs, useTooltip, tooltipAttrs, arrowAttrs, open } =
		createTooltip();
</script>

<button type="button" class="btn" use:useTooltipTrigger {...$triggerAttrs}>Button</button>

{#if $open}
	<div
		use:useTooltip
		{...$tooltipAttrs}
		class="bg-base-100 max-w- rounded p-2 text-xs font-bold"
		in:fade={{ duration: 150 }}
	>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid nesciunt laudantium ab!
		<div {...$arrowAttrs} />
	</div>
{/if}
