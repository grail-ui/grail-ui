<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>There are three ways to pause a toast's progress:</p>

<ul>
	<li>Use <code>pauseOnPageIdle</code> to pause when document loses focus or the page is idle.</li>
	<li>Use <code>pauseOnInteraction</code> to pause when the toast is hovered or focused.</li>
	<li>Use <code>toaster.pause(id)</code> to pause a toast programmatically.</li>
</ul>

<Highlight
	source={`createToast({
	pauseOnPageIdle: true,
	pauseOnInteraction: true,
})`}
	lines={[2, 3]}
/>
