<script lang="ts">
	import { createTabs } from '@grail-ui/svelte';

	type TabType = 'recent' | 'popular' | 'trending';

	const { active, useTabs, rootAttrs, listAttrs, triggerAttrs, contentAttrs } = createTabs<TabType>(
		{
			value: 'recent',
		}
	);

	const data: { key: TabType; title: string; content: string }[] = [
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

<div use:useTabs class="flex flex-col bg-slate-100 p-4 rounded-lg" {...$rootAttrs}>
	<div {...$listAttrs} class="tabs tabs-boxed">
		{#each data as { key, title } (key)}
			<button class="tab" class:tab-active={$active === key} {...$triggerAttrs(key)}>{title}</button
			>
		{/each}
	</div>
	{#each data as { key, content } (key)}
		<div {...$contentAttrs(key)} class="pt-4 text-sm">{content}</div>
	{/each}
</div>
