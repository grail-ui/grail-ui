<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	Use the <code>progress</code> store to animate the toast's progress.
	<Highlight
		source={`<div use:useToast={toast} {...$rootAttrs(toast)}>
  <h3>{toast.title}</h3>
  <div>{toast.description}</div>
  <progress value={$progress(toast)} max={toast.duration} />
</div>`}
		lines={[4]}
	/>
</p>
