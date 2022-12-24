<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';

	const api = [
		{ definition: 'FocusTrapConfig' },
		{ definition: 'FocusTrapReturn', hideDefault: true },
	];
</script>

<ComponentLayout {api} dependencies={['focus-trap']} />
