<script lang="ts">
	import Highlight from '$lib/highlight/Highlight.svelte';
</script>

The default orientation of the tabs is horizontal. To change the orientation, set the <code
	>orientation</code
>
property in the factory function to "vertical".
<Highlight
	source={`createTabs({
  orientation: "vertical",
})`}
	lines={[2]}
/>
