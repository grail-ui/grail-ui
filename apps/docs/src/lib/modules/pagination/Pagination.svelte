<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
</script>

<Demo />

<ApiTable definition="PaginationItem" hideDefault />
<ApiTable definition="PaginationConfig" />
<ApiTable definition="PaginationReturn" hideDefault />
