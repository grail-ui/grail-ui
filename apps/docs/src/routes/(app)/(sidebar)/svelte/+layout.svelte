<script lang="ts">
  import type { ModuleMetadata } from '$lib/modules/modules.types';
  import type { LayoutData } from './$types';

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

<div class="flex flex-grow">
  <div class="flex flex-col gap-6 px-4 pt-4">
    {#each sortedGroupKeys as groupKey}
      <div>
        <div class="text-sm font-bold mb-2 uppercase">{groups[groupKey].label}</div>
        <div class="flex flex-col gap-2">
          {#each groupedModules[groupKey] as module (module.slug)}
            <a href="/svelte/{module.slug}" class="text-sm">{module.heading}</a>
          {/each}
        </div>
      </div>
    {/each}
  </div>
  <div class="flex-grow pt-4">
    <slot />
  </div>
</div>
