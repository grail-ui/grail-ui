<script lang="ts">
	export let id: string | undefined = undefined;
</script>

<div class="relative group">
	<a
		{id}
		data-section-header
		href="#{id}"
		class="absolute -left-6 top-1/2 -translate-y-1/2 text-lg opacity-20 group-hover:opacity-70 p-2 scroll-mt-20"
		>#</a
	>
	<div class="mb-4 mt-10 font-robotic font-semibold text-2xl"><slot /></div>
</div>
