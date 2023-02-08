<script lang="ts">
	import type { LayoutData } from '$lib/layout/layout.types';
	import QuickNav from '$lib/layout/QuickNav.svelte';
	import Sections from '$lib/layout/Sections.svelte';

	export let data: LayoutData;
</script>

<div class="mx-auto flex flex-1 max-w-8xl w-full px-4 sm:px-6 lg:px-8 gap-8">
	<div
		class="hidden w-64 px-1 shrink-0 lg:block py-7 max-h-[calc(100vh-4.25rem-1px)] overflow-auto sticky top-[calc(4.25rem+1px)] overscroll-contain"
	>
		<Sections {data} />
	</div>
	<main class="flex flex-1 min-w-0 py-12">
		<div class="mx-auto min-w-0 max-w-[800px] flex-1">
			<slot />
		</div>
	</main>
	<QuickNav />
</div>
