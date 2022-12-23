<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Use the <code>defaultValue</code> prop to define the open item by default.
<Highlight
	source={`createAccordion({
	type: 'multiple',
	defaultValue: ['item-1'],
})`}
	lines={[3]}
/>
