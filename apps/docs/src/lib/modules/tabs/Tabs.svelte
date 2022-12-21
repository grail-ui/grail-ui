<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Features from '$lib/demo/Features.svelte';
</script>

<Demo />

<Features
	list={[
		'Follows the ARIA pattern for tabs, semantically linking tabs and their associated tab panels.',
		'Full keyboard navigation & focus management for improved accessibility.',
		'Support for disabled tabs.',
	]}
/>

<Accessibility
	keyboard={[
		{
			key: ['Space', 'Enter'],
			description: 'When focus is on an `useTabsTrigger` element, activates the tab.',
		},
		{
			key: 'Tab',
			description:
				'When focus moves onto the tabs, focuses the active `useTabsTrigger` element. When a trigger is focused, moves focus to the active `useTabsContent` element.',
		},
		{
			key: 'ArrowDown',
			description:
				'When `orientation` is `vertical`, moves focus to the next `useTabsTrigger` element and activates its associated content.',
		},
		{
			key: 'ArrowUp',
			description:
				'When `orientation` is `vertical`, moves focus to the next `useTabsTrigger` element and activates its associated content.',
		},
		{
			key: 'ArrowLeft',
			description:
				'When `orientation` is `horizontal`, moves focus to the previous `useTabsTrigger` element and activates its associated content.',
		},
		{
			key: 'ArrowRight',
			description:
				'When `orientation` is `horizontal`, moves focus to the next `useTabsTrigger` element and activates its associated content.',
		},
		{
			key: 'Home',
			description:
				'Moves focus to the first `useTabsTrigger` element and activates its associated content.',
		},
		{
			key: 'End',
			description:
				'Moves focus to the last `useTabsTrigger` element and activates its associated content.',
		},
	]}
>
	Tabs follow the recommendations of the <a
		href="https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/"
		target="_blank"
		class="underline"
		rel="noopener noreferrer">WAI-ARIA Authoring Practices</a
	>
	for tabs.</Accessibility
>

<Api
	types={[
		{ definition: 'TabsConfig' },
		{ definition: 'TabsReturn', hideDefault: true },
		{ definition: 'TabsTriggerParams', hideDefault: true },
		{ definition: 'TabsContentParams', hideDefault: true },
	]}
/>
