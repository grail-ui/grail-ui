<script lang="ts">
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';
	let links: { id: string; href: string }[] = [];

	afterUpdate(() => {
		links = [...document.querySelectorAll<HTMLAnchorElement>('[data-section-header]')].map(
			({ href, id }) => ({
				href,
				id,
			})
		);
	});
</script>

<div class="z-10 hidden w-52 shrink-0 xl:block">
	<div class="sticky top-0 mt-[-72px] pt-[120px]">
		<div>
			<h2 class="text-xl font-bold mb-2">Quick Nav</h2>

			<ul class="flex flex-col gap-2">
				{#each links as { id, href } (id)}
					{@const active = $page.url.hash === `#${id}`}
					<li>
						<a
							{href}
							class="whitespace-nowrap -ml-px py-2 font-medium transition-colors duration-200 text-sm hover:text-base-content {active
								? 'text-base-content'
								: 'text-base-content/60'}">{id}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
