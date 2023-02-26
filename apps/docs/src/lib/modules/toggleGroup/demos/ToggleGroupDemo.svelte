<script lang="ts">
	import { createToggleGroup } from '@grail-ui/svelte';
	import FontBoldIcon from '~icons/material-symbols/format-bold';
	import FontItalicIcon from '~icons/material-symbols/format-italic';
	import FontUnderlineIcon from '~icons/material-symbols/format-underlined';

	const { pressed, useToggleGroup, rootAttrs, itemAttrs } = createToggleGroup();

	type ToggleItem = {
		key: string;
		label: string;
		icon: typeof FontBoldIcon | typeof FontItalicIcon | typeof FontUnderlineIcon;
	};

	const data: ToggleItem[] = [
		{
			key: 'bold',
			label: 'Font bold',
			icon: FontBoldIcon,
		},
		{
			key: 'italic',
			label: 'Font italic',
			icon: FontItalicIcon,
		},
		{
			key: 'underline',
			label: 'Underline',
			icon: FontUnderlineIcon,
		},
	];
</script>

<div use:useToggleGroup {...$rootAttrs} aria-label="Text alignment" class="btn-group">
	{#each data as { key, label, icon } (key)}
		{@const isPressed = $pressed.has(key)}
		<button {...$itemAttrs(key)} class="btn" class:btn-active={isPressed} aria-label={label}>
			<svelte:component this={icon} />
		</button>
	{/each}
</div>
