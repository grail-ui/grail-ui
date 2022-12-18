<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import { Api, ApiTable } from '$lib/api-documenter';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['@floating-ui/dom']} />

<Api>
	<ApiTable definition="MenuConfig" />
	<ApiTable definition="MenuReturn" hideDefault />
	<ApiTable definition="PositioningOptions" />
</Api>
