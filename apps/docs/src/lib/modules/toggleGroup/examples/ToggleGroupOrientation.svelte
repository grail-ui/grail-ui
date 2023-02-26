<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

The default orientation of the toggle group is horizontal. To change the orientation, set the <code
	>orientation</code
>
property in the factory function to "vertical".
<Highlight
	source={`createToggleGroup({
  orientation: "vertical",
})`}
	lines={[2]}
/>
