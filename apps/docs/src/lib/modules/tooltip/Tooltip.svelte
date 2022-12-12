<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['@floating-ui/dom']} />

<ApiTable definition="TooltipConfig" />
<ApiTable definition="TooltipReturn" hideDefault />
<ApiTable definition="PositioningOptions" />
