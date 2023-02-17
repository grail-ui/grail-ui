<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';

	const api = [
		{ definition: 'ScriptTagConfig' },
		{ definition: 'ScriptTagReturn', hideDefault: true },
	];
</script>

<ComponentLayout {api} />
