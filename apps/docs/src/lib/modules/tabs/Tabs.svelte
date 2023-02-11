<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import TabsSelectedByDefault from './examples/TabsSelectedByDefault.svelte';
	import TabsOrientation from './examples/TabsOrientation.svelte';
	import TabsDisabled from './examples/TabsDisabled.svelte';
	import TabsActivation from './examples/TabsActivation.svelte';
	import TabsOnSelect from './examples/TabsOnSelect.svelte';

	const features = [
		'Follows the ARIA pattern for tabs, semantically linking tabs and their associated tab panels.',
		'Full keyboard navigation & focus management for improved accessibility.',
		'Support for disabled tabs.',
	];

	const api = [
		{ definition: 'TabsConfig' },
		{ definition: 'TabsReturn', hideDefault: true },
		{ definition: 'TabsTriggerParams', hideDefault: true },
		{ definition: 'TabsContentParams', hideDefault: true },
	];

	const examples = [
		{ component: TabsSelectedByDefault, header: 'Selected by default' },
		{ component: TabsOrientation, header: 'Changing the orientation' },
		{ component: TabsDisabled, header: 'Disabling specific tabs' },
		{ component: TabsActivation, header: 'Manual tab activation' },
		{ component: TabsOnSelect, header: 'Listening to tab selection' },
	];

	const keyboard = [
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
	];
</script>

<ComponentLayout {features} {api} {examples} {keyboard}>
	<svelte:fragment slot="anatomy">
		<p>Typically, the tabs consists of:</p>

		<ul>
			<li><b>Root:</b> The root container for the trigger and content elements.</li>
			<ul>
				<li><b>List:</b> The container for the trigger elements.</li>
				<ul>
					<li><b>Trigger:</b> The button that activates a tab panel.</li>
				</ul>
				<li>
					<b>Content:</b> The element that holds the content of the tab.
				</li>
			</ul>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createTabs } from '@grail-ui/svelte';

	const { useTabs, rootAttrs, listAttrs, triggerAttrs, contentAttrs } = createTabs();

	const data = [
		{ key: "item-1", title: "Item 1", content: "Content for one." },
		{ key: "item-2", title: "Item 2", content: "Content for two." },
		{ key: "item-3", title: "Item 3", content: "Content for three." },
	];
</scr` +
				`ipt>

<div use:useTabs {...$rootAttrs}>
	<div {...$listAttrs}>
		{#each data as item}
			<button {...$triggerAttrs(item.key)}>{item.title}</button>
		{/each}
	</div>
	{#each data as item}
		<div {...$contentAttrs(item.key)}>{item.content}</div>
	{/each}
</div>`}
		/>
	</svelte:fragment>

	<svelte:fragment slot="accessibility">
		Tabs follow the recommendations of the <a
			href="https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/"
			target="_blank"
			class="underline"
			rel="noopener noreferrer">WAI-ARIA Authoring Practices</a
		>
		for tabs.</svelte:fragment
	>
</ComponentLayout>
