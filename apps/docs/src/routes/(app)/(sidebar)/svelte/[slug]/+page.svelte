<script lang="ts">
	import type { PageData } from './$types';
	import PageHeader from '$lib/demo/PageHeader.svelte';
	import { SectionGroup } from '$lib/demo/section';

	export let data: PageData;

	$: metadata = data.modules[data.index];
</script>

<PageHeader title={metadata.heading || data.slug}>{@html metadata.description || ''}</PageHeader>

<SectionGroup>
	<svelte:component this={data.component} />
</SectionGroup>
