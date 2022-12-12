<script lang="ts">
	import LinesIcon from '~icons/akar-icons/two-line-horizontal';
	import CloseIcon from '~icons/ic/outline-close';
	import { drawerOpen } from './layout.store';
</script>

<button
	id="fab"
	on:pointerdown={() => drawerOpen.update((open) => !open)}
	class="fixed bottom-4 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-base-content bg-base-200/90 border-opacity-20 text-base-content backdrop-blur backdrop-filter transition focus:outline-none focus-visible:ring lg:hidden"
	><span class="sr-only">Open site navigation</span>
	<div class="swap {$drawerOpen ? 'swap-active' : ''}">
		<CloseIcon class="swap-on h-8 w-8" /><LinesIcon class="swap-off h-8 w-8" />
	</div></button
>
