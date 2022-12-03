<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
</script>

<Demo />

<ApiTable definition="PopoverConfig" />
<ApiTable definition="PopoverReturn" hideDefault />
<ApiTable definition="PositioningOptions" />
