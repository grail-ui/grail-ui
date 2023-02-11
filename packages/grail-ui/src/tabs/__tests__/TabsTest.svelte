<script lang="ts">
	import { createTabs } from '../tabs';

	export let activationMode: 'automatic' | 'manual' | undefined = undefined;
	export let orientation: 'horizontal' | 'vertical' | undefined = undefined;
	export let value: string | undefined = undefined;
	export let disabled: string | string[] | boolean = false;
	export let onValueChange: ((value?: string) => void) | undefined = undefined;
	export let items: string[] = [];

	const options = {
		...(activationMode && { activationMode }),
		...(orientation && { orientation }),
		value,
		disabled,
		onValueChange,
	};

	const { useTabs, rootAttrs, listAttrs, triggerAttrs, contentAttrs } = createTabs(options);
</script>

<div use:useTabs {...$rootAttrs}>
	<div {...$listAttrs}>
		{#each items as item, index}
			<button {...$triggerAttrs(item)}>Trigger {index + 1}</button>
		{/each}
	</div>
	{#each items as item, index}
		<p {...$contentAttrs(item)}>Content {index + 1}</p>
	{/each}
</div>
