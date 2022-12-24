<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

<p>
	Every toast has a default visible duration depending on the <code>type</code> set.
</p>

<table class="table table-compact">
	<thead><tr><th>type</th><th>duration</th></tr></thead><tbody
		><tr><td>info</td><td>5000</td></tr><tr><td>error</td><td>5000</td></tr><tr
			><td>success</td><td>2000</td></tr
		><tr><td>custom</td><td>5000</td></tr><tr><td>loading</td><td>Infinity</td></tr></tbody
	>
</table>

<p>
	You can override the duration of the toast by passing the duration property to the
	<code>toaster.create</code> function.
</p>

<Highlight
	source={`toaster.create({
  title: "Hello World",
  duration: 6000,
})`}
	lines={[3]}
/>
