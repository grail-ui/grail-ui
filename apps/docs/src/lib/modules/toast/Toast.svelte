<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import { Api, ApiTable } from '$lib/api-documenter';
</script>

<Demo />

<Api>
	<ApiTable definition="ToastConfig" />
	<ApiTable definition="ToastReturn" hideDefault />
	<ApiTable definition="ToastParams" hideDefault />
	<!-- <ApiTable definition="Toaster" hideDefault /> -->
</Api>
