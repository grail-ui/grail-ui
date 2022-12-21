<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
	import Features from '$lib/demo/Features.svelte';
	import Accessibility from '$lib/demo/Accessibility.svelte';
</script>

<Demo />

<Features
	list={[
		'Customization options for side, alignment, offsets, and collision handling.',
		'Fully managed focus for seamless navigation.',
		'Full keyboard navigation support, including automatic focusing on the first or last item.',
		'Typeahead support for quickly focusing items by typing their text.',
		'Support for disabled items.',
	]}
/>

<Dependency modules={['@floating-ui/dom']} />

<Accessibility
	keyboard={[
		{
			key: ['Space', 'Enter'],
			description: 'When focus is trigger element, toggles the menu.',
		},
		{
			key: 'Esc',
			description: 'Closes the menu and moves focus to trigger element.',
		},
		{
			key: 'ArrowDown',
			description:
				'When focus is on trigger, opens the menu and focuses first available item. When focus is on an item, moves focus to the next one.',
		},
		{
			key: 'ArrowUp',
			description:
				'When focus is on trigger, opens the menu and focuses last available item. When focus is on an item, moves focus to the previous one.',
		},
		{
			key: 'Home',
			description: 'Moves focus to the first element.',
		},
		{
			key: 'End',
			description: 'Moves focus to the last element.',
		},
	]}
/>

<Api
	types={[
		{ definition: 'MenuConfig' },
		{ definition: 'MenuReturn', hideDefault: true },
		{ definition: 'PositioningOptions' },
	]}
/>
