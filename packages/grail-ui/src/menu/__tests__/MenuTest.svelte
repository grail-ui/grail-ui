<script lang="ts">
	import type { MenuReturn } from '../menu.types';

	export let api: MenuReturn<string>;
	export let triggerExists = true;

	const { useTrigger, triggerAttrs, useMenu, menuAttrs, itemAttrs, separatorAttrs, open } = api;
</script>

<div data-testid="container">
	{#if triggerExists}
		<button type="button" class="btn" use:useTrigger {...$triggerAttrs} data-testid="trigger"
			><span>Menu</span></button
		>
	{/if}
	{#if $open}
		<ul use:useMenu {...$menuAttrs} data-testid="menu">
			<li role="presentation"><a href="/1" {...$itemAttrs('1')}>Item 1</a></li>
			<li role="presentation"><a href="/2" {...$itemAttrs('2')} data-disabled>Disabled</a></li>
			<li role="presentation"><a href="/3" {...$itemAttrs('3')}>Item 2</a></li>
			<li {...$separatorAttrs} />
			<li role="presentation"><a href="/4" {...$itemAttrs('4')}>Item 4</a></li>
			<li role="presentation"><a href="/5" {...$itemAttrs('5')}><span>Icon</span> Item 5</a></li>
		</ul>
	{/if}
</div>
