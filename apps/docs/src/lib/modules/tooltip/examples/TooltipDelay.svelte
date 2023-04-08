<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Tooltips are designed to appear either after a brief delay when the user hovers over the trigger, or
immediately when the user uses keyboard focus. The <code>openDelay</code> property can be used to
customize the delay for hover-triggered tooltips. Similarly, tooltips are programmed to disappear
after a short delay once the user stops hovering over the trigger, or immediately when the user
moves away from keyboard focus. The <code>closeDelay</code> property can be used to adjust the delay
for hover-triggered tooltips.

<Highlight
	source={`createTooltip({
	openDelay: 500,
	closeDelay: 0,
})`}
	lines="2,3"
/>
