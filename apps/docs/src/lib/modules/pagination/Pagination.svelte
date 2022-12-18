<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import { Api, ApiTable } from '$lib/api-documenter';
</script>

<Demo />

<Api>
	<ApiTable definition="PaginationItem" hideDefault />
	<ApiTable definition="PaginationConfig" />
	<ApiTable definition="PaginationReturn" hideDefault />
</Api>
