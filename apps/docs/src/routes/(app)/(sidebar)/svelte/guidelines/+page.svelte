<script lang="ts">
	import PageHeader from '$lib/demo/PageHeader.svelte';
	import SectionHeader from '$lib/demo/SectionHeader.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<div class="prose">
	<PageHeader title="Guidelines"
		>Here are the guidelines and best practices for Grail UI functions.</PageHeader
	>

	<SectionHeader id="Destructuring">Destructuring</SectionHeader>
	<p>
		Most of the in Grail UI factory methods return an object of stores and actions. You can use
		ES6's object destructuring syntax to easily extract the specific stores and actions you need.
		This way you can leverage Svelte's auto-subscription syntax. For example:
		<Highlight
			lines={[3]}
			source={`<scr` +
				`ipt>
 	import { createModal } from '@grail-ui/svelte';

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = createModal();
</scr` +
				`ipt>
`}
		/>
	</p>

	<SectionHeader id="Reactive">Reactive DOM props</SectionHeader>
	<p>
		The factory methods return readonly store objects that contain all the required attributes.
		These stores, which are suffixed with <code>Attrs</code>, must be spread onto the corresponding
		DOM elements.
	</p>
	<p>
		For example, in the following snippet, <code>modalAttrs</code>, <code>titleAttrs</code>, and
		<code>triggerAttrs</code>
		contain DOM attributes that adhere to the WAI-ARIA guidelines.
		<Highlight
			lines={[6, 9, 10]}
			source={`<scr` +
				`ipt>
	import { createModal } from '@grail-ui/svelte';

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = createModal();
</scr` +
				`ipt>

<button type="button" {...$triggerAttrs} on:click={() => ($open = true)}>Open</button>

{#if $open}
<div use:useModal {...$modalAttrs}>
	<h3 {...$titleAttrs}>Modal title</h3>
	<div>Modal content</div>
</div>
{/if}`}
		/>
	</p>

	<SectionHeader id="State">State</SectionHeader>
	<p>
		Most of the Grail UI factory methods return readonly and/or writable stores that reflect the
		current state of the component. If the store is writable, you can use it to update the
		component's state.
	</p>
	<p>
		For example:
		<Highlight
			lines={[3, 6, 8]}
			source={`<scr` +
				`ipt>
	import { createModal } from '@grail-ui/svelte';

	const { useModal, modalAttrs, titleAttrs, triggerAttrs, open } = createModal();
</scr` +
				`ipt>

<button type="button" {...$triggerAttrs} on:click={() => ($open = true)}>Open</button>

{#if $open}
<div use:useModal {...$modalAttrs}>
	<h3 {...$titleAttrs}>Modal title</h3>
	<div>Modal content</div>
</div>
{/if}`}
		/>
	</p>

	<SectionHeader id="Actions">Actions</SectionHeader>
	<p>
		All the actions returned by the factory methods, are prefixed with <code>use</code>. By
		leveraging the event delegation technique, usually you need to apply such actions only to a root
		element. For example, in the below component, <code>useAccordion</code> will "listen" to all the
		keyboard and pointer events for all the triggers and the sections.
		<Highlight
			lines={[6]}
			source={`<scr` +
				`ipt>
	import { createAccordion } from '@grail-ui/svelte';

	const { useAccordion, itemAttrs, triggerAttrs, contentAttrs } = createAccordion();
</scr` +
				`ipt>

<ul use:useAccordion>
	<li {...$itemAttrs('item-1')}>
		<button {...$triggerAttrs('item-1')}>Button 1</button
		>
		<div {...$contentAttrs('item-1')}>
			Content for one.
		</div>
	</li>
	<li {...$itemAttrs('item-2')}>
		<button {...$triggerAttrs('item-2')}>Button 2</button
		>
		<div {...$contentAttrs('item-2')}>
			Content for two.
		</div>
	</li>
</ul>`}
		/>
	</p>
</div>
