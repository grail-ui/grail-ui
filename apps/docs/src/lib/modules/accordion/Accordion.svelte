<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import AccordionMultiple from './examples/AccordionMultiple.svelte';
	import AccordionExpandedDefault from './examples/AccordionExpandedDefault.svelte';
	import AccordionDisabled from './examples/AccordionDisabled.svelte';

	const features = [
		'Full keyboard navigation support for accessibility.',
		'Ability to expand one or multiple items.',
		'Support for disabled items.',
	];

	const api = [
		{ definition: 'AccordionSingleConfig' },
		{ definition: 'AccordionMultipleConfig' },
		{ definition: 'AccordionReturn', hideDefault: true },
		{ definition: 'AccordionParams', hideDefault: true },
		{ definition: 'AccordionItemParams', hideDefault: true },
	];

	const examples = [
		{ component: AccordionMultiple, header: 'Multiple items open at the same time' },
		{ component: AccordionExpandedDefault, header: 'Expanded by default' },
		{ component: AccordionDisabled, header: 'Disabling specific items' },
	];

	const keyboard = [
		{
			key: ['Space', 'Enter'],
			description: 'When focus is on an `useAccordionTrigger` element, toggles the section.',
		},
		{ key: 'Tab', description: 'Moves focus to the next focusable element.' },
		{ key: 'Shift + Tab', description: 'Moves focus to the previous focusable element.' },
		{ key: 'ArrowDown', description: 'Moves focus to the next `useAccordionTrigger` element.' },
		{ key: 'ArrowUp', description: 'Moves focus to the previous `useAccordionTrigger` element.' },
		{ key: 'Home', description: 'Moves focus to the first `useAccordionTrigger` element.' },
		{ key: 'End', description: 'Moves focus to the last `useAccordionTrigger` element.' },
	];
</script>

<ComponentLayout {features} {api} {examples} {keyboard}>
	<svelte:fragment slot="anatomy">
		<p>Typically, an accordion consists of:</p>

		<ul>
			<li><b>Root:</b> The root container for the accordion.</li>
			<ul>
				<li>
					<b>Item:</b> The container for each accordion item. Each accordion item consists of:
					<ul>
						<li><b>Trigger:</b> The trigger for the accordion item</li>
						<li><b>Content:</b> The content area that is revealed when the trigger is clicked</li>
					</ul>
				</li>
			</ul>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createAccordion } from '@grail-ui/svelte';

	const { useAccordion, itemAttrs, triggerAttrs, contentAttrs } = createAccordion();

	const data = [
		{ id: "item-1", title: "Button 1", content: "Content for one." },
		{ id: "item-2", title: "Button 2", content: "Content for two." },
		{ id: "item-3", title: "Button 3", content: "Content for three." },
	];
</scr` +
				`ipt>

<ul use:useAccordion>
	{#each data as item}
		<li {...$itemAttrs(item.id)}>
			<button {...$triggerAttrs(item.id)}>{item.title}</button>
			<div {...$contentAttrs(item.id)}>{item.content}</div>
		</li>
	{/each}
</ul>`}
		/>
	</svelte:fragment>

	<svelte:fragment slot="accessibility">
		<p>
			Accordion keyboard interactions follows the recommendations of the <a
				href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
				target="_blank"
				class="underline"
				rel="noreferrer noopener">WAI-ARIA Authoring Practices</a
			>
			for accordions.
		</p>
		<p>
			Availability of accordion content to assistive technology requires the use of aria-controls
			and toggling aria-expanded as regions are expanded and collapsed.
		</p>
	</svelte:fragment>
</ComponentLayout>
