<script lang="ts">
	import { createMenu } from '@grail-ui/svelte';

	const { useTrigger, triggerAttrs, useMenu, menuAttrs, itemAttrs, open } = createMenu({
		onSelect(id) {
			$open = false;
			alert(id);
		},
	});
</script>

<button type="button" class="btn" use:useTrigger {...$triggerAttrs}>Menu</button>

<div class="dropdown" class:dropdown-open={$open}>
	<ul
		use:useMenu
		{...$menuAttrs}
		class="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow"
	>
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
</div>
