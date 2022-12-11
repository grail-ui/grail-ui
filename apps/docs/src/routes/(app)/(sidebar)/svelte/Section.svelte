<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let links: { href: string; label: string }[];
</script>

<div>
	<h5 class="text-sm font-bold mb-2 uppercase">{title}</h5>
	<ul class="flex flex-col gap-2">
		{#each links as { href, label } (href)}
			{@const active = $page.url.pathname.includes(href)}
			<li>
				<a
					{href}
					class="whitespace-nowrap -ml-px w-full inline-block py-2 px-6 font-medium transition-colors duration-200 text-base-content lg:text-sm rounded-btn {active
						? 'bg-primary/50'
						: 'hover:bg-primary/30'}">{label}</a
				>
			</li>
		{/each}
	</ul>
</div>
