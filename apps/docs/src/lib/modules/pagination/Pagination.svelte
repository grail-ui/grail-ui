<script lang="ts">
	import ComponentLayout from '$lib/demo/ComponentLayout.svelte';
	import Highlight from '$lib/highlight/Highlight.svelte';

	const features = [
		'Screen reader support for improved accessibility.',
		'Advanced customization options.',
	];

	const api = [
		{ definition: 'PaginationItem', hideDefault: true },
		{ definition: 'PaginationConfig' },
		{ definition: 'PaginationReturn', hideDefault: true },
	];
</script>

<ComponentLayout {features} {api}>
	<svelte:fragment slot="anatomy">
		<p>Typically, a pagination consists of:</p>

		<ul>
			<li><b>Nav:</b> The root container for the pagination.</li>
			<li class="list-none">
				<ul>
					<li>
						<b>Item:</b> Each pagination item, that could potentially be a number, an ellipsis, or a
						shortcut to first, last, next and previous page.
					</li>
				</ul>
			</li>
		</ul>

		<Highlight
			source={`<scr` +
				`ipt>
	import { createPagination } from '@grail-ui/svelte';

	const { items, navAttrs, pageAttrs } = createPagination();
</scr` +
				`ipt>

<nav {...$navAttrs}>
	{#each $items as item}
		<a href="#{item.page}" {...$pageAttrs(item)}>{item.page}</a>
	{/each}
</nav>`}
		/>
	</svelte:fragment>

	<svelte:fragment slot="accessibility"
		><p>
			The root node has a role of "navigation" and an aria-label by default. The page items have an
			aria-label that identifies the purpose of the item.
		</p></svelte:fragment
	>
</ComponentLayout>
