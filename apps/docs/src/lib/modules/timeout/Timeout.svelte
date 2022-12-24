<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';

	const api = [{ definition: 'TimeoutConfig' }, { definition: 'TimeoutReturn', hideDefault: true }];
</script>

<ComponentLayout {api} />
