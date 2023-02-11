<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Use the <code>value</code> prop to define the open item by default. Use the <code>value</code>
prop to define the expanded item by default.
<Highlight
	source={`createAccordion({
	value: ['item-1'],
	multiple: true,
})`}
	lines={[3]}
/>
