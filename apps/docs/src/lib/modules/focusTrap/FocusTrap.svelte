<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['focus-trap']} />

<Api
	types={[{ definition: 'FocusTrapConfig' }, { definition: 'FocusTrapReturn', hideDefault: true }]}
/>
