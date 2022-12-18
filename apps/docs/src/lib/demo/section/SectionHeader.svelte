<script lang="ts">
	export let id: string | undefined = undefined;
	export let heading: 'h2' | 'h3' = 'h2';
</script>

<svelte:element this={heading} class="relative group">
	<a class="relative group mb-4 mt-10" {id} href="#{id}" data-section-header={+heading[1] - 1}
		><span
			class="absolute -left-6 top-1/2 -translate-y-1/2 text-lg opacity-0 group-hover:opacity-70 p-2"
			>#</span
		>
		<span class="font-robotic font-semibold {heading === 'h2' ? 'text-2xl' : 'text-xl'}"
			><slot /></span
		></a
	>
</svelte:element>
