<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import PopoverPlacement from './examples/PopoverPlacement.svelte';
	import PopoverPortal from './examples/PopoverPortal.svelte';

	const features = [
		'Trigger and popover are automatically associated semantically using ARIA for improved accessibility.',
		'Popover can be closed by interacting outside of it or pressing the `Escape` key.',
		'Focus is moved and contained within the popover while it is open, and returned to the trigger element when it is closed.',
		'Customization options for side, alignment, offsets, and collision handling.',
	];

	const api = [
		{ definition: 'PopoverConfig' },
		{ definition: 'PopoverReturn', hideDefault: true },
		{ definition: 'PositioningOptions' },
	];

	const examples = [
		{ component: PopoverPlacement, header: 'Changing placement' },
		{ component: PopoverPortal, header: 'Custom portal container' },
	];

	const keyboard = [
		{ key: 'Esc', description: 'Closes the popover and moves focus to trigger element.' },
		{ key: 'Tab', description: 'Moves focus to the next focusable element.' },
		{ key: 'Shift + Tab', description: 'Moves focus to the previous focusable element.' },
	];
</script>

<ComponentLayout
	{features}
	{api}
	{examples}
	{keyboard}
	dependencies={['focus-trap', '@floating-ui/dom']}
>
	<svelte:fragment slot="anatomy">
		<p>Typically, a popover consists of:</p>

		<ul>
			<li><b>Trigger:</b> The element that triggers the popover.</li>
			<li>
				<b>Popover:</b> The overlay, which is positioned relative to the trigger, and may contain
				<ul>
					<li><b>Close Button:</b> An optional element to close the popover.</li>
					<li><b>Arrow:</b> An optional element that points to the trigger.</li>
				</ul>
			</li>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createPopover } from '@grail-ui/svelte';

	const { usePopoverTrigger, triggerAttrs, usePopover, popoverAttrs, closeButtonAttrs, open } = createPopover();
</scr` +
				`ipt>

<button use:usePopoverTrigger {...$triggerAttrs}>Click</button>

{#if $open}
	<section use:usePopover {...$popoverAttrs}>
		<div>
			Content
		</div>
		<button {...$closeButtonAttrs}>Close</button>
	</section>
{/if}`}
		/>
	</svelte:fragment>
</ComponentLayout>
