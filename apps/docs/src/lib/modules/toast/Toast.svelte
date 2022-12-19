<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import Api from '$lib/api-documenter/Api.svelte';
</script>

<Demo />

<Api
	types={[
		{ definition: 'ToastConfig' },
		{ definition: 'ToastReturn', hideDefault: true },
		{ definition: 'ToastParams', hideDefault: true },
	]}
/>
