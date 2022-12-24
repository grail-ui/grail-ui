<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	To limit the number of visible toasts, pass the max property to the factory function.

	<Highlight
		source={`createToast({
      max: 5,
})`}
		lines={[2]}
	/>
</p>
