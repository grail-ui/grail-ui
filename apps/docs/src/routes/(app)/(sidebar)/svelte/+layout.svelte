<script lang="ts">
	import type { LayoutData } from '$lib/layout/layout.types';
	import QuickNav from '$lib/layout/QuickNav.svelte';
	import Sections from '$lib/layout/Sections.svelte';

	export let data: LayoutData;
</script>

<div class="max-w-8xl mx-auto flex w-full flex-1 gap-8 px-4 sm:px-6 lg:px-8">
	<div
		class="sticky top-[calc(4.25rem+1px)] hidden max-h-[calc(100vh-4.25rem-1px)] w-64 shrink-0 overflow-auto overscroll-contain px-1 py-7 lg:block"
	>
		<Sections {data} />
	</div>
	<main class="flex min-w-0 flex-1 py-12">
		<div class="mx-auto min-w-0 max-w-[800px] flex-1">
			<slot />
		</div>
	</main>
	<QuickNav />
</div>
