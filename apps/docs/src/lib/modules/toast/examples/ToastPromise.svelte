<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	Use <code>toaster.promise</code> method to update the toast when it resolves or rejects.
	<Highlight
		source={`toaster.promise(promise, {
  loading: {
    title: "Loading",
    description: "Please wait...",
  },
  success: (data) => ({
    title: "Success",
    description: "Operation completed",
  }),
  error: (err) => ({
    title: "Error",
    description: "Operation failed",
  }),
})`}
	/>
</p>
