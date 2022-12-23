<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

To change the placement of the popover relatively to the trigger, set the <code>positioning</code>
property.

<Highlight
	source={`createPopover({
	positioning: {
		placement: "top-start",
		gutter: 10
	},
})`}
	lines="2, 3, 4, 5"
/>
