<script lang="ts">
	import type { LayoutData } from './$types';
	import QuickNav from '../../QuickNav.svelte';
	import Fab from './Fab.svelte';
	import Drawer from './Drawer.svelte';
	import Sections from './Sections.svelte';

	export let data: LayoutData;
</script>

<div class="mx-auto flex flex-1 max-w-8xl w-full px-4 sm:px-6 lg:px-8">
	<div
		class="hidden w-64 px-1 shrink-0 lg:block py-7 max-h-[calc(100vh-4.25rem-1px)] overflow-auto sticky top-[calc(4.25rem+1px)] overscroll-contain lg:mr-8"
	>
		<Sections {data} />
	</div>
	<main class="flex flex-1 pt-12">
		<div class="mx-auto max-w-[800px] flex-1">
			<slot />
		</div>
	</main>
	<QuickNav />
	<Fab />
	<Drawer {data} />
</div>
