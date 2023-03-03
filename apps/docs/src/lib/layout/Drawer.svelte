<script lang="ts">
	import type { LayoutData } from './layout.types';
	import { fly } from 'svelte/transition';
	import { useClickOutside } from '@grail-ui/svelte';
	import { drawerOpen } from './layout.store';
	import Sections from './Sections.svelte';
	import { beforeNavigate } from '$app/navigation';

	export let data: LayoutData;

	function close() {
		$drawerOpen = false;
	}

	function ignore(event: PointerEvent) {
		return event
			.composedPath()
			.some(
				(target) =>
					target instanceof Element && (target.id === 'drawer-content' || target.id === 'fab')
			);
	}

	beforeNavigate(close);
</script>

<svelte:head>
	{#if $drawerOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

{#if $drawerOpen}
	<div class="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
		<div
			class="bg-base-100/50 absolute inset-0 backdrop-blur backdrop-filter"
			aria-hidden="true"
			use:useClickOutside={{
				handler: close,
				ignore,
			}}
		/>
		<div class="absolute inset-0 z-40 flex translate-x-0" transition:fly={{ x: -384, opacity: 1 }}>
			<div
				id="drawer-content"
				class="border-base-content/10 bg-base-200/90 min-w-0 max-w-sm flex-1 overflow-auto border-r p-8 backdrop-blur backdrop-filter"
			>
				<Sections {data} />
			</div>
		</div>
	</div>
{/if}
