<script lang="ts">
	import { createTooltip } from '@grail-ui/svelte';
	import { fade } from 'svelte/transition';

	const { useTooltipTrigger, triggerAttrs, useTooltip, tooltipAttrs, arrowAttrs, open } =
		createTooltip();
</script>

<button type="button" class="btn" use:useTooltipTrigger {...$triggerAttrs}>Button</button>

{#if $open}
	<div use:useTooltip {...$tooltipAttrs} class="tip" in:fade={{ duration: 150 }}>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid nesciunt laudantium ab!
		<div {...$arrowAttrs} />
	</div>
{/if}

<style>
	.tip {
		text-align: left;
		background: #032d60;
		color: white;
		font-weight: bold;
		padding: 8px;
		border-radius: 4px;
		font-size: 12px;
		max-width: 320px;
	}
</style>
