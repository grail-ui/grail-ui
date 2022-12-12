<script>
	import './app.css';
	import Header from '$lib/layout/Header.svelte';
	import { theme } from '$lib/layout/layout.store';
</script>

<div class="flex flex-col overflow-y-auto h-screen" style="height: 100dvh;" data-theme={$theme}>
	<div class="sticky top-0 z-40"><Header /></div>
	<div class="flex flex-col flex-grow">
		<slot />
	</div>
</div>
