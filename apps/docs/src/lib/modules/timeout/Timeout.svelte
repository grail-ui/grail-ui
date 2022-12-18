<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import { Api, ApiTable } from '$lib/api-documenter';
</script>

<Demo />

<Api>
	<ApiTable definition="TimeoutConfig" />
	<ApiTable definition="TimeoutReturn" hideDefault />
</Api>
