<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
</script>

<Demo />

<ApiTable definition="TabsConfig" />
<ApiTable definition="TabsReturn" hideDefault />
<ApiTable definition="TabsTriggerParams" hideDefault />
<ApiTable definition="TabsContentParams" hideDefault />
