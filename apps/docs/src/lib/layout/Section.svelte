<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let links: { href: string; label: string }[];
</script>

<div>
	<h5 class="mb-2 text-sm font-bold uppercase">{title}</h5>
	<ul class="border-base-content/20 z-1 flex flex-col gap-px border-l">
		{#each links as { href, label } (href)}
			{@const active = $page.url.pathname.includes(href)}
			<li>
				<a
					{href}
					class="text-base-content hover:bg-base-content/10 -ml-px inline-block w-full whitespace-nowrap rounded-r-sm border-l px-6 py-2 font-medium transition-colors duration-200 lg:text-sm {active
						? 'bg-base-content/10 border-primary'
						: 'border-transparent'}">{label}</a
				>
			</li>
		{/each}
	</ul>
</div>
