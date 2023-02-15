<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<ComponentLayout>
	<svelte:fragment slot="anatomy">
		<p>
			The <code>activeElement</code> is a readable store that returns the HTML element within the DOM
			that currently has focus.
		</p>

		<Highlight
			source={`<scr` +
				`ipt>
	import { activeElement } from '@grail-ui/svelte';

	$: console.log($activeElement);
</scr` +
				`ipt>`}
		/>
	</svelte:fragment>
</ComponentLayout>
