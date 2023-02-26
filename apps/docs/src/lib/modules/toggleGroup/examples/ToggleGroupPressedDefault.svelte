<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Use the <code>value</code> prop to define the pressed item by default.
<Highlight
	source={`createToggleGroup({
	value: ['item-1'],
	multiple: true,
})`}
	lines={[2]}
/>
