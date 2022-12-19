<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['@floating-ui/dom']} />

<Api
	types={[
		{ definition: 'MenuConfig' },
		{ definition: 'MenuReturn', hideDefault: true },
		{ definition: 'PositioningOptions' },
	]}
/>
