<script lang="ts">
	export let id: string | undefined = undefined;
	export let heading: 'h2' | 'h3' = 'h2';
</script>

<svelte:element this={heading} class="group">
	<a class="group relative mb-4 mt-10" {id} href="#{id}" data-section-header={+heading[1]}
		><span
			class="absolute -left-6 top-1/2 -translate-y-1/2 p-2 text-lg opacity-0 group-hover:opacity-70"
			>#</span
		></a
	>
	<span class="font-robotic font-semibold"><slot /></span>
</svelte:element>
