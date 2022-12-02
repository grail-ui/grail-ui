<script lang="ts">
	import type { PaginationConfig } from '../pagination.types';
	import { createPagination } from '../pagination';

	export let options: Partial<PaginationConfig> = {};

	export const updatePage = (value: number | null) => {
		$currentPage = value || $currentPage;
	};

	const {
		items,
		page: currentPage,
		navAttrs,
		pageAttrs,
		start,
		end,
		total,
	} = createPagination({ page: 2, total: 33, ...options });
</script>

<nav {...$navAttrs}>
	{#each $items as item}
		<button
			{...$pageAttrs(item)}
			class:disabled={item.disabled}
			class:active={item.selected}
			on:click={() => updatePage(item.page)}
		>
			{#if item.type === 'page'}
				{item.page}
			{:else}
				{item.type}
			{/if}
		</button>
	{/each}
</nav>

<div data-testid="show">{$start}-{$end} of {$total}</div>
