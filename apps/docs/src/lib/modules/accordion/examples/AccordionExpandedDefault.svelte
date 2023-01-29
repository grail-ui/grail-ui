<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Use the <code>value</code> prop to define the open item by default.
<Highlight
	source={`createAccordion({
	type: 'multiple',
	value: ['item-1'],
})`}
	lines={[3]}
/>
