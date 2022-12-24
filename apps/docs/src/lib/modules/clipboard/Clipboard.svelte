<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';

	const api = [
		{ definition: 'ClipboardConfig' },
		{ definition: 'ClipboardReturn', hideDefault: true },
	];
</script>

<ComponentLayout {api} />
