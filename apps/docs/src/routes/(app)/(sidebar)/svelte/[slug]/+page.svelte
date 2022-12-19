<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$lib/demo/PageHeader.svelte';

	export let data: PageData;

	$: metadata = data.modules[data.index];
</script>

<div class="prose">
	<PageHeader title={metadata.heading || data.slug}>{@html metadata.description || ''}</PageHeader>
	<svelte:component this={data.component} />
</div>
