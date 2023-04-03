<script lang="ts">
	import { createTimeout } from '@grail-ui/svelte';

	const defaultText = 'Please wait 5 seconds...';

	let text = defaultText;

	const { start, isPending } = createTimeout(() => (text = 'Fired!'), 5000);

	const restart = () => {
		text = defaultText;
		start();
	};
</script>

<div class="border-base-content/20 bg-base-100 flex w-full flex-col gap-6 rounded border p-8">
	<p>{text}</p>
	<button type="button" class="btn" disabled={$isPending} on:click={restart}>Start again</button>
</div>
