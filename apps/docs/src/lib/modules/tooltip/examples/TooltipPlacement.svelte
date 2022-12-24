<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

The tooltip uses <code>floating-ui</code> for dynamic positioning, which allows you to change its
placement by passing a <code>positioning</code> object, that can its alignment, offset, and flip
behavior. See all the available <a href="#PositioningOptions">options</a>.

<Highlight
	source={`createTooltip({
	positioning: {
		placement: "bottom",
		gutter: 10
	},
})`}
	lines="2, 3, 4, 5"
/>
