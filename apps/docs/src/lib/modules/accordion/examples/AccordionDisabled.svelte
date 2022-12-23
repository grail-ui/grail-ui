<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	To disable a specific accordion, pass the <code>disabled: true</code> property to the
	<code>itemAttrs</code>.
</p>
<p>
	When an accordion item is disabled, it is skipped from keyboard navigation and can't be interacted
	with.
	<Highlight
		source={`<li {...$itemAttrs({ value: 'item-1', disabled: true })}>
	<button {...$triggerAttrs('item-1')}>Button 1</button>
	<div {...$contentAttrs('item-1')}>Content for one.</div>
</li>`}
		lines={[1]}
	/>
</p>

<p>
	You can also disable the entire accordion by passing <code>disabled: true</code> to the factory
	function.
	<Highlight
		source={`createAccordion({
	type: 'multiple',
	defaultValue: ['item-1'],
	disabled: true,
})`}
		lines={[4]}
	/>
</p>
