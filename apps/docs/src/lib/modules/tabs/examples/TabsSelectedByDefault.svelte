<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Use the <code>defaultValue</code> prop to define the selected tab by default.
<Highlight
	source={`createTabs({
	defaultValue: 'item-1',
})`}
	lines={[2]}
/>
