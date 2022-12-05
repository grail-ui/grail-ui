<script lang="ts">
	import { createMenu } from '../menu';

	export let onOpenChange: (() => void) | undefined = undefined;
	export let isOpen = false;
	export let triggerExists = true;

	const { useTrigger, triggerAttrs, useMenu, menuAttrs, itemAttrs, separatorAttrs, open } =
		createMenu({
			open: isOpen,
			onOpenChange,
		});
</script>

<div data-testid="container">
	{#if triggerExists}
		<button type="button" class="btn" use:useTrigger {...$triggerAttrs} data-testid="trigger"
			>Menu</button
		>
	{/if}
	{#if $open}
		<ul use:useMenu {...$menuAttrs} data-testid="menu">
			<li role="presentation"><a href="/1" {...$itemAttrs('1')}>Item 1</a></li>
			<li role="presentation"><a href="/2" {...$itemAttrs('2')}>Item 2</a></li>
			<li {...$separatorAttrs} />
			<li role="presentation"><a href="/3" {...$itemAttrs('3')}>Item 3</a></li>
			<li role="presentation"><a href="/4" {...$itemAttrs('4')}>Item 4</a></li>
		</ul>
	{/if}
</div>
