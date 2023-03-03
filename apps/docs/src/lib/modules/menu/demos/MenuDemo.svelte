<script lang="ts">
	import { createMenu } from '@grail-ui/svelte';
	import { fade } from 'svelte/transition';

	const { useTrigger, triggerAttrs, useMenu, menuAttrs, itemAttrs, open } = createMenu({
		onSelect(id) {
			$open = false;
			alert(id);
		},
	});
</script>

<button type="button" class="btn" use:useTrigger {...$triggerAttrs}>Menu</button>

{#if $open}
	<ul transition:fade use:useMenu {...$menuAttrs} class="menu">
		<li class="menu-title">
			<span>Options</span>
		</li>
		<li><a href="/" {...$itemAttrs('edit')}>Edit</a></li>
		<li><a href="/" {...$itemAttrs('delete')}>Delete</a></li>
		<li class="menu-title">
			<span>Category</span>
		</li>
		<li><a href="/" {...$itemAttrs('new')}>New</a></li>
		<li class="disabled"><a href="/" {...$itemAttrs('disabled')} data-disabled>Disabled</a></li>
		<li><a href="/" {...$itemAttrs('destroy')}>Destroy</a></li>
	</ul>
{/if}

<style lang="postcss">
	.menu {
		@apply bg-base-100 rounded-box z-20 w-56 border p-2 outline-0;
	}
</style>
