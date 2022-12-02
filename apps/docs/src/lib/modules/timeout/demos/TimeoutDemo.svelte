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

<p class="my-6">{text}</p>
<button type="button" class="btn" disabled={$isPending} on:click={restart}>Start again</button>
