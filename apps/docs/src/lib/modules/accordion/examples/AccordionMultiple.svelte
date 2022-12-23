<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Set the <code>type</code> prop to <code>multiple</code> to enable opening multiple items at once.
<Highlight
	source={`createAccordion({
	type: 'multiple',
})`}
	lines={[2]}
/>
