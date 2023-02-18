<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import ScriptTagManual from './examples/ScriptTagManual.svelte';

	const api = [
		{ definition: 'ScriptTagConfig' },
		{ definition: 'ScriptTagReturn', hideDefault: true },
	];

	const examples = [{ component: ScriptTagManual, header: 'Manual load/unload' }];
</script>

<ComponentLayout {api} {examples}>
	<svelte:fragment slot="anatomy">
		<p>
			Using the code below, when the component is mounted, the script will be loaded automatically,
			and it will be removed upon destroying of the component.
		</p>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createScriptTag } from '@grail-ui/svelte';

	createScriptTag({
		url: 'https://player.twitch.tv/js/embed/v1.js',
		onLoaded() {
			// do something
		},
	});
</scr` +
				`ipt>`}
		/>
	</svelte:fragment>
</ComponentLayout>
