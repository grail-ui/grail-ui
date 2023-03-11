<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';

	const api = [{ definition: 'TextareaAutosizeReturn', hideDefault: true }];
</script>

<ComponentLayout {api}>
	<svelte:fragment slot="anatomy">
		<p>
			Using the code below, the textarea height is updated as you type to fit the content. Size
			changes are also respected by leveraging
			<a href="/svelte/resizeObserver">Resize Observer</a>.
		</p>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createTextareaAutosize } from '@grail-ui/svelte';

	const { useTextareaAutosize } = createTextareaAutosize();
</scr` +
				`ipt>

<textarea use:useTextareaAutosize />`}
		/>
	</svelte:fragment>
</ComponentLayout>
