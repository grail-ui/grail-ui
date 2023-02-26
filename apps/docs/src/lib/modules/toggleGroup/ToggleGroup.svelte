<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import ToggleGroupMultiple from './examples/ToggleGroupMultiple.svelte';
	import ToggleGroupPressedDefault from './examples/ToggleGroupPressedDefault.svelte';
	import ToggleGroupOrientation from './examples/ToggleGroupOrientation.svelte';
	import ToggleGroupDisabled from './examples/ToggleGroupDisabled.svelte';
	import ToggleGroupOnPress from './examples/ToggleGroupOnPress.svelte';
	import ToggleGroupTypeSafety from './examples/ToggleGroupTypeSafety.svelte';

	const features = [
		'Full keyboard navigation.',
		'Supports horizontal/vertical orientation.',
		'Ability to press one or multiple items.',
		'Support for disabled items.',
	];

	const api = [
		{ definition: 'ToggleGroupConfig' },
		{ definition: 'ToggleGroupReturn', hideDefault: true },
	];

	const examples = [
		{ component: ToggleGroupMultiple, header: 'Multiple items pressed at the same time' },
		{ component: ToggleGroupPressedDefault, header: 'Pressed by default' },
		{ component: ToggleGroupOrientation, header: 'Changing the orientation' },
		{ component: ToggleGroupDisabled, header: 'Disabling specific items' },
		{ component: ToggleGroupOnPress, header: 'Listening to state changes' },
		{ component: ToggleGroupTypeSafety, header: 'Value type safety' },
	];

	const keyboard = [
		{
			key: ['Space', 'Enter'],
			description: 'When focus is on an `itemAttrs` element, activates/deactivates the item.',
		},
		{
			key: 'Tab',
			description: 'Moves focus to either the pressed item or the first item in the group.',
		},
		{
			key: 'ArrowDown',
			description: 'When `orientation` is `vertical`, moves focus to the next item in the group.',
		},
		{
			key: 'ArrowUp',
			description:
				'When `orientation` is `vertical`, moves focus to the previous item in the group.',
		},
		{
			key: 'ArrowLeft',
			description:
				'When `orientation` is `horizontal`, moves focus to the previous item in the group.',
		},
		{
			key: 'ArrowRight',
			description: 'When `orientation` is `horizontal`, moves focus to the next item in the group.',
		},
		{
			key: 'Home',
			description: 'Moves focus to the first item.',
		},
		{
			key: 'End',
			description: 'Moves focus to the last item.',
		},
	];
</script>

<ComponentLayout {features} {api} {examples} {keyboard}>
	<svelte:fragment slot="anatomy">
		<p>Typically, a toggle group consists of:</p>

		<ul>
			<li><b>Root:</b> The root container for the toggle group.</li>
			<ul>
				<li>
					<b>Item:</b> The root container for each toggle item.
				</li>
			</ul>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createToggleGroup } from '@grail-ui/svelte';

	const { useToggleGroup, rootAttrs, itemAttrs } = createToggleGroup();

	const data = [
		{ key: "item-1", label: "Button 1" },
		{ key: "item-2", label: "Button 2" },
		{ key: "item-3", label: "Button 3" },
	];
</scr` +
				`ipt>

<div use:useToggleGroup {...$rootAttrs} >
	{#each data as item}
		<button {...$itemAttrs(item.key)}>{item.label}</button>
	{/each}
</ul>`}
		/>
	</svelte:fragment>

	<svelte:fragment slot="accessibility">
		<p>
			Uses <a
				href="https://www.w3.org/TR/wai-aria-practices-1.2/examples/radio/radio.html"
				target="_blank"
				rel="noopener noreferrer">roving tabindex</a
			> to manage focus movement among items.
		</p>
	</svelte:fragment>
</ComponentLayout>
