<script lang="ts">
	import { createResizeObserver } from '../resizeObserver';

	let width = 0;
	let height = 0;

	const { useResizeObserver } = createResizeObserver({
		handler(entries) {
			({ width, height } = entries[0]?.contentRect || {});
		},
	});
</script>

<div data-testid="resizable" use:useResizeObserver style="width: 100px; height: 200px;">
	{width}px - {height}px
</div>
