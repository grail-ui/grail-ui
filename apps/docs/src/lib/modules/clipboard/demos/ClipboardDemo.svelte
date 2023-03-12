<script lang="ts">
	import { createClipboard } from '@grail-ui/svelte';

	const { text, copied, copy } = createClipboard();

	let input: string;
</script>

<div class="border-base-content/20 bg-base-100 w-full rounded border p-8">
	<div class="flex flex-col gap-3">
		<p>Current copied: {$text || '-'}</p>
		<div class="flex gap-4">
			<input bind:value={input} type="text" class="input input-bordered flex-1" />
			<button on:click={() => copy(input)} class="btn">
				{$copied ? 'Copied!' : 'Copy'}
			</button>
		</div>
	</div>
</div>
