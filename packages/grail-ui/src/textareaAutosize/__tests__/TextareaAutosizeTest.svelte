<script lang="ts">
	import { createTextareaAutosize } from '../textareaAutosize';

	const { useTextareaAutosize } = createTextareaAutosize();
</script>

<textarea
	use:useTextareaAutosize
	style="width: 100px; font-size: 14px; line-height: 16px; padding: 0; border-width: 0; resize: none; overflow-x: hidden;"
	rows={1}
/>
