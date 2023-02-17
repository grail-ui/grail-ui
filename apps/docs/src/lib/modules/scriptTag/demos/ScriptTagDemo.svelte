<script lang="ts">
	import { createScriptTag } from '@grail-ui/svelte';
	import { onDestroy } from 'svelte';

	let twitchEl: HTMLElement;

	const { scriptTag, load, unload } = createScriptTag({
		url: 'https://player.twitch.tv/js/embed/v1.js',
		immediate: false,
		onLoaded: () => new Twitch.Player(twitchEl, { width: 500, height: 400, channel: 'monstercat' }),
	});

	onDestroy(() => {
		unload();
	});
</script>

<div bind:this={twitchEl} />

{#if !$scriptTag}
	<button class="btn" type="button" on:click={() => load()}>Load video</button>
{/if}
