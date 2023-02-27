<script lang="ts">
	import { createAccordion } from '@grail-ui/svelte';
	import ChevronDownIcon from '~icons/mdi/chevron-down';
	import clsx from 'clsx';

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

<ul use:useAccordion class={clsx('space-y-4 w-full')}>
	{#each data as { key, title, content } (key)}
		{@const isExpanded = $expanded.has(key)}
		<li
			{...$itemAttrs(key)}
			class="rounded-lg focus-within:ring focus-within:ring-blue-500 focus-within:ring-opacity-75 focus:outline-none w-full"
			class:collapse-open={isExpanded}
		>
			<button
				{...$triggerAttrs(key)}
				class={clsx(
					'group',
					isExpanded ? 'rounded-t-lg' : 'rounded-lg',
					'focus:outline-none',
					'inline-flex w-full items-center justify-between bg-white px-4 py-2 text-left dark:bg-gray-800'
				)}
				><span class="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</span>
				<ChevronDownIcon
					class={clsx(
						'ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400',
						isExpanded && 'rotate-180 duration-300'
					)}
				/>
			</button>
			<div {...$contentAttrs(key)}>
				{#if isExpanded}
					<div class="pt-1 w-full rounded-b-lg bg-white px-4 pb-3 dark:bg-gray-800">
						<div class="text-sm text-gray-700 dark:text-gray-400">
							{content}
						</div>
					</div>
				{/if}
			</div>
		</li>
	{/each}
</ul>
