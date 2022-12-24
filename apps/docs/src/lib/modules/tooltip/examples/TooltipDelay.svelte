<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Tooltips appear after a short delay when hovering the trigger, or instantly when using keyboard
focus. This can be adjusted for hover using the <code>delay</code> property.

<Highlight
	source={`createTooltip({
	openDelay: 500,
})`}
	lines="2"
/>
