<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';

	const api = [
		{ definition: 'ResizeObserverConfig' },
		{ definition: 'ResizeObserverUseConfig' },
		{ definition: 'ResizeObserverReturn', hideDefault: true },
	];
</script>

<ComponentLayout {api}>
	<svelte:fragment slot="anatomy">
		<p>
			Using the code below, a <a
				href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver">ResizeObserver</a
			> is created and can be used to report changes to the content or border box dimensions of an element.
		</p>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createResizeObserver } from '@grail-ui/svelte';

	const { useResizeObserver, entries } = createResizeObserver();

	$: console.log($entries[0]?.contentRect.width, $entries[0]?.contentRect.height);
</scr` +
				`ipt>

<textarea use:useResizeObserver></textarea>`}
		/>
	</svelte:fragment>
</ComponentLayout>
