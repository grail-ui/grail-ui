<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import TooltipDelay from './examples/TooltipDelay.svelte';
	import TooltipPlacement from './examples/TooltipPlacement.svelte';
	import TooltipPortal from './examples/TooltipPortal.svelte';

	const features = [
		'Show tooltip on hover and focus.',
		'Hide pointer down.',
		'Labeling support for screen readers.',
		'Custom delay support.',
	];

	const api = [
		{ definition: 'TooltipConfig' },
		{ definition: 'TooltipReturn', hideDefault: true },
		{ definition: 'PositioningOptions' },
	];

	const examples = [
		{ component: TooltipDelay, header: 'Customize delay' },
		{ component: TooltipPlacement, header: 'Changing placement' },
		{ component: TooltipPortal, header: 'Custom portal container' },
	];
</script>

<ComponentLayout {features} {api} {examples} dependencies={['@floating-ui/dom']}>
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
