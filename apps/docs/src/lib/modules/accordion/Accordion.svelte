<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Features from '$lib/demo/Features.svelte';
	import Anatomy from '$lib/demo/Anatomy.svelte';
	import Examples from '$lib/demo/Examples.svelte';
	import ExampleSection from '$lib/demo/ExampleSection.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<Demo />

<Features
	list={[
		'Full keyboard navigation support for accessibility.',
		'Ability to expand one or multiple items.',
		'Support for disabled items.',
	]}
/>

<Anatomy>
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
</Anatomy>

<Examples>
	<ExampleSection header="Multiple items open at the same time">
		<p>
			Set the <code>type</code> prop to <code>multiple</code> to enable opening multiple items at
			once.
			<Highlight
				source={`createAccordion({
	type: 'multiple',
})`}
				lines={[2]}
			/>
		</p>
	</ExampleSection>
	<ExampleSection header="Expanded by default">
		<p>
			Use the <code>defaultValue</code> prop to define the open item by default.
			<Highlight
				source={`createAccordion({
	type: 'multiple',
	defaultValue: ['item-1'],
})`}
				lines={[3]}
			/>
		</p>
	</ExampleSection>

	<ExampleSection header="Disabling specific items">
		<p>
			To disable a specific accordion, pass the <code>disabled: true</code> property to the
			<code>itemAttrs</code>.
		</p>
		<p>
			When an accordion item is disabled, it is skipped from keyboard navigation and can't be
			interacted with.
			<Highlight
				source={`<li {...$itemAttrs({ value: 'item-1', disabled: true })}>
	<button {...$triggerAttrs('item-1')}>Button 1</button>
	<div {...$contentAttrs('item-1')}>
		Content for one.
	</div>
</li>`}
				lines={[1]}
			/>
		</p>

		<p>
			You can also disable the entire accordion by passing <code>disabled: true</code> to the
			factory function.
			<Highlight
				source={`createAccordion({
	type: 'multiple',
	defaultValue: ['item-1'],
	disabled: true,
})`}
				lines={[4]}
			/>
		</p>
	</ExampleSection>
</Examples>

<Accessibility
	keyboard={[
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
	]}
>
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
		Availability of accordion content to assistive technology requires the use of aria-controls and
		toggling aria-expanded as regions are expanded and collapsed.
	</p>
</Accessibility>

<Api
	types={[
		{ definition: 'AccordionSingleConfig' },
		{ definition: 'AccordionMultipleConfig' },
		{ definition: 'AccordionReturn', hideDefault: true },
		{ definition: 'AccordionParams', hideDefault: true },
		{ definition: 'AccordionItemParams', hideDefault: true },
	]}
/>
