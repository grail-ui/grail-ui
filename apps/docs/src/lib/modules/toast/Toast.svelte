<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
</script>

<Demo />

<ApiTable definition="ToastConfig" />
<ApiTable definition="ToastReturn" hideDefault />
<ApiTable definition="ToastParams" hideDefault />
<!-- <ApiTable definition="Toaster" hideDefault /> -->
