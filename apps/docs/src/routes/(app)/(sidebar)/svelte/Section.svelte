<script lang="ts">
	export let title: string;
	export let links: { href: string; label: string }[];
</script>

<div>
	<div class="text-sm font-bold mb-2 uppercase">{title}</div>
	<div class="flex flex-col gap-2">
		{#each links as link (link.href)}
			<a href={link.href} class="text-sm">{link.label}</a>
		{/each}
	</div>
</div>
