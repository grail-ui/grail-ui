<script lang="ts">
	import type { TabsTriggerParams } from '../tabs.types';
	import { createTabs } from '../tabs';

	export let activationMode: 'automatic' | 'manual' | undefined = undefined;
	export let orientation: 'horizontal' | 'vertical' | undefined = undefined;
	export let value: string | undefined = undefined;
	export let disabled = false;
	export let onValueChange: ((value: string) => void) | undefined = undefined;
	export let items: TabsTriggerParams<string>[] = [];

	const options = { activationMode, orientation, value, disabled, onValueChange };

	const { useTabs, rootAttrs, listAttrs, triggerAttrs, contentAttrs } = createTabs(options);
</script>

<div use:useTabs {...$rootAttrs}>
	<div {...$listAttrs}>
		{#each items as item, index}
			<button {...$triggerAttrs(item)}>Trigger {index + 1}</button>
		{/each}
	</div>
	{#each items as { value }, index}
		<p {...$contentAttrs(value)}>Content {index + 1}</p>
	{/each}
</div>
