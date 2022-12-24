<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';

	const api = [{ definition: 'PortalConfig' }, { definition: 'PortalReturn', hideDefault: true }];
</script>

<ComponentLayout {api} />
