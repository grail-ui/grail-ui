<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

By default, the <code>value</code> represents the current percentage of progress, as the minimum and
maximum values default to 0 and 100, respectively. Alternatively, a different scale can be used by
setting the <code>minValue</code> and <code>maxValue</code>.

<Highlight
	source={`createProgress({
	value: 100,
	minValue: 50,
	maxValue: 150,
})`}
	lines="3, 4"
/>
