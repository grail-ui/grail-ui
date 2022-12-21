<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
	import Features from '$lib/demo/Features.svelte';
</script>

<Demo />

<Features
	list={[
		'Show tooltip on hover and focus.',
		'Hide tooltip on `Escape` or pointer down.',
		'Labeling support for screen readers.',
		'Custom delay support.',
	]}
/>

<Dependency modules={['@floating-ui/dom']} />

<Api
	types={[
		{ definition: 'TooltipConfig' },
		{ definition: 'TooltipReturn', hideDefault: true },
		{ definition: 'PositioningOptions' },
	]}
/>
