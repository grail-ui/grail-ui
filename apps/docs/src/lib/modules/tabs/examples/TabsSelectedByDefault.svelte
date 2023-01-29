<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Use the <code>value</code> prop to define the selected tab by default.
<Highlight
	source={`createTabs({
	value: 'item-1',
})`}
	lines={[2]}
/>
