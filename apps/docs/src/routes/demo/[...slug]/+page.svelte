<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<a class="link link-hover fixed top-2 left-2" href="/svelte/{data.slug}">Back</a>
<svelte:component this={data.component} />
