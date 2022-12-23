<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

The <code>min</code> and <code>max</code> can be used to limit the entered value to a specific
range. The value will be clamped when the user blurs the input field. In addition, the increment and
decrement buttons will be disabled when the value is within one step value from the bounds.

<Highlight
	source={`createNumberInput({
	min: 0,
	max: 100,
})`}
	lines="2, 3"
/>
