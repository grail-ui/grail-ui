<script lang="ts">
	import { createMenu } from '@grail-ui/svelte';
	import { fade } from 'svelte/transition';

	const { useTrigger, triggerAttrs, useMenu, menuAttrs, itemAttrs, open } = createMenu();

	function onSelect(e: Event) {
		e.preventDefault();
		$open = false;
		alert((e.target as any).dataset.label);
	}
</script>

<button type="button" class="btn" use:useTrigger {...$triggerAttrs}>Menu</button>

{#if $open}
	<ul transition:fade use:useMenu {...$menuAttrs} class="menu">
		<li class="menu-title">
			<span>Options</span>
		</li>
		<li><a href="/" on:click={onSelect} {...$itemAttrs('edit')}>Edit</a></li>
		<li><a href="/" on:click={onSelect} {...$itemAttrs('delete')}>Delete</a></li>
		<li class="menu-title">
			<span>Category</span>
		</li>
		<li><a href="/" on:click={onSelect} {...$itemAttrs('new')}>New</a></li>
		<li><a href="/" on:click={onSelect} {...$itemAttrs('destroy')}>Destroy</a></li>
	</ul>
{/if}

<style lang="postcss">
	.menu {
		@apply border bg-base-100 w-56 p-2 rounded-box outline-0;
	}
</style>
