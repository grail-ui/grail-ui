<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';
	import ProgressScale from './examples/ProgressScale.svelte';
	import ProgressValueLabel from './examples/ProgressValueLabel.svelte';

	const features = [
		'Exposed to assistive technology as a progress bar using ARIA.',
		'Labeling support for accessibility',
	];

	const api = [
		{ definition: 'ProgressConfig' },
		{ definition: 'ProgressReturn', hideDefault: true },
	];

	const examples = [
		{ component: ProgressScale, header: 'Custom scale' },
		{ component: ProgressValueLabel, header: 'Custom value label' },
	];
</script>

<ComponentLayout {features} {api} {examples}>
	<svelte:fragment slot="anatomy">
		<p>Typically, a progress bar consists of:</p>

		<ul>
			<li><b>Progress:</b> The element showing the full progress of an operation.</li>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createProgress } from '@grail-ui/svelte';

	const { progressAttrs, percentage, valueLabel, value } = createProgress();
</scr` +
				`ipt>

<div style="--value: {$percentage * 100};" {...$progressAttrs}>{$valueLabel}</div>`}
		/>
	</svelte:fragment>
</ComponentLayout>
