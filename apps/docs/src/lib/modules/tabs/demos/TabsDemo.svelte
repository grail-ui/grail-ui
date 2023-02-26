<script lang="ts">
	import { createTabs } from '@grail-ui/svelte';
	import clsx from 'clsx';

	const { active, useTabs, rootAttrs, listAttrs, triggerAttrs, contentAttrs } = createTabs({
		value: 'recent',
	});

	const data = [
		{
			key: 'recent',
			title: 'Recent',
			content: 'Recent tab content',
		},
		{
			key: 'popular',
			title: 'Popular',
			content: 'Popular tab content',
		},
		{
			key: 'trending',
			title: 'Trending',
			content: 'Trending tab content',
		},
	];
</script>

<div use:useTabs {...$rootAttrs}>
	<div {...$listAttrs} class="flex w-full rounded-t-lg bg-white dark:bg-gray-800">
		{#each data as { key, title } (key)}
			{@const isActive = $active === key}
			<button
				class={clsx(
					'group',
					'first:rounded-tl-lg last:rounded-tr-lg',
					'border-b first:border-r last:border-l',
					'border-gray-300 dark:border-gray-600',
					isActive
						? 'border-b-gray-700 focus-visible:border-b-transparent dark:border-b-gray-100 dark:bg-gray-900 focus-visible:dark:border-b-transparent'
						: 'bg-gray-50 dark:bg-gray-800',

					'flex-1 px-3 py-2.5',
					isActive && 'focus:border-b-red',
					'focus:z-10 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75'
				)}
				{...$triggerAttrs(key)}
			>
				<span class={clsx('text-sm font-medium', 'text-gray-700 dark:text-gray-100')}>
					{title}
				</span>
			</button>
		{/each}
	</div>
	{#each data as { key, content } (key)}
		<div {...$contentAttrs(key)} class={clsx('rounded-b-lg bg-white px-6 py-4 dark:bg-gray-800')}>
			<span class="text-sm text-gray-700 dark:text-gray-100">
				{content}
			</span>
		</div>
	{/each}
</div>
