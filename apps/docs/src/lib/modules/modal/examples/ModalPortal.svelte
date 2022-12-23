<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

If you want to customize the element that your modal portals into use the <code>portal</code> and
pass the actual element or a CSS selector.
<Highlight
	source={`createModal({
	portal: '#custom',
})`}
	lines="2"
/>
