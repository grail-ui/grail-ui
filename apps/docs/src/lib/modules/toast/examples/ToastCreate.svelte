<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	To create a toast, use the <code>toaster.create</code> method.
	<Highlight
		source={`toaster.create({
  title: "Hello World",
  description: "This is a toast",
  type: "info",
})`}
	/>
</p>
