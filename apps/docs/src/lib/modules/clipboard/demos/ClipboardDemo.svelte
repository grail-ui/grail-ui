<script lang="ts">
	import { createClipboard } from '@grail-ui/svelte';

	const { text, copied, copy } = createClipboard();

	let input: string;
</script>

<div class="bg-white min-w-[400px] p-5 rounded">
	<p>Current copied: <code class="bg-gray-300 p-1 text-sm">{$text || 'none'}</code></p>
	<input bind:value={input} type="text" class="input input-bordered mt-4" />
	<button on:click={() => copy(input)} class="btn">
		{$copied ? 'Copied!' : 'Copy'}
	</button>
</div>
