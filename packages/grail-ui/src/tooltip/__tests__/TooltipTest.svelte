<script lang="ts">
	import type { TooltipConfig } from '../tooltip.types';
	import { createTooltip } from '../tooltip';

	export let onOpenChange: (() => void) | undefined = undefined;
	export let isOpen = false;
	export let openDelay = 0;
	export let hasArrow = true;
	export let triggerExists = true;
	export let portal: TooltipConfig['portal'] = undefined;

	const { useTooltipTrigger, triggerAttrs, useTooltip, tooltipAttrs, arrowAttrs, open } =
		createTooltip({
			open: isOpen,
			openDelay,
			onOpenChange,
			portal,
		});
</script>

<div data-testid="container">
	{#if triggerExists}
		<button type="button" use:useTooltipTrigger {...$triggerAttrs} data-testid="trigger"
			>My button</button
		>
	{/if}

	{#if $open}
		<div use:useTooltip {...$tooltipAttrs} data-testid="tooltip">
			My tooltip
			{#if hasArrow}
				<div data-testid="arrow" {...$arrowAttrs} />
			{/if}
		</div>
	{/if}
</div>
