<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import MenuOnSelect from './examples/MenuOnSelect.svelte';

	const features = [
		'Customization options for side, alignment, offsets, and collision handling.',
		'Fully managed focus for seamless navigation.',
		'Full keyboard navigation support, including automatic focusing on the first or last item.',
		'Typeahead support for quickly focusing items by typing their text.',
		'Support for disabled items.',
	];

	const api = [
		{ definition: 'MenuConfig' },
		{ definition: 'MenuReturn', hideDefault: true },
		{ definition: 'PositioningOptions' },
	];

	const examples = [{ component: MenuOnSelect, header: 'Listening to item selection' }];

	const keyboard = [
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
	];
</script>

<ComponentLayout {features} {api} {examples} {keyboard} dependencies={['@floating-ui/dom']}>
	<svelte:fragment slot="anatomy">
		<p>Typically, a menu consists of:</p>

		<ul>
			<li><b>Trigger:</b> The element that toggles the menu.</li>
			<li>
				<b>Menu:</b> The container for menu items. The menu consists of:
				<ul>
					<li><b>Item:</b> An element used to trigger the selection.</li>
					<li><b>Separator:</b> An optional element used to visually separate menu items.</li>
				</ul>
			</li>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createMenu } from '@grail-ui/svelte';

	const { useTrigger, triggerAttrs, useMenu, menuAttrs, itemAttrs, open } = createMenu();

	const options = [
		{ id: "edit", label: "Edit" },
		{ id: "delete", label: "Delete" },
		{ id: "destroy", label: "Destroy" },
	];
</scr` +
				`ipt>

<button use:useTrigger {...$triggerAttrs}>Actions</button>

{#if $open}
	<ul use:useMenu {...$menuAttrs}>
		{#each options as option (option.id)}
			<li><a href="/" {...$itemAttrs(option.id)}>{option.label}</a></li>
		{/each}
	</ul>
{/if}`}
		/>
	</svelte:fragment>
</ComponentLayout>
