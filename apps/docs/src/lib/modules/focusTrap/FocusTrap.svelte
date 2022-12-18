<script lang="ts">
	import Demo from '$lib/demo/Demo.svelte';
	import { Api, ApiTable } from '$lib/api-documenter';
	import Dependency from '$lib/demo/Dependency.svelte';
</script>

<Demo />

<Dependency modules={['focus-trap']} />

<Api>
	<ApiTable definition="FocusTrapConfig" />
	<ApiTable definition="FocusTrapReturn" hideDefault />
</Api>
