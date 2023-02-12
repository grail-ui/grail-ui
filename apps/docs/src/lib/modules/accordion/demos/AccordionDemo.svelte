<script lang="ts">
	import { createAccordion } from '@grail-ui/svelte';

	const { expanded, useAccordion, itemAttrs, triggerAttrs, contentAttrs } = createAccordion();

	const data = [
		{
			key: 'accessibility',
			title: 'Accessibility',
			content: 'The Accordion component is accessible by default.',
		},
		{
			key: 'flexibility',
			title: 'Flexibility',
			content: 'You have total freedom over the look and feel.',
		},
		{
			key: 'animations',
			title: 'Animations',
			content:
				'You can use CSS or JavaScript to animate the Accordion. Yes, Svelte animations work too!',
		},
	];
</script>

<ul use:useAccordion class="max-w-md">
	{#each data as { key, title, content } (key)}
		{@const isExpanded = $expanded.has(key)}
		<li
			{...$itemAttrs(key)}
			class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
			class:collapse-open={isExpanded}
		>
			<button {...$triggerAttrs(key)} class="collapse-title text-lg font-medium">{title} </button>
			<div {...$contentAttrs(key)} class="collapse-content">
				{content}
			</div>
		</li>
	{/each}
</ul>
