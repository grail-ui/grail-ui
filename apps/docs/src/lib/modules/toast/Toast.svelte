<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
	import Features from '$lib/demo/Features.svelte';
</script>

<Demo />

<Features
	list={[
		'Supports closing automatically after a specified time.',
		'Pauses closing on hover, focus and window blur.',
		'Can remove or update toast programmatically.',
		'Manage promises within toast.',
		'Support for progress bars.',
	]}
/>

<Api
	types={[
		{ definition: 'ToastConfig' },
		{ definition: 'ToastReturn', hideDefault: true },
		{ definition: 'ToastParams', hideDefault: true },
	]}
/>
