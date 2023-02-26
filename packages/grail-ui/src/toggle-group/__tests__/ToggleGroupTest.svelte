<script lang="ts">
	import { createToggleGroup } from '../toggle-group';

	export let orientation: 'horizontal' | 'vertical' | undefined = undefined;
	export let value: string | string[] | undefined = undefined;
	export let disabled: string | string[] | boolean = false;
	export let multiple = false;
	export let onValueChange: ((value?: string | string[]) => void) | undefined = undefined;
	export let items: string[] = [];

	const options = {
		...(orientation && { orientation }),
		value,
		multiple,
		disabled,
		onValueChange,
	};

	const { useToggleGroup, rootAttrs, itemAttrs } = createToggleGroup(options);
</script>

<div use:useToggleGroup {...$rootAttrs}>
	{#each items as item, index}
		<button {...$itemAttrs(item)}>Toggle {index + 1}</button>
	{/each}
</div>
