<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

If you want to customize the element that your tooltip portals into, use the <code>portal</code> and
pass the actual element or a CSS selector.
<Highlight
	source={`createTooltip({
	portal: '#custom',
})`}
	lines="2"
/>
