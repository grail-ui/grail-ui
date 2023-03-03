<script lang="ts">
	import LinesIcon from '~icons/akar-icons/two-line-horizontal';
	import CloseIcon from '~icons/ic/outline-close';
	import { drawerOpen } from './layout.store';
</script>

<button
	id="fab"
	on:pointerdown={() => drawerOpen.update((open) => !open)}
	class="border-base-content/20 bg-base-content/20 text-base-content fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur backdrop-filter transition lg:hidden"
	><span class="sr-only">Open site navigation</span>
	<div class="swap {$drawerOpen ? 'swap-active' : ''}">
		<CloseIcon class="swap-on h-8 w-8" /><LinesIcon class="swap-off h-8 w-8" />
	</div></button
>
