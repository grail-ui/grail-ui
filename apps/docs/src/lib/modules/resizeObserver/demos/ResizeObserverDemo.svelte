<script lang="ts">
	import { createResizeObserver } from '@grail-ui/svelte';

	const { useResizeObserver, entries } = createResizeObserver();

	function printDimensions(entry: ResizeObserverEntry) {
		return `w: ${entry?.contentRect.width}px - h: ${entry?.contentRect.height}px`;
	}
</script>

<div class="flex flex-col gap-4">
	<textarea class="textarea textarea-bordered resize" use:useResizeObserver readonly
		>{printDimensions($entries[0])}</textarea
	>
	<textarea class="textarea textarea-bordered resize" use:useResizeObserver readonly
		>{printDimensions($entries[1])}</textarea
	>
</div>
