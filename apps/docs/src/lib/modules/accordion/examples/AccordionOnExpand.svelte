<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

Pass <code>onValueChange</code> to perform some custom logic when the expanded state is changed.
This callback is invoked with either the key of the accordion or an array of keys based on the value
of
<code>multiple</code>.

<Highlight
	source={`createAccordion({
	onValueChange(value) {
		console.log(value);
	},
})`}
	lines={[2, 3, 4]}
/>
