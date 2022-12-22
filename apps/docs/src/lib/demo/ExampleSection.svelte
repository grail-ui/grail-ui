<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';

	export let header = '';
</script>

{#if header}
	{@const id = header.split(' ').join('-')}
	<SectionHeader {id} heading="h3">{header}</SectionHeader>
{/if}

<slot />
