<script lang="ts">
	import { createPagination } from '@grail-ui/svelte';

	const { items, page, navAttrs, pageAttrs, start, end, total } = createPagination({ total: 172 });
</script>

<nav {...$navAttrs}>
	<div class="btn-group">
		{#each $items as item}
			<button
				{...$pageAttrs(item)}
				class="btn"
				class:btn-active={item.selected}
				on:click={() => ($page = item.page || $page)}
			>
				{#if item.type === 'page'}
					{item.page}
				{:else if item.type === 'ellipsis-start' || item.type === 'ellipsis-end'}
					...
				{:else}
					{item.type}
				{/if}
			</button>
		{/each}
	</div>
</nav>
