<script lang="ts">
	import SectionHeader from '$lib/demo/SectionHeader.svelte';
	import ApiTable from './ApiTable.svelte';

	export let title = 'API';
	export let types: { definition: string; hideDefault?: boolean; title?: string }[] = [];
</script>

{#if title}<SectionHeader id="API">{title}</SectionHeader>{/if}

<slot />

{#each types as type (type.definition)}
	<ApiTable {...type} />
{/each}
