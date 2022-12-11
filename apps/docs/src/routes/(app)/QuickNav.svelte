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

<div class="z-10 hidden w-64 min-w-0 shrink-0 xl:block xl:pl-8">
	<div class="sticky top-0 mt-[-72px] max-h-screen overflow-y-auto pt-[120px] pb-10">
		<div>
			<h2 class="text-xl font-bold mb-2">Quick Nav</h2>

			<ul class="flex flex-col gap-2 border-l border-slate-10 z-1">
				{#each links as { id, href } (id)}
					{@const active = $page.url.hash === `#${id}`}
					<li>
						<a
							{href}
							class="whitespace-nowrap -ml-px py-2 px-6 font-medium transition-colors duration-200 hover:text-base-content lg:text-sm border-l hover:border-slate-400 {active
								? 'text-base-content border-slate-400'
								: 'text-slate-500'}">{id}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
