<script lang="ts">
	import { createResizeObserver } from '@grail-ui/svelte';

	const { useResizeObserver, entries } = createResizeObserver();

	function printDimensions(entry: ResizeObserverEntry) {
		return `w: ${entry?.contentRect.width}px - h: ${entry?.contentRect.height}px`;
	}
</script>

<textarea use:useResizeObserver readonly>{printDimensions($entries[0])}</textarea>
<textarea use:useResizeObserver readonly>{printDimensions($entries[1])}</textarea>

<style>
	textarea {
		resize: both;
		border: 2px solid black;
		margin-bottom: 10px;
	}
</style>
