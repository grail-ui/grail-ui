<script lang="ts">
	import { createAccordion } from '../accordion';

	export let multiple: boolean;
	export let value: string | string[] | undefined = undefined;
	export let disabled: boolean | string | string[] = false;
	export let items: string[];
	export let onValueChange: ((value: string | string[]) => void) | undefined = undefined;

	const options = { multiple, value, disabled, onValueChange };

	const { useAccordion, itemAttrs, triggerAttrs, contentAttrs } = createAccordion(options);
</script>

<ul use:useAccordion>
	{#each items as key, index}
		<li {...$itemAttrs(key)}>
			<h3>
				<button {...$triggerAttrs(key)} data-testid="trigger">Accordion trigger {index}</button>
			</h3>
			<div {...$contentAttrs(key)} data-testid="content">
				<p>Accordion content {index}</p>
			</div>
		</li>
	{/each}
</ul>
