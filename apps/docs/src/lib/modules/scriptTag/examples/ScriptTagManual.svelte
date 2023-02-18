<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	To have manual control over the timing of loading and unloading the script, use <code
		>immediate: false</code
	>
	and/or <code>autoUnload: false</code>.
</p>
<p>
	<Highlight
		source={`const { load, unload } = createScriptTag({
	url: 'https://player.twitch.tv/js/embed/v1.js',
	onLoaded: () => new Twitch.Player(twitchEl, { width: 500, height: 400, channel: 'monstercat' }),
	immediate: false,
	autoUnload: false,
});

// manual controls
load();
unload();`}
		lines={[4, 5, 9, 10]}
	/>
</p>
