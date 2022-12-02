<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: metadata = data.modules[data.index];
</script>

<div class="w-full max-w-6xl mx-auto">
	<h1 class="text-4xl font-bold mb-2">{metadata.heading || data.slug}</h1>
	<div class="text-lg mb-8">{@html metadata.description || ''}</div>
	<svelte:component this={data.component} />
</div>
