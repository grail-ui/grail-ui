<script lang="ts">
	import { createTextareaAutosize } from '@grail-ui/svelte';

	const { useTextareaAutosize } = createTextareaAutosize();
</script>

<div class="flex w-full max-w-md flex-col gap-2">
	<label for="textarea">Type, the textarea will grow:</label>
	<textarea
		id="textarea"
		placeholder="What's on your mind?"
		use:useTextareaAutosize
		rows={2}
		class="max-h-[140px] resize-none px-4 py-2"
	/>
</div>
