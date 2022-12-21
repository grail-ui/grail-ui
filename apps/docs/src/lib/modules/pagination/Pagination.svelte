<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Features from '$lib/demo/Features.svelte';
</script>

<Demo />

<Features
	list={['Screen reader support for improved accessibility.', 'Advanced customization options.']}
/>

<Api
	types={[
		{ definition: 'PaginationItem', hideDefault: true },
		{ definition: 'PaginationConfig' },
		{ definition: 'PaginationReturn', hideDefault: true },
	]}
/>
