<script lang="ts">
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';

	let links: { id: string; label: string; href: string; depth: number }[] = [];

	afterUpdate(() => {
		links = [...document.querySelectorAll<HTMLAnchorElement>('[data-section-header]')].map(
			({ href, id, dataset }) => ({
				id,
				href,
				label: id.split('-').join(' '),
				depth: +(dataset.sectionHeader as string),
			})
		);
	});
</script>

<div class="z-10 hidden w-52 shrink-0 xl:block">
	<div class="sticky top-0 mt-[-72px] pt-[120px]">
		<div>
			<h2 class="mb-2 text-xl font-bold">Quick Nav</h2>

			<ul class="flex flex-col gap-2">
				{#each links as { id, label, href, depth } (id)}
					{@const active = $page.url.hash === `#${id}`}
					<li>
						<a
							{href}
							class="hover:text-base-content -ml-px whitespace-nowrap py-2 text-sm font-medium transition-colors duration-200 depth-{depth} {active
								? 'text-base-content'
								: 'text-base-content/60'}">{label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style lang="postcss">
	.depth-3 {
		@apply pl-4;
	}
</style>
