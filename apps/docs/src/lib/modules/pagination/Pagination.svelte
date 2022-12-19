<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
</script>

<Demo />

<Api
	types={[
		{ definition: 'PaginationItem', hideDefault: true },
		{ definition: 'PaginationConfig' },
		{ definition: 'PaginationReturn', hideDefault: true },
	]}
/>
