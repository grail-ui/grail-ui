<script lang="ts">
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    }, {} as Record<K, T[]>);

  $: groupedModules = groupBy(data.modules, (m) => m.category);
</script>

<div class="flex flex-grow">
  <div class="flex flex-col gap-2 px-4 pt-4">
    <div>
      {#each Object.keys(groupedModules) as groupKey}
        <div class="text-sm font-bold mb-2 uppercase">{groupKey}</div>
        {#each groupedModules[groupKey] as module (module.slug)}
          <a href="/svelte/{module.slug}" class="text-sm">{module.heading}</a>
        {/each}
      {/each}
    </div>
  </div>
  <div class="flex-grow pt-4">
    <slot />
  </div>
</div>
