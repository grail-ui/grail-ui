<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Features from '$lib/demo/Features.svelte';
</script>

<Demo />

<Features
	list={[
		'Exposed to assistive technology as a progress bar using ARIA.',
		'Labeling support for accessibility',
	]}
/>

<Api
	types={[{ definition: 'ProgressConfig' }, { definition: 'ProgressReturn', hideDefault: true }]}
/>
