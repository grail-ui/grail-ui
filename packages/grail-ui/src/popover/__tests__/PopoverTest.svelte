<script lang="ts">
	import type { PopoverConfig } from '../popover.types';
	import { createPopover } from '../popover';

	export let onOpenChange: (() => void) | undefined = undefined;
	export let isOpen = false;
	export let hasArrow = true;
	export let triggerExists = true;
	export let portal: PopoverConfig['portal'] = undefined;

	const {
		usePopoverTrigger,
		triggerAttrs,
		usePopover,
		popoverAttrs,
		closeButtonAttrs,
		arrowAttrs,
		open,
	} = createPopover({
		open: isOpen,
		onOpenChange,
		portal,
	});
</script>

<div data-testid="container">
	{#if triggerExists}
		<button type="button" use:usePopoverTrigger {...$triggerAttrs} data-testid="trigger"
			>Click</button
		>
	{/if}

	{#if $open}
		<div use:usePopover {...$popoverAttrs} data-testid="overlay">
			Popover
			<input type="text" data-testid="input" />
			<div data-testid="close" {...$closeButtonAttrs} />
			{#if hasArrow}
				<div data-testid="arrow" {...$arrowAttrs} />
			{/if}
		</div>
	{/if}
</div>
