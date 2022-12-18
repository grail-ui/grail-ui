<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import { Api, ApiTable } from '$lib/api-documenter';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['focus-trap', '@floating-ui/dom']} />

<Api>
	<ApiTable definition="PopoverConfig" />
	<ApiTable definition="PopoverReturn" hideDefault />
	<ApiTable definition="PositioningOptions" />
</Api>
