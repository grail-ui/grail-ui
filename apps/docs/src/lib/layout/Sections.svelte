<script lang="ts">
	import type { ModuleMetadata } from '$lib/modules/modules.types';
	import type { LayoutData } from './layout.types';
	import Section from './Section.svelte';

	export let data: LayoutData;

	const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
		arr.reduce((groups, item) => {
			(groups[key(item)] ||= []).push(item);
			return groups;
		}, {} as Record<K, T[]>);

	const groups: Record<ModuleMetadata['category'], { sort: number; label: string }> = {
		component: { sort: 1, label: 'Components' },
		utility: { sort: 1, label: 'Utilities' },
	};

	$: groupedModules = groupBy(data.modules, (m) => m.category);
	$: sortedGroupKeys = (Object.keys(groupedModules) as ModuleMetadata['category'][]).sort(
		(a, b) => groups[a].sort - groups[b].sort || a.localeCompare(b)
	);
</script>

<div class="flex flex-col gap-5">
	<Section
		title="Overview"
		links={[
			{ href: `/svelte/getting-started`, label: 'Introduction' },
			{ href: `/svelte/architecture`, label: 'Architecture' },
			{ href: `/svelte/guidelines`, label: 'Guidelines' },
		]}
	/>
	{#each sortedGroupKeys as groupKey}
		{@const links = groupedModules[groupKey].map((m) => ({
			href: `/svelte/${m.slug}`,
			label: m.heading,
		}))}
		<Section title={groups[groupKey].label} {links} />
	{/each}
</div>
