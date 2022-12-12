<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import ApiTable from '$lib/api-documenter/ApiTable.svelte';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['@floating-ui/dom']} />

<ApiTable definition="MenuConfig" />
<ApiTable definition="MenuReturn" hideDefault />
<ApiTable definition="PositioningOptions" />
