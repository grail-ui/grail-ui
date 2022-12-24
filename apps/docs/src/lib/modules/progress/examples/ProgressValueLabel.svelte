<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

The default formatting for values is a percentage, for example 30%. However, you can use the <code
	>formatValueLabel</code
>
function to specify a different format if desired.

<Highlight
	source={`createProgress({
	value: 30,
	formatValueLabel({ value, maxValue }) {
		return \`\${value} out of \${maxValue}\`;
	}
})`}
	lines="3, 4"
/>
