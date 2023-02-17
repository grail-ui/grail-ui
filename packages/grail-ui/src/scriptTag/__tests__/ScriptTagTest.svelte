<script lang="ts">
	import { onDestroy } from 'svelte';
	import { createScriptTag } from '../scriptTag';

	export let scriptUrl = '';

	let result = '';

	const { load, unload } = createScriptTag({
		url: scriptUrl,
		immediate: false,
		onLoaded: () => (result = 'loaded'),
		onError: () => (result = 'error'),
	});

	onDestroy(() => {
		unload();
	});
</script>

<button type="button" on:click={() => load()}>Load</button>

<div data-testid="result">{result}</div>
