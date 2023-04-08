<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<a class="link link-hover fixed left-2 top-2" href="/svelte/{data.slug}">Back</a>
<svelte:component this={data.component} />
