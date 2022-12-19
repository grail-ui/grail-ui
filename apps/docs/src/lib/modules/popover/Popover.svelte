<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['focus-trap', '@floating-ui/dom']} />

<Api
	types={[
		{ definition: 'PopoverConfig' },
		{ definition: 'PopoverReturn', hideDefault: true },
		{ definition: 'PositioningOptions' },
	]}
/>
